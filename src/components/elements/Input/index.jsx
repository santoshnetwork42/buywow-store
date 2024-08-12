/* eslint-disable react/display-name */
/* eslint-disable react/display-name */
"use client";

import React, { useState, useRef } from "react";
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
    const inputRef = useRef(null);

    const handleFocus = (e) => {
      setIsFocused(true);
      if (onFocus) onFocus(e);
    };

    const handleBlur = (e) => {
      setIsFocused(false);
      if (onBlur) onBlur(e);
    };

    const handleLabelClick = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    const borderColorClass = error ? "border-red-500" : "border-gray-300";
    const labelColorClass = error
      ? "text-red-500"
      : isFocused || value
        ? "text-blue-500"
        : "text-gray-500";

    return (
      <div className={`relative ${className} ${borderColorClass}`}>
        {prefix}
        <input
          ref={(node) => {
            inputRef.current = node;
            if (typeof ref === "function") {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
          }}
          className={`peer w-full p-2 outline-none transition-all duration-300 ${inputClassName} `}
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          disabled={disabled}
          required={required}
          value={value}
          {...restProps}
        />
        <label
          onClick={handleLabelClick}
          className={`absolute left-2 top-1 text-lg transition-all duration-300 ${labelColorClass} ${isFocused || value ? "-translate-y-5 scale-75" : ""} cursor-pointer bg-white-a700_01 peer-focus:-translate-y-5 peer-focus:scale-75`}
        >
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
        {suffix}
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
