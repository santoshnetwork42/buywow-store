"use client";

import { getCurrentUser } from "aws-amplify/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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
import {
  addPhonePrefix,
  isPhoneNumberValid,
  validatePhoneNumber,
} from "@/utils/helpers";

const PasswordLess = ({ enableOutsideClick = true }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { confirmationStatus, loading } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const {
    modal: {
      passwordLess: { isPasswordLessOpen, customLogin, redirectTo },
    },
  } = useSelector((state) => state.modal);

  const otpInputRefs = useRef([]);

  const [authData, setAuthData] = useState({
    phone: "",
    confirmationCode: new Array(6).fill(""),
  });
  const [authErrors, setAuthErrors] = useState({
    phone: "",
  });

  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (countdown > 0) setCountdown(countdown - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  useEffect(() => {
    if (confirmationStatus === "SIGNUP") {
      handleSignUp();
    }
    if (confirmationStatus === "DONE") {
      handleAuthClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmationStatus]);

  const updateUserState = useCallback(async () => {
    try {
      const currentUser = await getCurrentUser();
      if (currentUser?.userId && user && !user.id) {
        const userData = await getUserAPI();
        dispatch({
          type: userSagaActions.SET_USER,
          payload: userData,
        });
      }
      if (!currentUser) {
        dispatch({
          type: authSagaActions.SET_CONFIRMATION_STATUS,
          payload: null,
        });
      }
    } catch (error) {
      console.error("Error updating user state:", error);
      dispatch({
        type: authSagaActions.SET_CONFIRMATION_STATUS,
        payload: null,
      });
    }
  }, [dispatch, user]);

  const handleAuthClose = async () => {
    await updateUserState();
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
  };

  const handlePhoneChange = (event) => {
    setAuthData((prev) => ({
      ...prev,
      phone: event.target.value?.replace(/\D/g, "")?.trim(),
    }));
  };

  const isPhoneValid = isPhoneNumberValid(authData.phone);

  const setAuthLoader = (isLoading) => {
    dispatch({
      type: authSagaActions.SET_AUTH_LOADER,
      payload: isLoading,
    });
  };

  const handleSignIn = async () => {
    if (!isPhoneValid) return;

    const phone = addPhonePrefix(authData.phone);

    const handleCustomLogin = async () => {
      setAuthLoader(true);
      try {
        const isExistingUser = await checkIfExistingUserAPI({ phone });
        if (isExistingUser) {
          handleSignInWithAWS({ phone });
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
      handleSignInWithAWS({ phone });
    }

    setCountdown(30);
  };

  const handleSignInWithAWS = ({ phone }) => {
    dispatch({
      type: authSagaActions.SIGNIN_AWS_ACCOUNT,
      payload: { phone },
    });
  };

  const handleSignUp = () => {
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

  const handleSubmitOTP = async () => {
    const confirmationCode = authData.confirmationCode.join("");
    const phone = addPhonePrefix(authData.phone);

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
            console.error("OTP verification failed");
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

    if (redirectTo) {
      router.push(redirectTo);
    }
  };

  const handleOTPChange = useCallback((element, index) => {
    const value = element.value;
    if (isNaN(value)) return;
    setAuthData((prev) => {
      const newOtp = [...prev.confirmationCode];
      newOtp[index] = value;
      return { ...prev, confirmationCode: newOtp };
    });
    if (value !== "" && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  }, []);

  const handleOTPKeyDown = useCallback(
    (event, index) => {
      if (
        event.key === "Backspace" &&
        !authData.confirmationCode[index] &&
        index > 0
      ) {
        otpInputRefs.current[index - 1]?.focus();
      }
    },
    [authData.confirmationCode],
  );

  const renderSignInStep = (
    <div className="flex flex-col items-center gap-3 px-8 py-4">
      <Input
        placeholder="Enter Mobile Number"
        className="flex flex-grow gap-2 rounded-full border p-2"
        prefix="+91"
        onChange={handlePhoneChange}
        maxLength={10}
        autocomplete="on"
        value={authData.phone}
        onBlur={(e) => {
          const newState = e.target.value.trim();
          const res = validatePhoneNumber(newState);
          setAuthErrors({
            ...authErrors,
            phone: res.error ? res.message : null,
          });
        }}
        error={authErrors.phone}
      />
      <Button
        loader={loading}
        loaderClass="ml-2"
        onClick={handleSignIn}
        className="p-3 px-6"
        variant="primary"
      >
        <div className="flex items-center justify-center">Get OTP</div>
      </Button>
    </div>
  );

  const renderOTPStep = (
    <div className="flex flex-col items-center gap-3 px-8 py-4">
      <div className="flex justify-between gap-3">
        {authData.confirmationCode.map((data, index) => (
          <Input
            key={index}
            type="text"
            maxLength="1"
            value={data}
            onChange={(e) => handleOTPChange(e.target, index)}
            onKeyDown={(e) => handleOTPKeyDown(e, index)}
            ref={(el) => (otpInputRefs.current[index] = el)}
            className="flex h-10 w-10 flex-grow rounded-md border"
            inputClassName="text-center"
          />
        ))}
      </div>
      <Button
        loader={loading}
        loaderClass="ml-2"
        onClick={handleSubmitOTP}
        className="p-3 px-6"
        variant="primary"
      >
        Confirm
      </Button>
      <div className="flex w-full">
        {countdown > 0 ? (
          <Text
            as="p"
            className="font-light"
          >{`Didn't receive it? Resend in ${countdown}`}</Text>
        ) : (
          <Link href="" onClick={handleSignIn}>
            <Text
              as="p"
              className="font-light underline"
            >{`Didn't get the code? Resend OTP`}</Text>
          </Link>
        )}
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={isPasswordLessOpen}
      onClose={handleAuthClose}
      showMobileView
      title="Signup"
      enableOutsideClick={enableOutsideClick}
    >
      {confirmationStatus === null && renderSignInStep}
      {[
        "UNCONFIRMED_SIGNUP",
        "UNCONFIRMED_SIGNIN",
        "UNCONFIRMED_CUSTOM_SIGNIN",
      ].includes(confirmationStatus) && renderOTPStep}
    </Modal>
  );
};

export default PasswordLess;
