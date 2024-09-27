import React from "react";
import { twMerge } from "tailwind-merge";

const ProgressBar = ({ progress, color = "bg-yellow-900", className }) => {
  return (
    <div className={twMerge("h-1 w-full rounded-md bg-gray-200", className)}>
      <div
        className={`h-1 rounded-md ${color}`}
        style={{ width: `${progress}%`, transition: "width 0.5s ease-in-out" }}
      ></div>
    </div>
  );
};

export default ProgressBar;
