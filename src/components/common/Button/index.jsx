"use client";
import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";
import { useRippleEffect } from "@/utils/hooks/useRippleEffect";
import { LoaderIcon } from "@/assets/svg/icons";

const Button = ({
  children,
  className,
  leftIcon,
  rightIcon,
  variant = "primary",
  size = "medium",
  fullWidth = false,
  enableRipple = true,
  loader = false,
  loaderClass = "",
  disabled = false,
  ...restProps
}) => {
  const buttonRef = useRippleEffect(enableRipple && !disabled && !loader);

  const baseClasses =
    "relative flex items-center justify-center overflow-hidden rounded-full font-medium transition-colors duration-200";

  const variantClasses = {
    primary: "bg-yellow-900 text-white-a700_01",
    secondary: "bg-white text-black-900 ",
    outlined:
      "bg-transparent border border-yellow-900 text-yellow-900 hover:bg-yellow-50",
  };

  const sizeClasses = {
    small: "px-3 py-1 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg",
  };

  const classes = twMerge(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    fullWidth ? "w-full" : "",
    disabled || loader ? "opacity-50 cursor-not-allowed" : "",
    className,
  );

  return (
    <button ref={buttonRef} className={classes} {...restProps}>
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {loader && (
        <div className={`animate-spin ${loaderClass}`}>
          <LoaderIcon size="16" />
        </div>
      )}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  variant: PropTypes.oneOf(["primary", "secondary", "outlined"]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  fullWidth: PropTypes.bool,
};

export { Button };
