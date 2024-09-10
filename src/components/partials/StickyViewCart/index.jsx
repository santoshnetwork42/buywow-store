"use client";

import { Button, Heading, Text } from "@/components/elements";
import { useModalDispatch } from "@/store/sagas/dispatch/modal.dispatch";
import { useIsInteractive } from "@/utils/context/navbar";
import { STICKY_VIEW_CART_TO_SHOW } from "@/utils/data/constants";
import { toDecimal } from "@/utils/helpers";
import { useCartTotal } from "@wow-star/utils";
import { usePathname } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";

const CartSummary = React.memo(
  ({ totalItems, grandTotal, prepaidDiscountPercent, prepaidDiscount }) => (
    <div className="flex flex-col gap-1">
      <Heading size="lg" as="h3" className="w-fit font-medium" responsive>
        {totalItems > 1 ? `${totalItems} Items` : "1 Item"} | ₹{" "}
        {toDecimal(grandTotal)}
      </Heading>
      {!!prepaidDiscountPercent && (
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

  const cartList = useSelector((state) => state.cart?.data || []);
  const isRewardApplied = useSelector(
    (state) => state.cart?.isRewardApplied || false,
  );
  const { handleCartVisibility } = useModalDispatch();
  const pathname = usePathname();

  const isAllowed = useMemo(
    () =>
      STICKY_VIEW_CART_TO_SHOW.some(
        (allowedPath) =>
          pathname === allowedPath ||
          (allowedPath !== "/" && pathname.startsWith(`${allowedPath}/`)),
      ),
    [pathname],
  );

  const { grandTotal, totalItems, prepaidDiscountPercent, prepaidDiscount } =
    useCartTotal({
      paymentType: "PREPAID",
      isRewardApplied,
    });

  const openCart = useCallback(() => {
    handleCartVisibility(true);
  }, [handleCartVisibility]);

  if (!cartList.length || !isAllowed || !isInteractive) return null;

  const getCollectionWiseNudgeMsg = () => {
    if (pathname === "/collections/all" || pathname === "/") {
      return "Add more items to unlock 'Buy 1 Get 1 Free Offer'";
    }
    return "";
  };

  let totalQty = (cartList || [])?.reduce((acc, i) => acc + i.qty, 0);
  let isNudge = getCollectionWiseNudgeMsg();

  return (
    <>
      <div className="bg-white fixed bottom-0 left-1/2 z-20 flex w-full -translate-x-1/2 flex-col justify-between bg-white-a700 bg-opacity-95 shadow-[0_0_10px_0_rgba(0,0,0,0.12)] backdrop-blur-sm sm:bottom-[35px] sm:max-w-[500px] sm:rounded-lg">
        {!!isNudge && totalQty > 0 && (
          <div className="rounded-t-md bg-[#6E809A] py-1 text-center">
            <p className="text-md font-normal text-white-a700">
              {totalQty < 2
                ? `Add more items to unlock 'Buy 1 Get 1 Free Offer'`
                : `Congrats, your Buy 1 Get 1 offer has been availed!`}
            </p>
          </div>
        )}
        <div className="flex flex-grow justify-between px-5 py-2">
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
