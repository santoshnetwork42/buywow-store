import React from "react";
import { Text } from "@/components/elements";

const OrderSummary = ({
  activeItemsTotalPrice,
  itemsTotalPrice,
  prepaidDiscount,
  totalDiscount,
  totalShippingCharges,
  totalCashOnDeliveryCharges,
  totalAmount,
  appliedRewardPoints,
  totalCashbackRefunded,
}) => (
  <div className="flex flex-col gap-4 rounded-md border p-5">
    <SummaryRow
      label="Subtotal:"
      value={
        <div className="flex gap-2">
          <Text className="font-light line-through">
            ₹{itemsTotalPrice.toFixed(2)}
          </Text>
          <Text>₹{activeItemsTotalPrice.toFixed(2)}</Text>
        </div>
      }
    />
    <div className="border-b"></div>

    {!!prepaidDiscount && (
      <>
        <SummaryRow
          label="Prepaid Discount:"
          value={`₹${((prepaidDiscount * activeItemsTotalPrice) / itemsTotalPrice).toFixed(2)}`}
          valueClassName="text-green-600"
        />
        <div className="border-b"></div>
      </>
    )}

    {!!totalDiscount && (
      <>
        <SummaryRow label="Discount:" value={`-₹${totalDiscount.toFixed(2)}`} />
        <div className="border-b"></div>
      </>
    )}

    <SummaryRow
      label="Shipping:"
      value={
        totalShippingCharges
          ? `₹${totalShippingCharges.toFixed(2)}`
          : "Free shipping"
      }
    />
    <div className="border-b"></div>

    {!!totalCashOnDeliveryCharges && (
      <>
        <SummaryRow
          label="Cod Charges:"
          value={`₹${totalCashOnDeliveryCharges.toFixed(2)}`}
        />
        <div className="border-b"></div>
      </>
    )}

    <SummaryRow
      label="Total:"
      value={`₹${(totalAmount - appliedRewardPoints + totalCashbackRefunded).toFixed(2)}`}
      valueSize="xl"
    />
  </div>
);

const SummaryRow = ({
  label,
  value,
  valueClassName = "",
  valueSize = "md",
}) => (
  <div className="flex justify-between">
    <Text>{label}</Text>
    <Text size={valueSize} className={valueClassName}>
      {value}
    </Text>
  </div>
);

export default OrderSummary;
