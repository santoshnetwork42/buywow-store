"use client";

import { Text } from "@/components/elements";
import dynamic from "next/dynamic";
import { Toaster, toast } from "react-hot-toast";
import { twMerge } from "tailwind-merge";

const AlertIcon = dynamic(() => import("@/assets/svg/alertIcon"));

// Generic Toast Component
const ToastComponent = () => {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      containerStyle={{ transform: "translateY(16px)" }}
    />
  );
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
    toast.error(
      <Text
        size="base"
        as="p"
        className="flex-1 text-sm text-white-a700"
        responsive
      >
        {message}
      </Text>,
      {
        style: {
          background:
            "radial-gradient(18.26% 56.66% at 50% 50%, #66442C 0%, #352215 100%)",
          color: "white",
          maxWidth: "min(100%, 700px)",
        },
        id: "error-toast",
        duration: 3000,
      },
    ),
  loading: (message) => toast.loading(message, { id: "loading-toast" }),
  custom: (message, options, textClassName = "", mainClassName = "") =>
    toast.custom(
      <div
        size="lg"
        as="p"
        className={twMerge(
          "flex gap-1 rounded p-3 sm:flex-col sm:items-center sm:rounded-md md:gap-2 md:p-4 lg:rounded-lg",
          mainClassName,
        )}
        style={{
          background:
            "radial-gradient(18.26% 56.66% at 50% 50%, #66442C 0%, #352215 100%)",
          maxWidth: "min(90vw, 936px)",
        }}
      >
        <AlertIcon className="size-4 max-sm:mt-1 sm:size-6 lg:size-7" />
        <Text
          size="lg"
          as="p"
          className={twMerge("flex-1 text-white-a700", textClassName)}
          responsive
        >
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
