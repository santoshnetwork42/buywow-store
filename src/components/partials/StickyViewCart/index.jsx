"use client";
import { Button, Heading, Text } from "@/components/elements";
import { useModalDispatch } from "@/store/sagas/dispatch/modal.dispatch";
import { STICKY_VIEW_CART_TO_SHOW } from "@/utils/data/constants";
import { toDecimal } from "@/utils/helpers";
import { useCartTotal } from "@wow-star/utils";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

const StickyViewCart = () => {
  const cartList = useSelector((state) => state?.cart?.data || []);
  const isRewardApplied = useSelector((state) => state.cart?.isRewardApplied);
  const { handleCartVisibility } = useModalDispatch();
  const pathname = usePathname();

  const isAllowed = STICKY_VIEW_CART_TO_SHOW.some(
    (allowedPath) =>
      pathname === allowedPath || // Exact match
      (allowedPath !== "/" && pathname.startsWith(allowedPath + "/")), // Starts with allowedPath followed by "/"
  );

  const { totalPrice, totalItems } = useCartTotal({
    paymentType: "PREPAID",
    isRewardApplied,
  });

  if (!cartList.length || !isAllowed) return <></>;

  return (
    <div className="fixed bottom-0 left-1/2 z-20 flex w-full -translate-x-1/2 transform items-center justify-between rounded-lg bg-white-a700 px-4 py-2 shadow-md sm:bottom-[35px] sm:w-[100vw] sm:max-w-[500px]">
      <div className="flex flex-col gap-1">
        <Text as="p" size="md" className="text-black-900" responsive>
          {totalItems > 1 ? `${totalItems} Items` : `1 Item`}
        </Text>
        <Heading
          size="xl"
          as="h3"
          className="m-auto w-fit font-medium"
          responsive
        >
          ₹ {toDecimal(totalPrice)}
        </Heading>
      </div>

      <Button
        variant="primary"
        size="none"
        className="rounded-md px-6 py-3 text-white-a700 transition-colors duration-300"
        onClick={() => handleCartVisibility(true)}
      >
        GO TO CART
      </Button>
    </div>
  );
};

StickyViewCart.displayName = "StickyViewCart";

export default StickyViewCart;
