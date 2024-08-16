"use client";

import PropTypes from "prop-types";
import React, { useCallback, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

const InputComponent = React.forwardRef(
  (
    {
      className = "flex w-full items-center justify-center gap-2",
      inputClassName = "",
      name = "",
      placeholder = "",
      type = "text",
      label = "",
      labelClassName = "",
      prefix,
      suffix,
      error,
      onChange,
      onBlur,
      onFocus,
      disabled = false,
      required = false,
      value,
      rows = 3,
      isTextarea = false,
      ...restProps
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef(null);

    const handleFocus = useCallback(
      (e) => {
        setIsFocused(true);
        if (onFocus) onFocus(e);
      },
      [onFocus],
    );

    const handleBlur = useCallback(
      (e) => {
        setIsFocused(false);
        if (onBlur) onBlur(e);
      },
      [onBlur],
    );

    const handleLabelClick = useCallback(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, []);

    const borderColorClass = error ? "border-red-500" : "border-gray-300";
    const labelColorClass = error
      ? "text-red-500"
      : isFocused || value
        ? "text-blue-500"
        : "text-gray-500";

    const InputElement = isTextarea ? "textarea" : "input";

    return (
      <div className={`relative ${className} ${borderColorClass}`}>
        {prefix}
        <InputElement
          ref={(node) => {
            inputRef.current = node;
            if (typeof ref === "function") {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
          }}
          className={`peer w-full ${inputClassName}`}
          type={isTextarea ? undefined : type}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          disabled={disabled}
          required={required}
          value={value}
          rows={isTextarea ? rows : undefined}
          {...restProps}
        />
        {label && (
          <label
            onClick={handleLabelClick}
            className={twMerge(
              "absolute left-0 top-1/2 ml-2 -translate-y-1/2 cursor-text bg-white-a700_01 px-1 text-base leading-[1.25] transition-all duration-300 peer-focus:top-0 peer-focus:scale-75",
              labelColorClass,
              labelClassName,
              isFocused || value ? "!top-0 scale-75" : "",
            )}
          >
            {label}
            {required && <span className="ml-1 text-red-500">*</span>}
          </label>
        )}
        {suffix}
      </div>
    );
  },
);

InputComponent.propTypes = {
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  prefix: PropTypes.node,
  suffix: PropTypes.node,
  error: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  value: PropTypes.string,
  rows: PropTypes.number,
  isTextarea: PropTypes.bool,
};

InputComponent.displayName = "InputComponent";

export { InputComponent as Input };
