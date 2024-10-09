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

const StickyViewCart = () => {
  const isInteractive = useIsInteractive();
  const nudgeFeat = useNudgeFeat();
  // console.log("nudgeFeat :>> ", nudgeFeat);
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
    // if (pathname === "/collections/all" || pathname === "/") {
    //   if (appliedCoupon?.code === "WOW") {
    //     return "Congrats, your Buy 1 Get 1 offer has been availed!";
    //   } else {
    //     return "Add more items to unlock 'Buy 1 Get 1 Free'";
    //   }
    // } else
    if (pathname === "/collections/buy-8-1000") {
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
        <div className="relative flex w-full px-4">
          <div className="flex w-full justify-between border-gray-500">
            <div
              style={{
                width: `${(100 / maxProgressQuantity) * currQuantity}%`,
              }}
              className="bg-gray-400"
            >
              {currQuantity}
            </div>
            <div>{maxProgressQuantity}</div>
          </div>
          {nudgeFeat && (
            <div className="absolute left-0 flex h-4 w-full px-4">
              {nudgeFeat?.map((item, index) => {
                return (
                  <div
                    key={index}
                    style={{ width: `${100 / nudgeFeat.length}%` }}
                    className={`flex justify-center`}
                  >
                    {JSON.stringify(
                      item.buyXQuantity + (item.getYQuantity || 0) <=
                        currQuantity,
                    )}
                  </div>
                );
              })}
            </div>
          )}
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
