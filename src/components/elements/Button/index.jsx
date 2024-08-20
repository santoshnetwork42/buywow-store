"use client";

import { LoaderIcon } from "@/assets/svg/icons";
import { useRippleEffect } from "@/utils/hooks/useRippleEffect";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";
import { useCallback } from "react";
import { twMerge } from "tailwind-merge";

const Button = ({
  children,
  className,
  leftIcon,
  rightIcon,
  variant = "none",
  size = "none",
  fullWidth = false,
  enableRipple = true,
  loader = false,
  loaderClass = "",
  disabled = false,
  onClick,
  redirectTo,
  ...restProps
}) => {
  const router = useRouter();
  const buttonRef = useRippleEffect(enableRipple && !disabled && !loader);

  const baseClasses =
    "relative flex gap-2 items-center justify-center overflow-hidden capitalize rounded-full font-medium transition-colors duration-200 !leading-tight";

  const variantClasses = {
    primary: "bg-yellow-900 text-white-a700_01",
    secondary: "bg-white text-black-900",
    outlined: "bg-transparent border border-black-900 rounded ",
    none: "",
  };

  const sizeClasses = {
    small: "px-3 py-1.5  text-sm md:text-base",
    medium: "px-3 py-1 text-sm sm:text-base md:px-4 md:py-1.5 lg:text-lg",
    large:
      "px-4 py-2 text-base font-semibold sm:text-lg md:px-5 md:py-3 lg:text-xl",
    none: "",
  };

  const classes = twMerge(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    fullWidth ? "w-full" : "",
    disabled || loader ? "opacity-50 cursor-not-allowed" : "",
    className,
  );

  const handleClick = useCallback(
    (e) => {
      if (onClick && !disabled && !loader) {
        e.preventDefault();
        if (!!redirectTo) {
          router.push(redirectTo);
        }
        onClick(e);
      }
    },
    [onClick, disabled, loader, redirectTo, router],
  );

  return (
    <button
      ref={buttonRef}
      className={classes}
      onClick={handleClick}
      disabled={disabled || loader}
      {...restProps}
    >
      {leftIcon && <span>{leftIcon}</span>}
      {children}
      {loader && (
        <div className={`animate-spin ${loaderClass}`}>
          <LoaderIcon size="16" />
        </div>
      )}
      {rightIcon && <span>{rightIcon}</span>}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  variant: PropTypes.oneOf(["primary", "secondary", "outlined", "none"]),
  size: PropTypes.oneOf(["small", "medium", "large", "none"]),
  fullWidth: PropTypes.bool,
  enableRipple: PropTypes.bool,
  loader: PropTypes.bool,
  loaderClass: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export { Button };
