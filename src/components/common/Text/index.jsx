import React from "react";

const sizes = {
  textxs: "text-[6px] font-normal not-italic",
  texts: "text-[10px] font-light",
  textlg: "text-xs font-normal not-italic",
  textxl: "text-sm font-normal not-italic",
  text2xl: "text-[15px] font-normal not-italic",
  text3xl: "text-base font-normal not-italic",
  text4xl: "text-lg font-normal not-italic",
};

const Text = ({ children, className = "", as, size = "textxl", ...restProps }) => {
  const Component = as || "p";

  return (
    <Component
      className={`text-black-900 font-outfit ${className} ${sizes[size]}`}
      {...restProps}>
      {children}
    </Component>
  );
};

export { Text };
