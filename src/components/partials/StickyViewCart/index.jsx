"use client";

import { Button, Heading, Text } from "@/components/elements";
import { useModalDispatch } from "@/store/sagas/dispatch/modal.dispatch";
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
      <Text as="p" size="sm" className="text-black-900" responsive>
        Including {prepaidDiscountPercent}% prepaid discount
      </Text>
    </div>
  ),
);

CartSummary.displayName = "CartSummary";

const StickyViewCart = () => {
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

  if (!cartList.length || !isAllowed) return null;

  return (
    <div className="fixed bottom-0 left-1/2 z-20 flex w-full -translate-x-1/2 items-center justify-between bg-white-a700 px-4 py-2 shadow-[0_0_10px_0_rgba(0,0,0,0.12)] sm:bottom-[35px] sm:max-w-[500px] sm:rounded-lg">
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
  );
};

export default React.memo(StickyViewCart);
