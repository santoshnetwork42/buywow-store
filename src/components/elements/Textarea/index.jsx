/* eslint-disable react/display-name */
"use client";

import React, { useState } from "react";
import PropTypes from "prop-types";

const Textarea = React.forwardRef(
  (
    {
      className = "flex w-full items-center justify-center gap-2",
      textareaClassName = "",
      labelClass = "",
      name = "",
      placeholder = "",
      label = "",
      error,
      onChange,
      onBlur,
      onFocus,
      disabled = false,
      required = false,
      rows = 3,
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
          <textarea
            ref={ref}
            className={`peer w-full p-2 outline-none transition-all duration-300 ${textareaClassName} ${borderColorClass}`}
            name={name}
            placeholder=" "
            onChange={onChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            disabled={disabled}
            required={required}
            rows={rows}
            value={value}
            {...restProps}
          />
          <label
            className={`absolute top-1 text-lg transition-all duration-300 ${labelColorClass} ${isFocused || value ? "left-0 -translate-y-5 scale-75" : "left-2"} bg-white-a700_01 peer-focus:-translate-y-5 peer-focus:scale-75`}
          >
            {placeholder}
            {required && <span className="ml-1 text-red-500">*</span>}
          </label>
        </div>
      </div>
    );
  },
);

Textarea.propTypes = {
  className: PropTypes.string,
  textareaClassName: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  rows: PropTypes.number,
  value: PropTypes.string,
};

export { Textarea };
