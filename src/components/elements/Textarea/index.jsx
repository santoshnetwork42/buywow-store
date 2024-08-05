/* eslint-disable react/display-name */
"use client";

import React from "react";
import PropTypes from "prop-types";

const Textarea = React.forwardRef(
  (
    {
      className = "flex w-full items-center justify-center gap-2",
      textareaClassName = "",
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
      ...restProps
    },
    ref,
  ) => (
    <div className="flex w-full flex-col gap-2">
      {label && (
        <div>
          {label}
          {required && <span className="textarea-required">*</span>}
        </div>
      )}
      <div className={className}>
        <textarea
          ref={ref}
          className={textareaClassName}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          disabled={disabled}
          required={required}
          rows={rows}
          {...restProps}
        />
      </div>
      {error && <p className="textarea-error-message">{error}</p>}
    </div>
  ),
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
};

export { Textarea };
