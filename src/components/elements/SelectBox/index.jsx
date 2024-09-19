"use client";

import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

const SelectBox = React.forwardRef(
  (
    {
      children,
      className = "",
      options = [],
      isSearchable = false,
      isMulti = false,
      indicator,
      onChange,
      value,
      placeholder = "Select...",
      ...restProps
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const selectRef = useRef(null);

    useEffect(() => {
      if (value) {
        const option = options.find((opt) => opt.value === value);
        setSelectedOption(option);
      }
    }, [value, options]);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (selectRef.current && !selectRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (option) => {
      setSelectedOption(option);
      setIsOpen(false);
      onChange && onChange(option);
    };

    const filteredOptions = isSearchable
      ? options.filter((option) =>
          option.label.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : options;

    return (
      <div
        className={`relative ${className}`}
        ref={(node) => {
          selectRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        {...restProps}
      >
        <div
          className="flex items-center justify-between p-2 border rounded cursor-pointer"
          onClick={toggleDropdown}
        >
          <span>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <span>{indicator || "▼"}</span>
        </div>
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg">
            {isSearchable && (
              <input
                type="text"
                className="w-full p-2 border-b"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            )}
            <ul className="max-h-60 overflow-auto">
              {filteredOptions.map((option) => (
                <li
                  key={option.value}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleOptionClick(option)}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </div>
        )}
        {children}
      </div>
    );
  }
);

SelectBox.propTypes = {
  className: PropTypes.string,
  options: PropTypes.array,
  isSearchable: PropTypes.bool,
  isMulti: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.string,
  indicator: PropTypes.node,
  placeholder: PropTypes.string,
};

SelectBox.displayName = "SelectBox";

export { SelectBox };
