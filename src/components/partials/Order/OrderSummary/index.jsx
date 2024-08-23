import { Text } from "@/components/elements";
import React, { useMemo } from "react";

const SummaryRow = React.memo(
  ({
    label,
    value,
    valueClassName = "",
    valueSize = "base",
    showBorder = true,
  }) => (
    <>
      <div className="flex justify-between">
        <Text as="span" size="base" className="text-sm" responsive>
          {label}
        </Text>
        <Text
          as="span"
          size={valueSize}
          className={`text-sm ${valueClassName}`}
          responsive
        >
          {value}
        </Text>
      </div>
      {showBorder && <div className="border-b" />}
    </>
  ),
);

SummaryRow.displayName = "SummaryRow";

const OrderSummary = React.memo(
  ({
    activeItemsTotalPrice = 0,
    itemsTotalPrice = 0,
    prepaidDiscount = 0,
    totalDiscount = 0,
    totalShippingCharges = 0,
    totalCashOnDeliveryCharges = 0,
    totalAmount = 0,
    appliedRewardPoints = 0,
    totalCashbackRefunded = 0,
  }) => {
    const formattedPrepaidDiscount = useMemo(() => {
      if (!prepaidDiscount || !itemsTotalPrice) return 0;
      return (
        (prepaidDiscount * activeItemsTotalPrice) /
        itemsTotalPrice
      ).toFixed(2);
    }, [prepaidDiscount, activeItemsTotalPrice, itemsTotalPrice]);

    const formattedTotal = useMemo(() => {
      return (
        totalAmount -
        appliedRewardPoints +
        totalCashbackRefunded
      ).toFixed(2);
    }, [totalAmount, appliedRewardPoints, totalCashbackRefunded]);

    return (
      <div className="flex flex-col gap-3 rounded-md border p-4 md:gap-4 md:p-5">
        <SummaryRow
          label="Subtotal:"
          value={
            <div className="flex gap-2">
              <Text
                as="span"
                size="sm"
                className="font-light text-gray-600 line-through"
                responsive
              >
                ₹{itemsTotalPrice.toFixed(2)}
              </Text>
              <Text as="span" size="base" className="text-sm" responsive>
                ₹{activeItemsTotalPrice.toFixed(2)}
              </Text>
            </div>
          }
        />

        {!!prepaidDiscount && (
          <SummaryRow
            label="Prepaid Discount:"
            value={`₹${formattedPrepaidDiscount}`}
            valueClassName="text-green-600"
          />
        )}

        {!!totalDiscount && (
          <SummaryRow
            label="Discount:"
            value={`-₹${totalDiscount.toFixed(2)}`}
          />
        )}

        <SummaryRow
          label="Shipping:"
          value={
            totalShippingCharges
              ? `₹${totalShippingCharges.toFixed(2)}`
              : "Free shipping"
          }
        />

        {!!totalCashOnDeliveryCharges && (
          <SummaryRow
            label="COD Charges:"
            value={`₹${totalCashOnDeliveryCharges.toFixed(2)}`}
          />
        )}

        <SummaryRow
          label="Total:"
          value={`₹${formattedTotal}`}
          valueClassName="text-base"
          valueSize="xl"
          showBorder={false}
        />
      </div>
    );
  },
);

OrderSummary.displayName = "OrderSummary";

export default OrderSummary;
