"use client";
import React, { useState } from "react";
import { Text } from "@/components/common";

const PlusMinusToggle = ({ open }) => {
  return (
    <div
      className={`relative flex h-6 w-6 cursor-pointer items-center justify-center ${
        open ? "open" : ""
      }`}
    >
      <div className="absolute h-0.5 w-3 origin-center transform bg-gray-500 transition-all duration-300">
        <div
          className={`absolute h-0.5 w-3 origin-center transform bg-gray-500 transition-all duration-300 ${
            open ? "" : "rotate-90"
          }`}
        ></div>
      </div>
    </div>
  );
};

export default PlusMinusToggle;
