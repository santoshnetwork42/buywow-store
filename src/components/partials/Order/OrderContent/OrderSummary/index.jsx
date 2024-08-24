import { Text } from "@/components/elements";
import { toDecimal } from "@/utils/helpers";
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
          className={`text-sm text-gray-600 ${valueClassName}`}
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

const SubtotalRow = React.memo(({ itemsTotalPrice, activeItemsTotalPrice }) => (
  <SummaryRow
    label="Subtotal:"
    value={
      <div className="flex gap-2">
        <Text
          as="span"
          size="sm"
          className="font-light text-gray-600/70 line-through"
          responsive
        >
          ₹{toDecimal(itemsTotalPrice)}
        </Text>
        <Text
          as="span"
          size="base"
          className="text-sm text-gray-600"
          responsive
        >
          ₹{toDecimal(activeItemsTotalPrice)}
        </Text>
      </div>
    }
  />
));

SubtotalRow.displayName = "SubtotalRow";

const OrderSummary = React.memo(({ order }) => {
  if (!order) return null;

  const {
    prepaidDiscount = 0,
    totalDiscount = 0,
    appliedRewardPoints = 0,
    totalShippingCharges = 0,
    totalCashOnDeliveryCharges = 0,
    totalCashbackRefunded = 0,
    totalAmount = 0,
    paymentType = "",
    totalPrepaidAmount = 0,
    products = { items: [] },
  } = order;

  const { itemsTotalPrice, activeItemsTotalPrice } = useMemo(() => {
    const orderItems = products?.items || [];
    return {
      activeItemsTotalPrice: orderItems.reduce(
        (total, item) => total + (item.quantity || 0) * (item.price || 0),
        0,
      ),
      itemsTotalPrice: orderItems.reduce(
        (total, item) =>
          total +
          ((item.quantity || 0) + (item.cancelledQuantity || 0)) *
            (item.price || 0),
        0,
      ),
    };
  }, [products?.items]);

  const calculatePrepaidDiscount = useMemo(() => {
    if (!prepaidDiscount || !activeItemsTotalPrice || !itemsTotalPrice)
      return 0;
    return (prepaidDiscount * activeItemsTotalPrice) / itemsTotalPrice;
  }, [prepaidDiscount, activeItemsTotalPrice, itemsTotalPrice]);

  const totalWithRewardsAndCashback = useMemo(
    () => totalAmount - appliedRewardPoints + totalCashbackRefunded,
    [totalAmount, appliedRewardPoints, totalCashbackRefunded],
  );

  const remainingAmount = useMemo(
    () => totalWithRewardsAndCashback - totalPrepaidAmount,
    [totalWithRewardsAndCashback, totalPrepaidAmount],
  );

  return (
    <div className="flex flex-col gap-3 rounded-md border p-4 md:gap-4 md:p-5">
      <SubtotalRow
        itemsTotalPrice={itemsTotalPrice}
        activeItemsTotalPrice={activeItemsTotalPrice}
      />

      {!!prepaidDiscount && (
        <SummaryRow
          label="Prepaid Discount:"
          value={`₹${toDecimal(calculatePrepaidDiscount)}`}
          valueClassName="text-green-600"
        />
      )}

      {!!totalDiscount && (
        <SummaryRow label="Discount:" value={`-₹${toDecimal(totalDiscount)}`} />
      )}

      {!!appliedRewardPoints && (
        <SummaryRow
          label="WOW Cash:"
          value={`-₹${toDecimal(appliedRewardPoints)}`}
        />
      )}

      <SummaryRow
        label="Shipping:"
        value={
          totalShippingCharges > 0
            ? `₹${toDecimal(totalShippingCharges)}`
            : "Free shipping"
        }
      />

      {!!totalCashOnDeliveryCharges && (
        <SummaryRow
          label="COD Charges:"
          value={`₹${toDecimal(totalCashOnDeliveryCharges)}`}
        />
      )}

      <SummaryRow
        label="Total:"
        value={`₹${toDecimal(totalWithRewardsAndCashback)}`}
        valueClassName="text-base text-black-900"
        valueSize="xl"
        showBorder={paymentType === "PPCOD"}
      />

      {paymentType === "PPCOD" && (
        <>
          <SummaryRow
            label="Paid Amount:"
            value={`₹${toDecimal(totalPrepaidAmount)}`}
          />
          <SummaryRow
            label="To Pay:"
            value={`₹${toDecimal(remainingAmount)}`}
            valueClassName="text-base text-black-900"
            valueSize="xl"
            showBorder={false}
          />
        </>
      )}
    </div>
  );
});

OrderSummary.displayName = "OrderSummary";

export default OrderSummary;
