import React from "react";
import { twMerge } from "tailwind-merge";

const textSizes = {
  xxs: "text-[10px]",
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
  "5xl": "text-5xl",
  "6xl": "text-6xl",
};

const responsiveTextSizes = {
  xs: "text-[10px] md:text-xs",
  sm: "text-xs md:text-sm",
  base: "text-xs sm:text-sm lg:text-base",
  lg: "text-sm sm:text-base lg:text-lg",
  xl: "text-base sm:text-lg lg:text-xl",
  "2xl": "text-lg sm:text-xl lg:text-2xl",
  "3xl": "text-xl sm:text-2xl lg:text-3xl",
  "4xl": "text-2xl sm:text-3xl lg:text-4xl",
  "5xl": "text-3xl sm:text-4xl lg:text-5xl",
  "6xl": "text-4xl sm:text-5xl lg:text-6xl",
};

const Text = ({
  children,
  className = "",
  size = "base",
  responsive = true,
  as,
  ...restProps
}) => {
  const Component = as || "p";
  const sizeClasses = responsive ? responsiveTextSizes[size] : textSizes[size];

  return (
    <Component
      className={twMerge(
        sizeClasses,
        "font-outfit font-normal leading-tight text-gray-900",
        className,
      )}
      {...restProps}
    >
      {children}
    </Component>
  );
};

export { Text };
