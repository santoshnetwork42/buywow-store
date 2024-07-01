import React from "react";
import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";

const Button = ({ children, className, leftIcon, rightIcon, ...restProps }) => {
  return (
    <button
      className={twMerge(
        "flex-row items-center justify-center rounded-full bg-yellow-900 px-4 py-1 text-center font-medium text-white-a700_01 sm:text-base lg:text-lg",
        className,
      )}
      {...restProps}
    >
      {!!leftIcon && leftIcon}
      {children}
      {!!rightIcon && rightIcon}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
};

export { Button };
