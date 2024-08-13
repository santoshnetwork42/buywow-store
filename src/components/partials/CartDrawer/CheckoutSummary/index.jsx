"use client";

import React, { useCallback } from "react";
import { useGuestCheckout, useNavBarState } from "@/utils/context/navbar";
import { useCartTotal, useConfiguration } from "@wow-star/utils";
import { GOKWIK_ENABLED, PREPAID_ENABLED } from "@/utils/data/constants";
import { useRouter } from "next/navigation";
import { GOKWIK_MID, STORE_PREFIX } from "@/config";
import { useSelector } from "react-redux";
import { Button, Heading, Text } from "@/components/elements";
import { toDecimal } from "@/utils/helpers";
import { showToast } from "@/components/common/ToastComponent";
import { useModalDispatch } from "@/store/sagas/dispatch/modal.dispatch";
import { useEventsDispatch } from "@/store/sagas/dispatch/events.dispatch";
import SummaryItem from "@/components/common/CheckoutSummaryItem";

const CheckoutSummary = React.memo(({ inventory }) => {
  const router = useRouter();
  const { isRewardApplied } = useNavBarState();
  const { handleCartVisibility } = useModalDispatch();
  const { handleOutOfStock, handleProceedToCheckout } = useEventsDispatch();
  const prepaidEnabled = useConfiguration(PREPAID_ENABLED, true);
  const gokwikEnabled = useConfiguration(GOKWIK_ENABLED, false);

  const { appliedCoupon, shoppingCartId, user, customUser, cartList } =
    useSelector((state) => ({
      appliedCoupon: state?.cart?.coupon,
      shoppingCartId: state?.cart?.cartId,
      user: state?.user?.user,
      customUser: state?.customUser,
      cartList: state?.cart?.data,
    }));

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

  const guestCheckout = useGuestCheckout();

  const {
    ready: isInventoryCheckReady,
    success: isInventoryCheckSuccess,
    inventoryMapping,
    outOfStockItems,
  } = inventory || {};

  const validateAndGoToCheckout = useCallback(async () => {
    if (!isInventoryCheckSuccess) {
      handleOutOfStock(outOfStockItems, inventoryMapping);
      showToast.error("Please remove out of stock product from cart");
      return false;
    }

    handleCartVisibility(false);

    const lscart = localStorage.getItem(`${STORE_PREFIX}-cartId`) || "";
    const cartId = lscart || shoppingCartId;

    const isGKCXEnabled = !!(GOKWIK_MID && cartId && gokwikEnabled);

    if (isGKCXEnabled) {
      try {
        // gokwikSdk.initCheckout({
        //   environment: "sandbox",
        //   type: "merchantInfo",
        //   mid: GOKWIK_MID,
        //   merchantParams: {
        //     merchantCheckoutId: cartId,
        //     customerToken: user?.id || "",
        //   },
        // });

        handleProceedToCheckout("GOKWIK");
        return Promise.resolve(true);
      } catch (e) {
        // await gokwikSdk.close();
        // errorHandler(e);
        router.push("/checkout");
      }
    }

    handleProceedToCheckout("BUYWOW");
    if (user || guestCheckout || customUser) {
      router.push("/checkout");
      return Promise.resolve(true);
    }

    openLogin(true, true);
    return Promise.resolve(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    user,
    guestCheckout,
    customUser,
    isInventoryCheckSuccess,
    appliedCoupon,
    cartList,
    outOfStockItems,
    inventoryMapping,
  ]);

  const checkoutButtonDisabled = GOKWIK_MID
    ? !isInventoryCheckReady && isShoppingCartIdLoading
    : !isInventoryCheckReady;

  return (
    <div className="flex flex-col gap-2">
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
      <div className="mt-1 flex flex-col items-center gap-2.5">
        <Button
          className="w-full"
          variant="primary"
          size="large"
          onClick={validateAndGoToCheckout}
          disabled={checkoutButtonDisabled}
        >
          <Heading size="2xl" as="h2" className="text-white-a700_01">
            Checkout
          </Heading>
        </Button>
        <Text size="base" as="p" className="text-sm" responsive>
          Estimated delivery within 3-5 days
        </Text>
      </div>
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
          <div className="flex flex-col gap-1">
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
            {!!totalAmountSaved && (
              <Text className="text-green-600" size="sm">
                You Saved ₹{toDecimal(totalAmountSaved)}
              </Text>
            )}
          </div>
        </div>
      </div>
    );
  },
);

CheckoutSummary.displayName = "CheckoutSummary";
PaymentSummary.displayName = "PaymentSummary";

export default CheckoutSummary;
