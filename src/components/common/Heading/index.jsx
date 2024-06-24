import React from "react";

const sizes = {
  textmd: "text-[11px] font-medium",
  text4xl: "text-[18px] font-medium",
  text5xl: "text-xl font-medium",
  text6xl: "text-2xl font-medium",
  headingxs: "text-[10px] font-semibold",
  headings: "text-xs font-bold",
  headingmd: "text-sm font-bold",
  headinglg: "text-base font-semibold",
  headingxl: "text-lg font-semibold",
  heading2xl: "text-xl font-semibold",
  heading3xl: "text-[22px] font-bold",
  heading4xl: "text-2xl font-semibold",
  heading5xl: "text-[28px] font-semibold",
  heading6xl: "text-[32px] font-semibold",
  heading8xl: "text-[52px] font-semibold",
};

const Heading = ({ children, className = "", size = "headinglg", as, ...restProps }) => {
  const Component = as || "h6";

  return (
    <Component
      className={`text-black-900 font-outfit ${sizes[size]} ${className} `}
      {...restProps}>
      {children}
    </Component>
  );
};

export { Heading };
