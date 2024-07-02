"use client";

import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";

const Button = ({ children, className, leftIcon, rightIcon, ...restProps }) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const rippleEffect = (event) => {
      const btn = event.currentTarget;

      const circle = document.createElement("span");
      const diameter = Math.max(btn.clientWidth, btn.clientHeight);
      const radius = diameter / 2;

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${event.clientX - btn.getBoundingClientRect().left - radius}px`;
      circle.style.top = `${event.clientY - btn.getBoundingClientRect().top - radius}px`;
      circle.classList.add("ripple");

      const ripple = btn.getElementsByClassName("ripple")[0];

      if (ripple) {
        ripple.remove();
      }

      btn.appendChild(circle);
    };

    button.addEventListener("click", rippleEffect);

    return () => {
      button.removeEventListener("click", rippleEffect);
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      className={twMerge(
        "relative flex-row items-center justify-center overflow-hidden rounded-full bg-yellow-900 px-4 py-1 text-center font-medium text-white-a700_01 sm:text-base lg:text-lg",
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
