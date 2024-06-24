import React from "react";

export const CloseSVG = ({ fillColor = "#000000", className = "", ...props }) => {
  return (
    <svg
      fill={fillColor}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
      height={props?.width || 20}
      width={props?.height || 20}
      viewBox={`0 0 ${props?.width || 20} ${props?.height || 20}`}>
      <path
        d="M18 6L6 18"
        stroke={fillColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 6L18 18"
        stroke={fillColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
