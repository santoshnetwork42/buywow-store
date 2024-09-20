import { DownArrowIconSVG } from "@/assets/svg/icons";
import { SelectBox } from "@/components/elements";
import { twMerge } from "tailwind-merge";

const VariantSelector = ({
  variantGroup,
  selectedVariantGroupOptions,
  handleOnChangeVariant,
  isFreeProduct,
  disableChange,
  variantClassName,
  className,
}) => {
  if (
    !variantGroup ||
    variantGroup.length === 0 ||
    isFreeProduct ||
    disableChange
  )
    return null;

  return (
    <div className={twMerge("flex flex-wrap gap-1 lg:gap-2", className)}>
      {variantGroup.map((group) => {
        const options = group.variantOptions
          .filter((option) => option.active)
          .map((option) => ({
            value: option.id,
            label: option.label,
          }));

        const selectedOption =
          options.find(
            (option) =>
              option.value ===
              selectedVariantGroupOptions.find(
                (item) => item.variantGroupId === group.id,
              )?.variantGroupOptionId,
          ) || options[0];

        return (
          <div
            key={group.id}
            className={twMerge(
              "w-[calc(50%-4px)] min-w-[80px] max-w-fit md:min-w-[100px]",
              variantClassName,
            )}
          >
            <SelectBox
              indicator={
                <DownArrowIconSVG
                  strokeWidth={1.25}
                  width={14}
                  height={14}
                  className="w-3 md:ml-0 md:w-[14px]"
                />
              }
              name={`${group.id}`}
              value={selectedOption}
              options={options}
              // menuIsOpen
              onChange={(selectedOption) =>
                handleOnChangeVariant(group.id, selectedOption.value)
              }
              className="flex !cursor-pointer rounded-md border border-black-900 p-[5px] sm:p-[5.5px] lg:p-[7.5px]"
              styles={{
                singleValue: (provided) => ({
                  ...provided,
                  textOverflow: "clip",
                }),
                menuPortal: (provided) => ({ ...provided, zIndex: 100 }),
                menu: (provided) => ({
                  ...provided,
                  borderRadius: "6px",
                  overflow: "hidden",
                  zIndex: "1000",
                  left: "-7.5px",
                  top: "4px",
                  width: "calc(100% + 15px)",
                  "@media (max-width: 992px)": {
                    left: "-5.5px",
                    top: "2px",
                    width: "calc(100% + 11px)",
                  },
                  "@media (max-width: 567px)": {
                    left: "-5px",
                    top: "1px",
                    width: "calc(100% + 10px)",
                  },
                }),
                menuList: (provided) => ({
                  ...provided,
                  padding: "0px",
                }),
                option: (provided) => ({
                  ...provided,
                  fontSize: "12px",
                  padding: "7px 10px",
                  cursor: "pointer",
                  "@media (max-width: 992px)": {
                    padding: "5.5px 8px",
                  },
                  "@media (max-width: 567px)": {
                    fontSize: "11px",
                    padding: "5px 7px",
                  },
                }),
                control: (provided) => ({
                  ...provided,
                  backgroundColor: "transparent",
                  border: "0 !important",
                  boxShadow: "0 !important",
                  minHeight: "auto",
                  width: "100%",
                  cursor: "pointer",
                  fontSize: "12px",
                  "&:hover": {
                    border: "0 !important",
                  },
                  "@media (max-width: 567px)": {
                    fontSize: "11px",
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
      })}
    </div>
  );
};

export default VariantSelector;
