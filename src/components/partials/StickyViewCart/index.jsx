"use client";

import { Button, Heading, Text } from "@/components/elements";
import { useModalDispatch } from "@/store/sagas/dispatch/modal.dispatch";
import { useIsInteractive, useNudgeFeat } from "@/utils/context/navbar";
import { STICKY_VIEW_CART_TO_SHOW } from "@/utils/data/constants";
import { calculateCollectionNudgeMessage, toDecimal } from "@/utils/helpers";
import { useCartItems, useCartTotal } from "@wow-star/utils";
import { usePathname } from "next/navigation";
import React, { useCallback, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";

const CartSummary = React.memo(
  ({ totalItems, grandTotal, prepaidDiscountPercent, prepaidDiscount }) => (
    <div className="flex flex-col gap-1">
      <Heading size="lg" as="h3" className="text-base" responsive>
        {totalItems > 1 ? `${totalItems} Items` : "1 Item"} | ₹{" "}
        {toDecimal(grandTotal)}
      </Heading>
      {prepaidDiscountPercent > 0 && (
        <Text as="p" size="sm" className="text-black-900" responsive>
          Including {prepaidDiscountPercent}% prepaid discount
        </Text>
      )}
    </div>
  ),
);

CartSummary.displayName = "CartSummary";

const IntegratedProgressStepper = ({
  steps,
  appliedCoupon,
  currQuantity,
  maxQuantity,
}) => {
  // Ensure currQuantity doesn't exceed maxQuantity
  const safeCurrentQuantity = Math.min(currQuantity, maxQuantity);

  // Calculate progress percentage
  const progressPercentage = (safeCurrentQuantity / maxQuantity) * 100;

  // Find the index of the applied coupon
  const appliedCouponIndex = steps
    ? steps.findIndex((step) => step.code === appliedCoupon?.code)
    : -1;

  // Determine the current step based on currQuantity
  const currentStepIndex = steps?.findIndex(
    (step) => safeCurrentQuantity <= step.quantity,
  );

  return (
    <div className="w-full px-4 py-10">
      <div className="relative">
        {/* Progress Bar */}
        <div className="h-2 rounded-full bg-gray-200">
          <div
            style={{ width: `${progressPercentage}%` }}
            className="h-full rounded-full bg-green-400 transition-all duration-300 ease-in-out"
          ></div>
        </div>

        {/* Current and Max Quantity */}
        {/* <div className="absolute -top-8 left-0 mt-2 flex w-full justify-between text-xs text-gray-600">
          <span>{safeCurrentQuantity}</span>
          <span>{maxQuantity}</span>
        </div> */}

        {/* Steps */}
        <div className="absolute left-0 top-0 -mt-4 flex w-full justify-between">
          {steps?.map((step, index) => {
            const stepPosition = (step.quantity / maxQuantity) * 100;
            const isCompleted = index < currentStepIndex;
            const isCurrent = index === currentStepIndex;
            const isMarked = index <= appliedCouponIndex;

            return (
              <div
                key={step.code}
                className="absolute left-3 top-2 flex justify-end"
                style={{
                  width: `${(100 / maxQuantity) * (step.buyXQuantity + (step.getYQuantity || 0))}%`,
                }}
              >
                <div className="flex flex-col items-center justify-center gap-1">
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-full bg-white-a700_01 transition-all duration-300 ease-in-out ${
                      isCompleted
                        ? "border-green-500 bg-green-500 shadow-lg shadow-green-200"
                        : isCurrent
                          ? "shadow-lg"
                          : "bg-white"
                    } ${isMarked ? "ring-2 ring-green-300 ring-opacity-50" : "border-2 border-green-200"} `}
                  >
                    {isCompleted && (
                      <svg
                        className="text-white h-4 w-4 transition-opacity duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                  <div className="transition-all duration-300 ease-in-out">
                    <span
                      className={`text-xs font-medium ${isMarked ? "text-green-600" : "text-gray-500"} transition-all duration-300 ease-in-out`}
                    >
                      {step.name || step.code}
                    </span>
                  </div>
                </div>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 transform text-center">
                  <span className="text-xs font-medium text-gray-500 transition-all duration-300 ease-in-out">
                    {step.quantity}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const StickyViewCart = () => {
  const isInteractive = useIsInteractive();
  const nudgeFeat = useNudgeFeat();
  console.log("nudgeFeat :>> ", nudgeFeat);
  const pathname = usePathname();

  const { handleCartVisibility } = useModalDispatch();
  const [currQuantity, setCurrQuantity] = React.useState(0);
  const [maxProgressQuantity, setMaxProgressQuantity] = React.useState(0);

  const isRewardApplied = useSelector(
    (state) => state.cart?.isRewardApplied || false,
  );
  const appliedCoupon = useSelector((state) => state.cart?.coupon);

  const cartItems = useCartItems({
    showLTOProducts: false,
    showNonApplicableFreeProducts: true,
  });

  const isAllowed = useMemo(
    () =>
      STICKY_VIEW_CART_TO_SHOW.some(
        (allowedPath) =>
          pathname === allowedPath ||
          (allowedPath !== "/" && pathname.startsWith(`${allowedPath}/`)),
      ),
    [pathname],
  );

  const abc = () => {
    const { currQuantity = 0, maxProgressQuantity = 0 } =
      calculateCollectionNudgeMessage({
        pathname,
        cartItems,
        nudgeFeat,
      }) || {};
    setMaxProgressQuantity(maxProgressQuantity);
    setCurrQuantity(currQuantity);
  };

  useEffect(() => {
    abc();
  }, [nudgeFeat, cartItems, pathname]);

  const { grandTotal, totalItems, prepaidDiscountPercent, prepaidDiscount } =
    useCartTotal({
      paymentType: "PREPAID",
      isRewardApplied,
    });

  const openCart = useCallback(() => {
    handleCartVisibility(true);
  }, [handleCartVisibility]);

  if (!cartItems.length || !isAllowed || !isInteractive) return null;

  const getCollectionWiseNudgeMsg = () => {
    if (pathname === "/collections/all" || pathname === "/") {
      if (appliedCoupon?.code === "WOW") {
        return "Congrats, your Buy 1 Get 1 offer has been availed!";
      } else {
        return "Add more items to unlock 'Buy 1 Get 1 Free'";
      }
    } else if (pathname === "/collections/buy-8-1000") {
      if (appliedCoupon?.code === "BUY8") {
        return "Congrats, your Buy 8 @ ₹1000 offer has been availed!";
      }
      return "Add more items to unlock 'Buy 8 @ ₹1000 Offer'";
    } else if (pathname === "/collections/buy-8-1199") {
      if (appliedCoupon?.code === "BUNDLE8") {
        return "Congrats, your Buy 8 @ ₹1199 offer has been availed!";
      }
      return "Add more items to unlock 'Buy 8 @ ₹1199 Offer'";
    }
    return "";
  };

  // let isNudge = abc();

  return (
    <>
      <div className="bg-white fixed bottom-0 left-1/2 z-20 flex w-full -translate-x-1/2 flex-col justify-between bg-white-a700 bg-opacity-95 shadow-[0_0_10px_0_rgba(0,0,0,0.12)] backdrop-blur-sm sm:bottom-[35px] sm:max-w-[500px] sm:rounded-lg">
        {/* {!!isNudge && !!cartItems.length && (
          <div className="bg-blue_gray-400_01 py-1.5 text-center sm:rounded-t-md">
            <Text
              as="p"
              size="base"
              className="text-sm text-white-a700"
              responsive
            >
              {isNudge}
            </Text>
          </div>
        )} */}

        <div className="mx-auto w-full max-w-4xl">
          <IntegratedProgressStepper
            steps={nudgeFeat}
            appliedCoupon={appliedCoupon}
            currQuantity={currQuantity}
            maxQuantity={maxProgressQuantity}
          />
        </div>

        <div className="flex flex-grow items-center justify-between px-5 py-2">
          <CartSummary
            totalItems={totalItems}
            grandTotal={grandTotal}
            prepaidDiscountPercent={prepaidDiscountPercent}
            prepaidDiscount={prepaidDiscount}
          />
          <Button
            variant="primary"
            size="none"
            className="rounded-md px-6 py-3 text-white-a700 transition-colors duration-300"
            onClick={openCart}
          >
            GO TO CART
          </Button>
        </div>
      </div>
    </>
  );
};

export default React.memo(StickyViewCart);
