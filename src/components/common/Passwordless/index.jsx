"use client";

import Modal from "@/components/features/Modal";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSagaActions } from "@/store/sagas/sagaActions/auth.actions";
import { Button, Input } from "@/components/common";
import { modalSagaActions } from "@/store/sagas/sagaActions/modal.actions";
import { validatePhoneNumber } from "@/utils/helpers";

export default function PasswordLess({ enableOutsideClick = true }) {
  const dispatch = useDispatch();

  const [authData, setAuthData] = useState({
    phone: "",
    confirmationCode: "",
  });

  const {
    modal: {
      passwordLess: { isPasswordLessOpen },
    },
  } = useSelector((state) => state.modal);

  const onAuthClose = () => {
    dispatch({
      type: modalSagaActions.SET_PASSWORDLESS_MODAL,
      payload: {
        isPasswordLessOpen: false,
      },
    });
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

  const otpFormatValidator = () => {
    return authData?.confirmationCode?.length < 6;
  };

  const signIn = () => {
    if (!phoneFormatValidator()) return;
    dispatch({
      type: authSagaActions.SIGNIN_AWS_ACCOUNT,
      payload: {
        phone: "+919909772852",
      },
    });
  };

  const signUp = () => {
    if (!phoneFormatValidator()) return;
    dispatch({
      type: authSagaActions.CREATE_AWS_ACCOUNT,
      payload: {
        phone: "9909772852",
      },
    });
  };

  return (
    <Modal
      isOpen={isPasswordLessOpen}
      onClose={onAuthClose}
      showMobileView
      title="Signup"
      enableOutsideClick={enableOutsideClick}
    >
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
          onClick={() => {}}
        >
          <div className="flex items-center justify-center">Get OTP </div>
        </Button>
      </div>
    </Modal>
  );
}
