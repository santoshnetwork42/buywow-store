import { Text } from "@/components/elements";
import { toDecimal } from "@/utils/helpers";
import React from "react";
import { twMerge } from "tailwind-merge";

const PaymentMethod = React.memo(
  ({
    id,
    total,
    tag,
    tagVariant = "success",
    label,
    description,
    disabled = false,
    selectedPaymentMethod,
    onMethodChange,
  }) => {
    if (!id || !label) return null;

    const handleClick = () => {
      if (!disabled && onMethodChange) {
        onMethodChange(id);
      }
    };

    return (
      <div
        className={twMerge(
          "flex w-full items-center justify-between gap-4 rounded-md border bg-white-a700_01 p-3 shadow-sm",
          disabled ? "cursor-not-allowed bg-gray-200" : "cursor-pointer",
        )}
        onClick={handleClick}
      >
        <div className="flex gap-2">
          <div>
            <input
              type="radio"
              id={id}
              name="paymentMethod"
              value={id}
              checked={selectedPaymentMethod === id}
              onChange={handleClick}
              className={`checked:bg-yellow-900 hover:checked:bg-yellow-900 focus:border-gray-500 focus:checked:bg-yellow-900 ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
              disabled={disabled}
            />
          </div>
          <div className="flex flex-col gap-0.5 md:gap-1">
            <div className="flex items-center gap-1.5 md:gap-2">
              <Text
                as="label"
                size="base"
                htmlFor={id}
                className="shrink-0 cursor-pointer text-sm"
                responsive
              >
                {label}
              </Text>
              {tag && (
                <Text
                  as="span"
                  size="xs"
                  className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium ${tagVariant === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                  responsive
                >
                  {tag}
                </Text>
              )}
            </div>
            {description && (
              <Text
                as="label"
                size="sm"
                htmlFor={id}
                className="cursor-pointer text-gray-600"
                responsive
              >
                {description}
              </Text>
            )}
          </div>
        </div>
        <Text as="span" size="base">
          ₹{toDecimal(total)}
        </Text>
      </div>
    );
  },
);

PaymentMethod.displayName = "PaymentMethod";

export default PaymentMethod;
