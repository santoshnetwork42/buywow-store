"use client";

import Modal from "@/components/features/Modal";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSagaActions } from "@/store/sagas/sagaActions/auth.actions";
import { Button, Input } from "@/components/common";
import { modalSagaActions } from "@/store/sagas/sagaActions/modal.actions";
import { addPhonePrefix, validatePhoneNumber } from "@/utils/helpers";
import { getCurrentUser } from "aws-amplify/auth";

export default function PasswordLess({ enableOutsideClick = true }) {
  const dispatch = useDispatch();

  const { confirmationStatus } = useSelector((state) => state.auth);
  console.log("confirmationStatus :>> ", confirmationStatus);
  const [authData, setAuthData] = useState({
    phone: "",
    confirmationCode: new Array(6).fill(""),
  });
  const otpInput = useRef([]);

  useEffect(() => {
    if (confirmationStatus === "SIGNUP") {
      signUp();
    }
  }, [confirmationStatus]);

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

  const {
    modal: {
      passwordLess: { isPasswordLessOpen },
    },
  } = useSelector((state) => state.modal);

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

    //get curent authenticated user
    try {
      const user = await getCurrentUser();
      if (!user) {
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
    console.log("reached here");
    dispatch({
      type: authSagaActions.SIGNIN_AWS_ACCOUNT,
      payload: {
        phone: addPhonePrefix(authData.phone),
      },
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
          // loader
          // loaderClass="ml-2"
          onClick={() => {
            signIn();
          }}
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
        <Button onClick={submitOTP}>Submit</Button>
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
      {(confirmationStatus === "UNCONFIRMED_SIGNUP" ||
        confirmationStatus === "UNCONFIRMED_SIGNIN") &&
        secondSignInStep()}

      {(confirmationStatus === null || confirmationStatus === "DONE") &&
        firstSignInStep()}
    </Modal>
  );
}
