import React from "react";
import { twMerge } from "tailwind-merge";

const sizes = {
  textxs: "text-[6px] font-normal not-italic",
  texts: "text-[10px] font-light",
  textlg: "text-xs font-normal not-italic",
  textxl: "text-xs sm:text-sm font-normal not-italic",
  text2xl: "text-[15px] font-normal not-italic",
  text3xl: "text-xs sm:text-sm lg:text-base font-normal not-italic",
  text4xl: "text-lg font-normal not-italic",
  text5xl: "text-sm sm:text-base lg:text-xl font-normal not-italic",
  text6xl: "text-[24px] sm:text-[28px] lg:text-[32px] font-normal not-italic",
  text8xl: "text-[52px] font-normal not-italic",
  text9xl: "text-[56px] font-normal not-italic",
};

const Text = ({
  children,
  className = "",
  as,
  size = "textxl",
  ...restProps
}) => {
  const Component = as || "p";

  return (
    <Component
      className={twMerge("font-outfit text-black-900", sizes[size], className)}
      {...restProps}
    >
      {children}
    </Component>
  );
};

export { Text };
