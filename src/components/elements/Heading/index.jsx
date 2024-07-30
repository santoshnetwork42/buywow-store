import React from "react";
import { twMerge } from "tailwind-merge";

const headingSizes = {
  xs: "text-xs font-medium",
  sm: "text-sm font-medium",
  base: "text-base font-medium",
  lg: "text-lg font-medium",
  xl: "text-xl font-medium",
  "2xl": "text-2xl font-semibold",
  "3xl": "text-3xl font-semibold",
  "4xl": "text-4xl font-semibold",
  "5xl": "text-5xl font-semibold",
  "6xl": "text-6xl font-semibold",
};

// font-medium: 500, font-semibold: 600, font-bold: 700

const responsiveHeadingSizes = {
  xs: "text-[10px] md:text-xs font-medium",
  sm: "text-xs md:text-sm font-medium",
  base: "text-xs sm:text-sm lg:text-base font-medium",
  lg: "text-sm sm:text-base lg:text-lg font-medium",
  xl: "text-base sm:text-lg lg:text-xl font-semibold",
  "2xl": "text-lg sm:text-xl lg:text-2xl font-semibold",
  "3xl": "text-xl sm:text-2xl lg:text-3xl font-semibold",
  "4xl": "text-2xl sm:text-3xl lg:text-4xl font-semibold",
  "5xl": "text-3xl sm:text-4xl lg:text-5xl font-semibold",
  "6xl": "text-4xl sm:text-5xl lg:text-6xl font-semibold",
  heading:
    "text-[24px] sm:text-[26px] md:text-[28px] lg:text-[30px] xl:text-[32px] font-semibold text-center",
};

const Heading = ({
  children,
  className = "",
  size = "lg",
  responsive = false,
  as,
  ...restProps
}) => {
  const Component = as || "h2";
  const sizeClasses = responsive
    ? responsiveHeadingSizes[size]
    : headingSizes[size];

  return (
    <Component
      className={twMerge(
        sizeClasses,
        "font-outfit capitalize !leading-tight text-gray-900",
        className,
      )}
      {...restProps}
    >
      {children}
    </Component>
  );
};

export { Heading };
