"use client";

import SummaryItem from "@/components/common/CheckoutSummaryItem";
import { Heading, Text } from "@/components/elements";
import { PREPAID_ENABLED } from "@/utils/data/constants";
import { toDecimal } from "@/utils/helpers";
import { useCartTotal, useConfiguration } from "@wow-star/utils-cms";
import React from "react";
import { useSelector } from "react-redux";

const CheckoutSummary = React.memo(() => {
  const prepaidEnabled = useConfiguration(PREPAID_ENABLED, true);

  const appliedCoupon = useSelector((state) => state.cart?.coupon);
  const isRewardApplied = useSelector((state) => state.cart?.isRewardApplied);

  const {
    totalListingPrice,
    totalPrice,
    shippingTotal,
    couponTotal,
    prepaidDiscount,
    prepaidDiscountPercent,
    totalAmountSaved,
    codCharges,
    appliedCODCharges,
    usableRewards,
    grandTotal,
  } = useCartTotal({
    isRewardApplied,
    paymentType: prepaidEnabled ? "PREPAID" : "COD",
  });

  return (
    <div className="mb-3 flex flex-col gap-2">
      <Heading size="xl" as="h3" responsive>
        Payment Summary
      </Heading>
      <PaymentSummary
        totalListingPrice={totalListingPrice}
        totalPrice={totalPrice}
        appliedCoupon={appliedCoupon}
        couponTotal={couponTotal}
        prepaidDiscount={prepaidDiscount}
        prepaidDiscountPercent={prepaidDiscountPercent}
        codCharges={codCharges}
        appliedCODCharges={appliedCODCharges}
        shippingTotal={shippingTotal}
        usableRewards={usableRewards}
        grandTotal={grandTotal}
        totalAmountSaved={totalAmountSaved}
        isRewardApplied={isRewardApplied}
      />
    </div>
  );
});

const PaymentSummary = React.memo(
  ({
    totalListingPrice,
    totalPrice,
    appliedCoupon,
    couponTotal,
    prepaidDiscount,
    prepaidDiscountPercent,
    codCharges,
    appliedCODCharges,
    shippingTotal,
    usableRewards,
    grandTotal,
    totalAmountSaved,
    isRewardApplied,
  }) => {
    return (
      <div className="flex flex-col gap-1 md:gap-2">
        <SummaryItem
          label="Subtotal"
          value={totalPrice}
          originalValue={totalListingPrice}
        />
        {!!appliedCoupon && !!couponTotal && (
          <SummaryItem
            label={`Discounts (${appliedCoupon?.code})`}
            value={-couponTotal}
            color="text-green-600"
          />
        )}
        {prepaidDiscount > 0 && (
          <SummaryItem
            label={`${prepaidDiscountPercent}% Online Payment Discount`}
            value={-prepaidDiscount}
            color="text-green-600"
          />
        )}
        {!!codCharges && (
          <SummaryItem
            label="COD Charges"
            value={appliedCODCharges ? appliedCODCharges : "Free"}
            originalValue={codCharges}
            color={appliedCODCharges ? "text-black-600" : "text-green-600"}
          />
        )}
        <SummaryItem
          label="Shipping"
          value={shippingTotal ? shippingTotal : "Free"}
          originalValue={shippingTotal < 50 ? 50 : null}
          color={shippingTotal ? "text-black-600" : "text-green-600"}
        />
        {!!usableRewards && isRewardApplied && (
          <SummaryItem
            label="WOW Cash"
            value={-usableRewards}
            color="text-green-600"
          />
        )}
        <div className="h-px bg-black-900" />
        <div className="flex justify-between">
          <div className="flex flex-col gap-0.5">
            <Heading size="xl" as="h3" responsive>
              Total
            </Heading>
            <Text size="xs" as="span" className="text-[#696969]">
              Inclusive of all taxes
            </Text>
          </div>
          <div className="flex flex-col items-end gap-1">
            <Heading size="xl" as="h3" responsive>
              ₹{toDecimal(grandTotal)}
            </Heading>
          </div>
        </div>
      </div>
    );
  },
);

CheckoutSummary.displayName = "CheckoutSummary";
PaymentSummary.displayName = "PaymentSummary";

export default CheckoutSummary;
