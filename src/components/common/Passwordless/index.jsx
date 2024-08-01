"use client";

import { Button, Input, Text } from "@/components/elements";
import Modal from "@/components/features/Modal";
import { getUserAPI } from "@/lib/appSyncAPIs";
import { authSagaActions } from "@/store/sagas/sagaActions/auth.actions";
import { modalSagaActions } from "@/store/sagas/sagaActions/modal.actions";
import { userSagaActions } from "@/store/sagas/sagaActions/user.actions";
import { addPhonePrefix, validatePhoneNumber } from "@/utils/helpers";
import { getCurrentUser } from "aws-amplify/auth";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function PasswordLess({ enableOutsideClick = true }) {
  const dispatch = useDispatch();

  const { confirmationStatus, loading } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const {
    modal: {
      passwordLess: { isPasswordLessOpen },
    },
  } = useSelector((state) => state.modal);
  const otpInput = useRef([]);

  // console.log("confirmationStatus :>> ", confirmationStatus);
  const [authData, setAuthData] = useState({
    phone: "",
    confirmationCode: new Array(6).fill(""),
  });
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    handleCountDownTime();
  }, [countdown]);

  useEffect(() => {
    if (confirmationStatus === "SIGNUP") {
      signUp();
    }
    if (confirmationStatus === "DONE") {
      updateUserState();
      onAuthClose();
    }
  }, [confirmationStatus]);

  const updateUserState = async () => {
    try {
      const currentUser = await getCurrentUser();
      const { signInDetails, userId } = currentUser;

      if (!!currentUser?.userId && user && !user.id) {
        const userData = await getUserAPI();
        dispatch({
          type: userSagaActions.SET_USER,
          payload: {
            ...userData,
          },
        });
      }
      if (!currentUser) {
        //update confirmationStatus state
        dispatch({
          type: authSagaActions.SET_CONFIRMATION_STATUS,
          payload: null,
        });
      }
    } catch (error) {
      dispatch({
        type: authSagaActions.SET_CONFIRMATION_STATUS,
        payload: null,
      });
    }
  };

  const handleCountDownTime = () => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  };

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...authData?.confirmationCode];
    newOtp[index] = element.value;
    setAuthData({ ...authData, confirmationCode: newOtp });

    if (element.value !== "") {
      if (index < authData?.confirmationCode?.length - 1) {
        otpInput.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (event, index) => {
    if (
      event.key === "Backspace" &&
      !authData?.confirmationCode[index] &&
      index > 0
    ) {
      otpInput.current[index - 1].focus();
    }
  };

  const onAuthClose = async () => {
    dispatch({
      type: modalSagaActions.SET_PASSWORDLESS_MODAL,
      payload: {
        isPasswordLessOpen: false,
      },
    });
    setAuthData({
      phone: "",
      confirmationCode: new Array(6).fill(""),
    });
    await updateUserState();
  };

  const handlePhoneChange = (event) => {
    setAuthData({
      ...authData,
      phone: event.target.value?.replaceAll(/[^0-9]+/g, "")?.trim(),
    });
  };

  const phoneFormatValidator = () => {
    return validatePhoneNumber(authData.phone);
  };

  const signIn = () => {
    if (!phoneFormatValidator()) return;
    dispatch({
      type: authSagaActions.SIGNIN_AWS_ACCOUNT,
      payload: {
        phone: addPhonePrefix(authData.phone),
      },
    });
    setCountdown(30);
  };

  const signUp = () => {
    if (confirmationStatus === "SIGNUP") {
      dispatch({
        type: authSagaActions.CREATE_AWS_ACCOUNT,
        payload: {
          phone: addPhonePrefix(authData.phone),
        },
      });
      setCountdown(30);
    }
  };

  const submitOTP = () => {
    if (confirmationStatus === "UNCONFIRMED_SIGNIN") {
      dispatch({
        type: authSagaActions.CONFIRM_SIGNIN,
        payload: {
          confirmationCode: authData?.confirmationCode.join(""),
        },
      });
    } else if (confirmationStatus === "UNCONFIRMED_SIGNUP") {
      dispatch({
        type: authSagaActions.CONFIRM_SIGNUP,
        payload: {
          username: addPhonePrefix(authData?.phone),
          confirmationCode: authData?.confirmationCode.join(""),
        },
      });
    }
  };

  const firstSignInStep = () => {
    return (
      <div className="flex flex-col items-center gap-3 px-8 py-4">
        <Input
          placeholder="Enter Mobile Number"
          className="flex flex-grow rounded-full border p-2"
          prefix="+91"
          onChange={handlePhoneChange}
          maxLength={10}
          value={authData.phone}
        />
        <Button
          // disabled
          loader={loading}
          loaderClass="ml-2"
          onClick={() => {
            signIn();
          }}
          className="p-3 px-6"
          variant="primary"
        >
          <div className="flex items-center justify-center">Get OTP</div>
        </Button>
      </div>
    );
  };

  const secondSignInStep = () => {
    return (
      <div className="flex flex-col items-center gap-3 px-8 py-4">
        <div className="flex justify-between gap-3">
          {authData?.confirmationCode?.map((data, index) => (
            <Input
              key={index}
              type="text"
              maxLength="1"
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => (otpInput.current[index] = el)}
              className="flex h-10 w-10 flex-grow rounded-md border"
              inputClassName="text-center"
            />
          ))}
        </div>
        <Button
          loader={loading}
          loaderClass="ml-2"
          onClick={submitOTP}
          className="p-3 px-6"
          variant="primary"
        >
          Confirm
        </Button>
        <div className="flex w-full">
          {!!countdown && (
            <Text
              as="p"
              className="font-light"
            >{`Didn't receive it? Resend in ${countdown}`}</Text>
          )}
          {!countdown && (
            <Link href="" onClick={() => signIn()}>
              <Text
                as="p"
                className="font-light underline"
              >{`Didn't get the code? Resend OTP`}</Text>
            </Link>
          )}
        </div>
      </div>
    );
  };

  return (
    <Modal
      isOpen={isPasswordLessOpen}
      onClose={onAuthClose}
      showMobileView
      title="Signup"
      enableOutsideClick={enableOutsideClick}
    >
      {(confirmationStatus === null || confirmationStatus === "DONE") &&
        firstSignInStep()}

      {(confirmationStatus === "UNCONFIRMED_SIGNUP" ||
        confirmationStatus === "UNCONFIRMED_SIGNIN") &&
        secondSignInStep()}
    </Modal>
  );
}
