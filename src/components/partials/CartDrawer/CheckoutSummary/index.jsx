"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useGuestCheckout, useNavBarState } from "@/utils/context/navbar";
import { useCartTotal, useConfiguration } from "@wow-star/utils";
import { GOKWIK_ENABLED, PREPAID_ENABLED } from "@/utils/data/constants";
import { useRouter } from "next/navigation";
import { GOKWIK_MID, STORE_PREFIX } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { Button, Heading, Text } from "@/components/elements";
import PasswordLess from "@/components/common/Passwordless";
import { toDecimal } from "@/utils/helpers";
import { showToast } from "@/components/common/ToastComponent";
import { modalSagaActions } from "@/store/sagas/sagaActions/modal.actions";
import { eventsSagaActions } from "@/store/sagas/sagaActions/events.actions";

const CheckoutSummary = ({ inventory }) => {
  const router = useRouter();
  const { isRewardApplied } = useNavBarState();
  const prepaidEnabled = useConfiguration(PREPAID_ENABLED, true);
  const gokwikEnabled = useConfiguration(GOKWIK_ENABLED, false);

  const appliedCoupon = useSelector((state) => state?.cart?.coupon);
  const shoppingCartId = useSelector((state) => state?.cart?.cartId);
  const user = useSelector((state) => state?.user?.user);
  const customUser = useSelector((state) => state?.customUser);
  const cartList = useSelector((state) => state?.cart?.data);

  const dispatch = useDispatch();

  const {
    totalItems,
    totalListingPrice,
    totalPrice,
    shippingTotal,
    couponTotal,
    cartGrandTotal,
    prepaidDiscount,
    prepaidDiscountPercent,
    totalAmountSaved,
    codCharges,
    appliedCODCharges,
    usableRewards,
    grandTotal,
  } = useCartTotal({
    isRewardApplied: isRewardApplied,
    paymentType: prepaidEnabled ? "PREPAID" : "COD",
  });

  const guestCheckout = useGuestCheckout();

  const {
    ready: isInventoryCheckReady,
    success: isInventoryCheckSuccess,
    inventoryMapping,
    outOfStockItems,
  } = inventory || {};

  const handleCartVisibility = (isCartOpen) => {
    dispatch({
      type: modalSagaActions.SET_CART_MODAL,
      payload: {
        isCartOpen,
      },
    });
  };

  const handleOutOfStock = () => {
    dispatch({
      type: eventsSagaActions.OUT_OF_STOCK,
      payload: { outOfStockItems, inventoryMapping },
    });
  };

  const onProceedToCheckout = (source) => {
    dispatch({
      type: eventsSagaActions.PROCEED_TO_CHECKOUT,
      payload: {
        source: source || "BUYWOW",
      },
    });
  };

  const validateAndGoToCheckout = useCallback(async () => {
    handleCartVisibility(false);

    if (!isInventoryCheckSuccess) {
      handleOutOfStock();
      showToast.error("Please remove out of stock product from cart");
      return false;
    }

    const lscart = localStorage.getItem(`${STORE_PREFIX}-cartId`);
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

        onProceedToCheckout("GOKWIK");
        return Promise.resolve(true);
      } catch (e) {
        // await gokwikSdk.close();
        // errorHandler(e);
        router.push("/checkout");
      }
    }

    onProceedToCheckout("BUYWOW");
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
      <div className="flex flex-col gap-1 md:gap-2">
        <div className="flex items-center justify-between">
          <Text size="lg" as="p" className="capitalize" responsive>
            Subtotal
          </Text>
          <div className="flex items-center gap-1.5">
            {!!(totalPrice < totalListingPrice) && (
              <Text
                size="sm"
                as="p"
                className="text-[#AAAAAA] line-through"
                responsive
              >
                ₹{toDecimal(totalListingPrice)}
              </Text>
            )}
            <Text size="lg" as="p" className="" responsive>
              ₹{totalPrice}
            </Text>
          </div>
        </div>

        {!!appliedCoupon && !!couponTotal && (
          <div className="flex items-center justify-between">
            <Text size="lg" as="p" className="capitalize" responsive>
              Discounts
              <span className="font-semibold"> ({appliedCoupon?.code})</span>
            </Text>
            <Text size="lg" as="p" className="text-green-600" responsive>
              -{`₹${toDecimal(couponTotal)}`}
            </Text>
          </div>
        )}

        {!!(prepaidDiscount > 0) && (
          <div className="flex items-center justify-between">
            <Text size="lg" as="p" className="capitalize" responsive>
              {prepaidDiscountPercent}% Online Payment Discount
            </Text>
            <Text size="lg" as="p" className="text-green-600" responsive>
              -₹{toDecimal(prepaidDiscount)}
            </Text>
          </div>
        )}

        {!!codCharges && (
          <div className="flex items-center justify-between">
            <Text size="lg" as="p" className="capitalize" responsive>
              COD Charges
            </Text>
            <div className="flex items-center gap-1.5">
              {!appliedCODCharges && (
                <Text
                  size="sm"
                  as="p"
                  className="text-[#AAAAAA] line-through"
                  responsive
                >
                  ₹{toDecimal(codCharges)}
                </Text>
              )}
              <Text
                size="lg"
                as="p"
                className={`${appliedCODCharges ? "text-black-600" : "text-green-600"}`}
                responsive
              >
                {!!appliedCODCharges
                  ? `₹${toDecimal(appliedCODCharges)}`
                  : "Free"}
              </Text>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <Text size="lg" as="p" className="capitalize" responsive>
            Shipping
          </Text>
          <div className="flex items-center gap-1.5">
            {!(shippingTotal < 50) && (
              <Text
                size="sm"
                as="p"
                className="text-[#AAAAAA] line-through"
                responsive
              >
                ₹{toDecimal(50)}
              </Text>
            )}
            <Text
              size="lg"
              as="p"
              className={`${shippingTotal ? "text-black-600" : "text-green-600"}`}
              responsive
            >
              {!!shippingTotal ? `₹${toDecimal(shippingTotal)}` : "Free"}
            </Text>
          </div>
        </div>

        {!!usableRewards && isRewardApplied && (
          <div className="flex items-center justify-between">
            <Text size="lg" as="p" className="capitalize" responsive>
              WOW Cash
            </Text>
            <Text size="lg" as="p" className="text-green-600" responsive>
              -₹{toDecimal(usableRewards)}
            </Text>
          </div>
        )}
      </div>
      <div className="h-px bg-black-900" />
      <div className="flex flex-col">
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
        <PasswordLess />
        <Text size="base" as="p" className="text-sm" responsive>
          Estimated delivery within 3-5 days
        </Text>
      </div>
    </div>
  );
};

export default CheckoutSummary;
