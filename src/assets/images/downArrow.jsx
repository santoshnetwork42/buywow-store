import React from "react";

export const DownArrowIconSVG = ({
  fillColor = "#000000",
  className = "",
  strokeWidth = 1, // Default stroke width
  ...props
}) => {
  const width = props?.width || 10;
  const height = props?.height || 10;
  const halfWidth = width / 2;
  const halfHeight = height / 2;

  return (
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
      height={height}
      width={width}
      viewBox={`0 0 ${width} ${height}`}
    >
      <path
        d={`M${halfWidth - 4} ${halfHeight - 2} L${halfWidth} ${halfHeight + 2} L${halfWidth + 4} ${halfHeight - 2}`}
        stroke={fillColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth} // Add strokeWidth here
      />
    </svg>
  );
};
