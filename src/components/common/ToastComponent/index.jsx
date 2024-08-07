"use client";

import React from "react";
import { Toaster, toast } from "react-hot-toast";

// Generic Toast Component
const ToastComponent = () => {
  return <Toaster position="bottom-right" reverseOrder={false} />;
};

export const showToast = {
  success: (message) => toast.success(message),
  error: (message) => toast.error(message),
  loading: (message) => toast.loading(message),
  custom: (message, options) => toast(message, options),
};

export default ToastComponent;
