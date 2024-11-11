import { Heading } from "@/components/elements";
import { toDecimal } from "@/utils/helpers";
import React from "react";
import PaymentMethod from "@/components/partials/Checkout/PaymentMethodsSection/PaymentMethod/paymentMethod";

const PaymentMethodsSection = React.memo(
  ({
    prepaidEnabled,
    codEnabled,
    ppcodEnabled,
    ppcodCouponEnabled,
    prepaidDiscount,
    prepaidDiscountPercent,
    maxPrepaidDiscount,
    onlineDisabled,
    appliedCoupon,
    prepaidGrandTotal,
    selectedPaymentMethod,
    handleMethodChange,
    codCharges,
    codCouponDisabled,
    isMaxCODDisabled,
    isMinCODDisabled,
    ppcodAmount,
    ppcodAmountToTake,
    codGrandTotal,
    maxCOD,
    minCOD,
  }) => (
    <div className="flex flex-col gap-2.5">
      <Heading size="2xl" as="h3" className="font-medium" responsive>
        Payment Methods
      </Heading>
      <div className="flex w-full flex-col gap-2 md:gap-2.5">
        {prepaidEnabled && (
          <PaymentMethod
            label="Pay Online"
            id="PREPAID"
            tag={
              !!prepaidDiscount &&
              `EXTRA ${prepaidDiscountPercent}% OFF ${
                !!maxPrepaidDiscount && `UP TO ₹${maxPrepaidDiscount}`
              }`
            }
            tagVariant="success"
            description={
              onlineDisabled
                ? `Online payment disabled for you coupon "${appliedCoupon?.code}"`
                : "Pay using credit/debit cards, net-banking, UPI, or digital wallets."
            }
            total={prepaidGrandTotal}
            selectedPaymentMethod={selectedPaymentMethod}
            onMethodChange={handleMethodChange}
            disabled={onlineDisabled}
          />
        )}
        {(ppcodEnabled || codEnabled) && (
          <PaymentMethod
            label="Cash On Delivery"
            id="COD"
            tag={!!codCharges && `₹${toDecimal(codCharges)} EXTRA`}
            tagVariant="danger"
            description={
              codCouponDisabled
                ? `COD payment disabled for your coupon "${appliedCoupon?.code}"`
                : isMinCODDisabled
                  ? `COD payment is not allowed for orders below ₹${minCOD}.`
                  : isMaxCODDisabled
                    ? `COD payment is not allowed for orders above ₹${maxCOD}.`
                    : (ppcodEnabled && ppcodAmount) || ppcodCouponEnabled
                      ? `Pay ₹${toDecimal(ppcodAmountToTake)} now (non-refundable). Rest ₹${toDecimal(
                          codGrandTotal - ppcodAmountToTake,
                        )} on delivery.`
                      : "Pay using Cash on Delivery."
            }
            total={codGrandTotal}
            selectedPaymentMethod={selectedPaymentMethod}
            onMethodChange={handleMethodChange}
            disabled={codCouponDisabled || isMaxCODDisabled || isMinCODDisabled}
          />
        )}
      </div>
    </div>
  ),
);

PaymentMethodsSection.displayName = "PaymentMethodsSection";

export default PaymentMethodsSection;
