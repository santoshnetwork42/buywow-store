/* eslint-disable react/display-name */
"use client";

import { Text } from "@/components/elements";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";

const SelectBox = React.forwardRef(
  (
    {
      children,
      className = "",
      options = [],
      isSearchable = false,
      isMulti = false,
      indicator,
      value,
      onChange,
      ...restProps
    },
    ref,
  ) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState({
      label: value?.label,
      value: value?.value,
    });
    const selectRef = useRef(null);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (selectRef.current && !selectRef.current.contains(event.target)) {
          setIsMenuOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    useEffect(() => {
      setSelectedValue({
        label: value?.label,
        value: value?.value,
      });
    }, [value]);

    const handleOptionClick = (option) => {
      setSelectedValue({
        label: option.label,
        value: option.value,
      });
      setIsMenuOpen(false);
      if (onChange) {
        onChange(option);
      }
    };

    return (
      <div className={`relative ${className}`} ref={selectRef}>
        <div
          className="flex w-full cursor-pointer items-center justify-between"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Text size="sm">{selectedValue?.label}</Text>
          {indicator}
        </div>
        {isMenuOpen && (
          <div className="absolute left-0 top-full z-20 mt-1 flex w-full flex-col rounded-md border bg-white-a700_01 py-1">
            {options?.map((option, index) => (
              <div
                key={option?.value}
                className={`cursor-pointer p-2 ${
                  selectedValue && selectedValue.value === option.value
                    ? "bg-blue-500"
                    : "hover:bg-sky-200"
                }`}
                onClick={() => handleOptionClick(option)}
              >
                <Text
                  size="sm"
                  className={`${
                    selectedValue && selectedValue.value === option.value
                      ? "text-white-a700_01"
                      : ""
                  }`}
                >
                  {option?.label}
                </Text>
              </div>
            ))}
          </div>
        )}
        {children}
      </div>
    );
  },
);

SelectBox.propTypes = {
  className: PropTypes.string,
  options: PropTypes.array,
  isSearchable: PropTypes.bool,
  isMulti: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.any,
  }),
  indicator: PropTypes.node,
};

export { SelectBox };
