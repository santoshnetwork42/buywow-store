"use client";

import { AlertIcon } from "@/assets/svg/icons";
import { Text } from "@/components/elements";
import React from "react";
import { Toaster, toast } from "react-hot-toast";

// Generic Toast Component
const ToastComponent = () => {
  return <Toaster position="top-center" reverseOrder={false} />;
};

export const showToast = {
  success: (message) =>
    toast.success(message, {
      id: "success-toast",
      style: {
        background:
          "radial-gradient(18.26% 56.66% at 50% 50%, #66442C 0%, #352215 100%)",
        color: "white",
        maxWidth: "min(100%, 936px)",
      },
      duration: 3000,
    }),
  error: (message) =>
    toast.error(message, {
      style: {
        background:
          "radial-gradient(18.26% 56.66% at 50% 50%, #66442C 0%, #352215 100%)",
        color: "white",
        maxWidth: "min(100%, 936px)",
      },
      id: "error-toast",
      duration: 3000,
    }),
  loading: (message) => toast.loading(message, { id: "loading-toast" }),
  custom: (message, options) =>
    toast.custom(
      <div
        size="lg"
        as="p"
        className="flex gap-1 rounded p-3 sm:flex-col sm:items-center sm:rounded-md md:gap-2 md:p-4 lg:rounded-lg"
        style={{
          background:
            "radial-gradient(18.26% 56.66% at 50% 50%, #66442C 0%, #352215 100%)",
          maxWidth: "min(90vw, 936px)",
        }}
        responsive
      >
        <AlertIcon className="size-4 max-sm:mt-[3px] sm:size-6 lg:size-7" />
        <Text size="lg" as="p" className="flex-1 text-white-a700" responsive>
          {message}
        </Text>
      </div>,
      {
        id: "custom-toast",
        duration: 3000,
        ...(options || {}),
      },
    ),
};

export default ToastComponent;
