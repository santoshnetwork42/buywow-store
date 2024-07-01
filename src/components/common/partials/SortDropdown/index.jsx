import React, { useState } from "react";
import { Text, SelectBox } from "@/components/common";
import { DownArrowIconSVG } from "@/assets/images/downArrow";
import { twMerge } from "tailwind-merge";

const SortDropdown = ({ options, onOptionChange, className }) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleChange = (option) => {
    setSelectedOption(option);
    onOptionChange(option.value);
  };

  return (
    <div
      className={twMerge(
        "flex items-center justify-center gap-[7px]",
        className,
      )}
    >
      <Text size="sm" as="p" responsive>
        Sort By:
      </Text>
      <SelectBox
        indicator={
          <DownArrowIconSVG
            strokeWidth={1.25}
            width={14}
            height={14}
            className="ml-2"
          />
        }
        name="sortDropdown"
        value={selectedOption}
        options={options}
        onChange={handleChange}
        className="flex flex-grow !cursor-pointer border-b border-black-900 py-0.5 text-sm font-medium"
        styles={{
          menu: (provided) => ({
            ...provided,
            minWidth: "120px",
            width: "max-content",
            right: "0px",
            "@media (max-width: 576px)": {
              minWidth: "100px",
            },
          }),
          option: (provided) => ({
            ...provided,
            fontSize: "14px",
            "@media (max-width: 576px)": {
              fontSize: "12px",
            },
          }),
          control: (provided) => ({
            ...provided,
            backgroundColor: "transparent",
            border: "0 !important",
            boxShadow: "0 !important",
            minHeight: "auto",
            cursor: "pointer",
            width: "100%",
            "&:hover": {
              border: "0 !important",
            },
            "@media (max-width: 576px)": {
              fontSize: "12px",
            },
          }),
          valueContainer: (provided) => ({
            ...provided,
            padding: "0px",
          }),
        }}
      />
    </div>
  );
};

export default SortDropdown;
