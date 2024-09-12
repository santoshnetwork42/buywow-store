import React from "react";

const PlusMinusToggle = ({ open }) => {
  return (
    <div
      className={`relative flex h-6 w-6 cursor-pointer items-center justify-center ${
        open ? "open" : ""
      }`}
    >
      <div className="absolute h-0.5 w-3 origin-center transform bg-black-900 transition-all duration-300">
        <div
          className={`absolute h-0.5 w-3 origin-center transform bg-black-900 transition-all duration-300 ${
            open ? "" : "rotate-[90deg]"
          }`}
        ></div>
      </div>
    </div>
  );
};

export default PlusMinusToggle;
