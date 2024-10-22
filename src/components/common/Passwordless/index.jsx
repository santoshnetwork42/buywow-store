"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import { Button, Input, Text } from "@/components/elements";
import Modal from "@/components/features/Modal";
import { verifyCustomOTPAPI } from "@/lib/appSyncAPIs";
import { useAuthDispatch } from "@/store/sagas/dispatch/auth.dispatch";
import { useEventsDispatch } from "@/store/sagas/dispatch/events.dispatch";
import { useModalDispatch } from "@/store/sagas/dispatch/modal.dispatch";
import { useUserDispatch } from "@/store/sagas/dispatch/user.dispatch";
import { addPhonePrefix, validatePhoneNumber } from "@/utils/helpers";

const PasswordLess = ({ enableOutsideClick = true }) => {
  const router = useRouter();

  const { setUser, setCustomUser } = useUserDispatch();
  const { handlePasswordLessModal } = useModalDispatch();
  const {
    setConfirmationStatus,
    setAuthLoader,
    signInAwsAccount,
    createAwsAccount,
    confirmSignIn,
    confirmSignUp,
    setAuthError,
  } = useAuthDispatch();

  const confirmationStatus = useSelector(
    (state) => state.auth?.confirmationStatus,
  );
  const loading = useSelector((state) => state.auth?.loading);
  const error = useSelector((state) => state.auth?.error);
  const user = useSelector((state) => state.user?.user);
  const isPasswordLessOpen = useSelector(
    (state) => state.modal?.modal?.passwordLess?.isPasswordLessOpen,
  );
  const customLogin = useSelector(
    (state) => state.modal?.modal?.passwordLess?.customLogin,
  );
  const redirectTo = useSelector(
    (state) => state.modal?.modal?.passwordLess?.redirectTo,
  );

  const sourceOfPasswordLessModalOpen = useSelector(
    (state) => state.modal?.modal?.passwordLess?.source,
  );

  const { authEvent, otpRequestedEvent } = useEventsDispatch();

  const phoneInputRef = useRef(null);
  const otpInputRefs = useRef([]);

  const [authData, setAuthData] = useState({
    phone: "",
    confirmationCode: new Array(6).fill(""),
  });
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    let timer;
    if (isPasswordLessOpen && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown, isPasswordLessOpen]);

  useEffect(() => {
    if (confirmationStatus === "SIGNUP") {
      handleSignUp();
    }
    if (confirmationStatus === "DONE") {
      handlePasswordLessModal(false, false, null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmationStatus]);

  useEffect(() => {
    if (authData.confirmationCode.join("").length === 6) {
      handleSubmitOTP();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authData.confirmationCode]);

  useEffect(() => {
    if (isPasswordLessOpen) {
      setTimeout(() => phoneInputRef.current?.focus(), 0);
    }
  }, [isPasswordLessOpen]);

  useEffect(() => {
    if (confirmationStatus && confirmationStatus !== "SIGNUP") {
      // Focus on first OTP input when OTP step is rendered
      setTimeout(() => otpInputRefs.current[0]?.focus(), 0);
    }
  }, [confirmationStatus]);

  useEffect(() => {
    let abortController;
    if (
      confirmationStatus &&
      confirmationStatus !== "SIGNUP" &&
      typeof window !== "undefined" &&
      "OTPCredential" in window
    ) {
      abortController = new AbortController();
      navigator.credentials
        .get({
          otp: { transport: ["sms"] },
          signal: abortController.signal,
        })
        .then((otp) => {
          if (otp && otp.code) {
            const otpArray = otp.code.split("").slice(0, 6);
            setAuthData((prev) => ({
              ...prev,
              confirmationCode: otpArray,
            }));
            // Focus on the last input after autofill
            otpInputRefs.current[5]?.focus();
          }
        })
        .catch((err) => {
          if (err.name !== "AbortError") {
            console.error("Error auto-filling OTP:", err);
          }
        });
    }

    return () => {
      if (abortController) abortController.abort();
    };
  }, [confirmationStatus]);

  useEffect(() => {
    if (!isPasswordLessOpen) {
      setAuthData({
        phone: "",
        confirmationCode: new Array(6).fill(""),
      });
      setConfirmationStatus(null);
      setAuthError({ phone: "", otp: "" });
      setCountdown(0);
      setAuthLoader(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPasswordLessOpen]);

  const handlePhoneChange = (event) => {
    setAuthData((prev) => ({
      ...prev,
      phone: event.target.value?.replace(/\D/g, "")?.trim(),
    }));
  };

  const handleSignIn = async () => {
    const phoneValidation = validatePhoneNumber(authData.phone);
    if (phoneValidation.error) {
      setAuthError({ phone: phoneValidation.message });
      return;
    }

    setAuthError({ phone: "" });

    const phone = addPhonePrefix(authData.phone);
    signInAwsAccount(phone);

    otpRequestedEvent({ phone, source: sourceOfPasswordLessModalOpen });
    setCountdown(30);
  };

  const handleSignUp = () => {
    if (confirmationStatus === "SIGNUP") {
      createAwsAccount(authData.phone);
      setCountdown(30);
    }
  };

  const handleSubmitOTP = async () => {
    const confirmationCode = authData.confirmationCode.join("");
    const phone = addPhonePrefix(authData.phone);

    const actions = {
      UNCONFIRMED_SIGNIN: () => confirmSignIn(confirmationCode),
      UNCONFIRMED_SIGNUP: () => confirmSignUp(phone, confirmationCode),
      UNCONFIRMED_CUSTOM_SIGNIN: async () => {
        setAuthLoader(true);
        try {
          const isVerified = await verifyCustomOTPAPI({
            phone,
            otp: confirmationCode,
          });
          if (isVerified) {
            setConfirmationStatus("DONE");
            setCustomUser(phone);
            authEvent({ action: "signup", moe: { userId: null, phone } });
          } else {
            setAuthError({ otp: "Invalid OTP" });
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

    // Handle paste operation
    if (value.length > 1) {
      const otpArray = value
        .split("")
        .filter((char) => /\d/.test(char))
        .slice(0, 6);

      setAuthData((prev) => ({
        ...prev,
        confirmationCode: Array(6)
          .fill("")
          .map((_x, i) => otpArray[i] || ""),
      }));

      const focusIndex = Math.min(otpArray.length, 5);
      otpInputRefs.current[focusIndex]?.focus();
    } else {
      // Handle single digit input
      setAuthData((prev) => {
        const newOtp = [...prev.confirmationCode];
        newOtp[index] = value;
        return { ...prev, confirmationCode: newOtp };
      });
      if (value !== "" && index < 5) {
        otpInputRefs.current[index + 1]?.focus();
      }
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

  const handlePhoneKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSignIn();
    }
  };

  const handleOTPInputKeyDown = (event, index) => {
    if (event.key === "Enter") {
      if (index === 5) {
        handleSubmitOTP();
      } else {
        otpInputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handlePaste = useCallback((event) => {
    event.preventDefault();
    const pastedData = event.clipboardData.getData("Text");
    const otpArray = pastedData
      .split("")
      .filter((char) => /\d/.test(char))
      .slice(0, 6);
    setAuthData((prev) => ({
      ...prev,
      confirmationCode: Array(6)
        .fill("")
        .map((_x, i) => otpArray[i] || ""),
    }));
    const focusIndex = Math.min(otpArray.length, 5);
    otpInputRefs.current[focusIndex]?.focus();
  }, []);

  const renderSignInStep = (
    <div className="flex flex-col items-center gap-3 px-8 py-4">
      <Input
        placeholder="Enter Mobile Number"
        className="flex flex-grow gap-2 rounded-full border p-2"
        prefix="+91"
        type="tel"
        onChange={handlePhoneChange}
        onKeyDown={handlePhoneKeyDown}
        maxLength={10}
        value={authData.phone}
        ref={phoneInputRef}
        error={error?.phone}
      />
      {error?.phone && (
        <Text
          as="p"
          size="base"
          className="w-full text-sm text-red-500"
          responsive
        >
          {error?.phone}
        </Text>
      )}
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
      <Text
        as="p"
        size="sm"
        className="w-full font-light text-gray-600 md:text-[15px]"
      >
        Enter 6-Digit OTP sent to +91{authData.phone}
      </Text>
      <div className="flex justify-between gap-3">
        {authData.confirmationCode.map((data, index) => (
          <Input
            key={index}
            type="text"
            inputMode="numeric"
            maxLength={6} // Changed to allow full OTP paste
            value={data}
            onChange={(e) => handleOTPChange(e.target, index)}
            autoComplete="one-time-code"
            onKeyDown={(e) => {
              handleOTPKeyDown(e, index);
              handleOTPInputKeyDown(e, index);
            }}
            ref={(el) => (otpInputRefs.current[index] = el)}
            className={`flex h-10 w-10 flex-grow rounded-md border`}
            inputClassName="text-center"
            error={error?.otp}
          />
        ))}
      </div>
      {error?.otp && (
        <Text
          as="p"
          size="base"
          className="w-full text-sm text-red-500"
          responsive
        >
          {error?.otp}
        </Text>
      )}
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
          <Text as="p" className="font-light">
            {`Didn't receive it? Resend in ${countdown}`}
          </Text>
        ) : (
          <Link prefetch={false} href="" onClick={handleSignIn}>
            <Text as="p" className="font-light underline">
              {`Didn't get the code? Resend OTP`}
            </Text>
          </Link>
        )}
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={isPasswordLessOpen}
      onClose={() => handlePasswordLessModal(false, false, null)}
      showMobileView
      title={!confirmationStatus ? "Sign In" : "OTP Verification"}
      enableOutsideClick={enableOutsideClick}
    >
      {!confirmationStatus ? renderSignInStep : renderOTPStep}
    </Modal>
  );
};

export default PasswordLess;
