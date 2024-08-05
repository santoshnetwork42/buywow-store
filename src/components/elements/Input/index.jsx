/* eslint-disable react/display-name */
"use client";

import React, { useState } from "react";
import PropTypes from "prop-types";

const Input = React.forwardRef(
  (
    {
      className = "flex w-full items-center justify-center gap-2",
      inputClassName = "",
      name = "",
      placeholder = "",
      type = "text",
      label = "",
      labelClass = "",
      prefix,
      suffix,
      error,
      onChange,
      onBlur,
      onFocus,
      disabled = false,
      required = false,
      pattern,
      value,
      ...restProps
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = (e) => {
      setIsFocused(true);
      if (onFocus) onFocus(e);
    };

    const handleBlur = (e) => {
      setIsFocused(false);
      if (onBlur) onBlur(e);
    };

    const borderColorClass = error ? "border-red-500" : "border-gray-300";
    const labelColorClass = error
      ? "text-red-500"
      : isFocused || value
        ? "text-blue-500"
        : "text-gray-500";

    return (
      <div className="flex w-full flex-col gap-2">
        <div className={`relative ${className}`}>
          {prefix}
          <input
            ref={ref}
            className={`peer w-full p-2 outline-none transition-all duration-300 ${inputClassName} ${borderColorClass}`}
            type={type}
            name={name}
            placeholder=" "
            onChange={onChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            disabled={disabled}
            required={required}
            value={value}
            {...restProps}
          />
          <label
            className={`absolute left-2 top-1 text-lg transition-all duration-300 ${labelColorClass} ${isFocused || value ? "-translate-y-5 scale-75" : ""} bg-white-a700_01 peer-focus:-translate-y-5 peer-focus:scale-75`}
          >
            {placeholder}
            {required && <span className="ml-1 text-red-500">*</span>}
          </label>
          {suffix}
        </div>
      </div>
    );
  },
);

Input.propTypes = {
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  prefix: PropTypes.node,
  suffix: PropTypes.node,
  error: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  pattern: PropTypes.string,
  value: PropTypes.string,
};

export { Input };
