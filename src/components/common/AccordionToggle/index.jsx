"use client";

import React from "react";
import { twMerge } from "tailwind-merge";

const ToggleArrow = ({ open, onToggle, className }) => {
  return (
    <div
      className="flex aspect-square w-5 cursor-pointer justify-center pt-2.5 text-center"
      onClick={onToggle}
    >
      <div
        className={twMerge(
          "h-0.5 w-2.5 origin-center transform rounded-full bg-black-900 transition-transform duration-300 ease-in-out",
          className,
          open ? "-rotate-45" : "rotate-45",
        )}
      ></div>
      <div
        className={twMerge(
          "-mx-1 h-0.5 w-2.5 origin-center transform rounded-full bg-black-900 transition-transform duration-300 ease-in-out",
          className,
          open ? "rotate-45" : "-rotate-45",
        )}
      ></div>
    </div>
  );
};

export default ToggleArrow;
