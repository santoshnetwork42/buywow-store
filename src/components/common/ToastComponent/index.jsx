"use client";

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
    }),
  loading: (message) => toast.loading(message, { id: "loading-toast" }),
  custom: (message, options) =>
    toast(message, {
      style: {
        background:
          "radial-gradient(18.26% 56.66% at 50% 50%, #66442C 0%, #352215 100%)",
        color: "white",
        maxWidth: "min(100%, 936px)",
      },
      id: "custom-toast",
      ...options,
    }),
};

export default ToastComponent;
