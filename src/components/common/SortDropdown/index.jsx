import { DownArrowIconSVG } from "@/assets/svg/icons";
import { SelectBox, Text } from "@/components/elements";
import { twMerge } from "tailwind-merge";

const SortDropdown = ({ value, options, onOptionChange, className }) => {
  const handleChange = (option) => {
    onOptionChange(option);
  };

  return (
    <div
      className={twMerge(
        "flex items-center justify-center gap-[7px]",
        className,
      )}
    >
      <Text size="base" as="p" responsive>
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
        value={value}
        options={options}
        onChange={handleChange}
        className="flex min-w-[140px] flex-grow !cursor-pointer border-b border-black-900 py-0.5 text-sm font-medium"
        // styles={{
        //   menu: (provided) => ({
        //     ...provided,
        //     minWidth: "120px",
        //     width: "max-content",
        //     right: "0px",
        //     "@media (max-width: 576px)": {
        //       minWidth: "100px",
        //     },
        //   }),
        //   menuPortal: (provided) => ({
        //     ...provided,
        //     zIndex: 10,
        //   }),
        //   option: (provided) => ({
        //     ...provided,
        //     fontSize: "16px",
        //     padding: "10px 14px",
        //     "@media (max-width: 992px)": {
        //       fontSize: "14px",
        //       padding: "8px 12px",
        //     },
        //     "@media (max-width: 576px)": {
        //       fontSize: "12px",
        //       padding: "6px 10px",
        //     },
        //   }),
        //   control: (provided) => ({
        //     ...provided,
        //     backgroundColor: "transparent",
        //     border: "0 !important",
        //     boxShadow: "0 !important",
        //     minHeight: "auto",
        //     cursor: "pointer",
        //     width: "100%",
        //     fontSize: "16px",
        //     "&:hover": {
        //       border: "0 !important",
        //     },
        //     "@media (max-width: 992px)": {
        //       fontSize: "14px",
        //     },
        //     "@media (max-width: 576px)": {
        //       fontSize: "12px",
        //     },
        //   }),
        //   valueContainer: (provided) => ({
        //     ...provided,
        //     padding: "0px",
        //   }),
        // }}
      />
    </div>
  );
};

export default SortDropdown;
