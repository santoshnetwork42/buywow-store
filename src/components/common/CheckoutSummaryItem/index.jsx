import { Text } from "@/components/elements";
import { toDecimal } from "@/utils/helpers";
import React from "react";

const SummaryItem = React.memo(
  ({ label, value, originalValue, color = "text-black-600" }) => (
    <div className="flex items-center justify-between">
      <Text size="lg" as="p" className="capitalize" responsive>
        {label}
      </Text>
      <div className="flex items-center gap-1.5">
        {!!originalValue && originalValue !== value && (
          <Text
            size="sm"
            as="p"
            className="text-[#AAAAAA] line-through"
            responsive
          >
            ₹{toDecimal(originalValue)}
          </Text>
        )}
        <Text size="lg" as="p" className={color} responsive>
          {typeof value === "number"
            ? value < 0
              ? `-₹${toDecimal(Math.abs(value))}`
              : `₹${toDecimal(value)}`
            : value}
        </Text>
      </div>
    </div>
  ),
);

SummaryItem.displayName = "SummaryItem";
export default SummaryItem;
