"use client";

import { Button, Input, Text } from "@/components/elements";
import Modal from "@/components/features/Modal";
import {
  checkIfExistingUserAPI,
  getUserAPI,
  verifyCustomOTPAPI,
} from "@/lib/appSyncAPIs";
import { authSagaActions } from "@/store/sagas/sagaActions/auth.actions";
import { modalSagaActions } from "@/store/sagas/sagaActions/modal.actions";
import { userSagaActions } from "@/store/sagas/sagaActions/user.actions";
import { addPhonePrefix, validatePhoneNumber } from "@/utils/helpers";
import { getCurrentUser } from "aws-amplify/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function PasswordLess({ enableOutsideClick = true }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const { confirmationStatus, loading } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const {
    modal: {
      passwordLess: { isPasswordLessOpen, customLogin, redirectTo },
    },
  } = useSelector((state) => state.modal);

  const otpInput = useRef([]);

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
      const { userId } = currentUser;

      if (!!userId && user && !user.id) {
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
        customLogin: false,
        redirectTo: null,
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

  const setAuthLoader = (isLoading) =>
    dispatch({
      type: authSagaActions.SET_AUTH_LOADER,
      payload: isLoading,
    });

  const signIn = async () => {
    if (!phoneFormatValidator()) return;

    const phone = addPhonePrefix(authData.phone);

    const handleCustomLogin = async () => {
      setAuthLoader(true);
      try {
        const isExistingUser = await checkIfExistingUserAPI({ phone });
        if (isExistingUser) {
          signInWithAWS({ phone });
        } else {
          dispatch({
            type: authSagaActions.SET_CONFIRMATION_STATUS,
            payload: "UNCONFIRMED_CUSTOM_SIGNIN",
          });
        }
      } catch (error) {
        console.error("Error during custom login:", error);
      } finally {
        setAuthLoader(false);
      }
    };

    if (customLogin) {
      await handleCustomLogin();
    } else {
      signInWithAWS({ phone });
    }

    setCountdown(30);
  };

  const signInWithAWS = ({ phone }) => {
    dispatch({
      type: authSagaActions.SIGNIN_AWS_ACCOUNT,
      payload: { phone },
    });
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

  const submitOTP = async () => {
    const confirmationCode = authData?.confirmationCode.join("");
    const phone = addPhonePrefix(authData?.phone);

    const actions = {
      UNCONFIRMED_SIGNIN: () =>
        dispatch({
          type: authSagaActions.CONFIRM_SIGNIN,
          payload: { confirmationCode },
        }),
      UNCONFIRMED_SIGNUP: () =>
        dispatch({
          type: authSagaActions.CONFIRM_SIGNUP,
          payload: { username: phone, confirmationCode },
        }),
      UNCONFIRMED_CUSTOM_SIGNIN: async () => {
        setAuthLoader(true);
        try {
          const isVerified = await verifyCustomOTPAPI({
            phone,
            otp: confirmationCode,
          });
          if (isVerified) {
            dispatch({
              type: authSagaActions.SET_CONFIRMATION_STATUS,
              payload: "DONE",
            });
            dispatch({
              type: userSagaActions.SET_CUSTOM_USER,
              payload: { phone },
            });
          } else {
            // Handle unverified OTP
            // setOtpError(true);
          }
        } catch (error) {
          console.error("Error verifying custom OTP:", error);
        } finally {
          setAuthLoader(false);
        }
      },
    };

    const action = actions[confirmationStatus];
    if (action) {
      await action();
    }

    if (!!redirectTo) {
      router.push(redirectTo);
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
        confirmationStatus === "UNCONFIRMED_SIGNIN" ||
        confirmationStatus === "UNCONFIRMED_CUSTOM_SIGNIN") &&
        secondSignInStep()}
    </Modal>
  );
}
