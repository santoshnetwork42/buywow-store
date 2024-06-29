import React from "react";
import { twMerge } from "tailwind-merge";

const sizes = {
  textxxs: "text-[10px] font-normal not-italic",
  textxs: "text-xs font-normal not-italic",
  texts: "text-sm font-normal not-italic",
  textbase: "text-base font-normal not-italic",
  textlg: "text-lg font-normal not-italic",
  textxl: "text-xl font-normal not-italic",
  text2xl: "text-2xl font-normal not-italic",
  text3xl: "text-3xl font-normal not-italic",
  text4xl: "text-4xl font-normal not-italic",
  text5xl: "text-5xl font-normal not-italic",
  text6xl: "text-6xl font-normal not-italic",
  text7xl: "text-7xl font-normal not-italic",
  text8xl: "text-8xl font-normal not-italic",
  text9xl: "text-9xl font-normal not-italic",
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
      className={twMerge(
        "font-outfit leading-[1.25] text-black-900",
        sizes[size],
        className,
      )}
      {...restProps}
    >
      {children}
    </Component>
  );
};

export { Text };
