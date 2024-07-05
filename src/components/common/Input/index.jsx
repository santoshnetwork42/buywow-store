/* eslint-disable react/display-name */
"use client";

import React from "react";
import PropTypes from "prop-types";

const Input = React.forwardRef(
  (
    {
      className = "",
      inputClassName = "",
      name = "",
      placeholder = "",
      type = "text",
      label = "",
      prefix,
      suffix,
      error,
      onChange,
      onBlur,
      onFocus,
      disabled = false,
      required = false,
      ...restProps
    },
    ref,
  ) => {
    return (
      <label className={`${className}`}>
        {!!label && label}
        {required && <span className="input-required">*</span>}
        <div className="flex w-full items-center justify-center">
          {!!prefix && prefix}
          <input
            ref={ref}
            className={`${inputClassName}`}
            type={type}
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            disabled={disabled}
            required={required}
            {...restProps}
          />
          {!!suffix && suffix}
        </div>
        {error && <p className="input-error-message">{error}</p>}
      </label>
    );
  },
);

Input.propTypes = {
  className: PropTypes.string,
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
};

export { Input };
