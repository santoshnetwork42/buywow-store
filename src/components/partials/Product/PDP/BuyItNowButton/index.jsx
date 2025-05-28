import { showToast } from "@/components/common/ToastComponent";
import { Button } from "@/components/elements";
import { GOKWIK_MID, STORE_PREFIX } from "@/config";
import { getUserAPI } from "@/lib/appSyncAPIs";
import { useCartDispatch } from "@/store/sagas/dispatch/cart.dispatch";
import { useEventsDispatch } from "@/store/sagas/dispatch/events.dispatch";
import { useModalDispatch } from "@/store/sagas/dispatch/modal.dispatch";
import { useGuestCheckout } from "@/utils/context/navbar";
import { GOKWIK_ENABLED } from "@/utils/data/constants";
import { useInventory } from "@/utils/hooks/useInventory";
import { useConfiguration } from "@wow-star/utils-cms";
import { useRouter } from "next/navigation";

import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";

const BuyItNowButton = React.memo(
  ({ product, selectedVariant, hasInventory, className }) => {
    const router = useRouter();
    // const searchParams = useSearchParams();

    const [isBuyItNowClicked, setIsBuyItNowClicked] = useState(false);

    const { addToCart, validateCart, checkoutInitiated } = useCartDispatch();

    const user = useSelector((state) => state.user?.user);
    const customUser = useSelector((state) => state.user?.customUser);
    const appliedCoupon = useSelector((state) => state.cart?.coupon);
    const shoppingCartId = useSelector((state) => state.cart?.cartId);
    const cartId =
      localStorage.getItem(`${STORE_PREFIX}-cartId`) || shoppingCartId;

    const cartList = useSelector((state) => state.cart?.data);

    const { handleCartVisibility, handlePasswordLessModal } =
      useModalDispatch();

    const { handleOutOfStockEvent, handleProceedToCheckoutEvent } =
      useEventsDispatch();
    const gokwikEnabled = useConfiguration(GOKWIK_ENABLED, false);
    const isShoppingCartIdLoading = useSelector(
      (state) => state.cart?.isShoppingCartIdLoading,
    );
    const inventory = useInventory({ validateCart });

    const {
      ready: isInventoryCheckReady,
      success: isInventoryCheckSuccess,
      inventoryMapping,
      outOfStockItems,
    } = inventory;

    const checkoutButtonDisabled = GOKWIK_MID
      ? !isInventoryCheckReady && isShoppingCartIdLoading
      : !isInventoryCheckReady;
    const guestCheckout = useGuestCheckout();

    const validateAndGoToCheckout = useCallback(async () => {
      try {
        // const checkoutABVariant = Cookies.get(VERCEL_CHECKOUT_AB_FLAG);

        if (!isInventoryCheckSuccess) {
          if (!!outOfStockItems?.length) {
            handleOutOfStockEvent(outOfStockItems, inventoryMapping);
            showToast.error("Please remove out of stock product from cart");
          }
          return false;
        }

        // checkoutInitiated(!!searchParams?.get("cart"));
        handleCartVisibility(false);

        if (user?.id) {
          const getUserResponse = await getUserAPI();
          if (!getUserResponse?.isActive) {
            router.push("/404");
            return false;
          }
        }

        const isGKCXEnabled = !!(
          (GOKWIK_MID && cartId && gokwikEnabled)
          // && checkoutABVariant === "gk_checkout"
        );

        if (isGKCXEnabled) {
          try {
            gokwikSdk.initCheckout({
              environment: "sandbox",
              type: "merchantInfo",
              mid: GOKWIK_MID,
              merchantParams: {
                merchantCheckoutId: cartId,
                customerToken: user?.id || "",
              },
            });

            handleProceedToCheckoutEvent("GOKWIK");
            return true;
          } catch (e) {
            await gokwikSdk.close();
            router.push("/checkout");
            return true;
          }
        }
        handleProceedToCheckoutEvent("BUYWOW");
        if (user?.id || guestCheckout || customUser?.phone) {
          router.push("/checkout");
          return true;
        }
        handlePasswordLessModal(true, true, "/checkout", "CHECKOUT");
        return false;
      } catch (e) {
        console.error(e);
        return false;
      } finally {
        setIsBuyItNowClicked(false);
      }
    }, [
      cartId,
      user,
      guestCheckout,
      customUser,
      isInventoryCheckSuccess,
      appliedCoupon,
      cartList,
      outOfStockItems,
      inventoryMapping,
    ]);

    useEffect(() => {
      if (!!cartList?.length && isBuyItNowClicked && !!cartId) {
        if (cartId !== "null") validateAndGoToCheckout();
      }
    }, [cartList, cartId]);

    const addToCartHandler = useCallback(() => {
      if (!product) return;

      addToCart({
        ...product,
        qty: product.minimumOrderQuantity || 1,
        variantId: selectedVariant?.id,
        section: {
          id: "pdp_page",
          name: "pdp_page",
          tabValue: "pdp_page",
        },
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product, selectedVariant]);

    return (
      <Button
        className={twMerge(
          "h-fit w-full border-2 border-yellow-900 !bg-white-a700_01 !px-0 py-3 !text-xl font-medium !leading-tight text-yellow-900 opacity-100 transition-none md:py-4",
          !hasInventory ? "border-none !bg-gray-400 !text-white-a700_01" : "",
          className,
        )}
        variant="primary"
        size="large"
        onClick={() => {
          if (!isBuyItNowClicked) {
            addToCartHandler();
            setIsBuyItNowClicked(true);
          }
        }}
        disabled={checkoutButtonDisabled || !hasInventory}
      >
        Buy It Now
      </Button>
    );
  },
);

BuyItNowButton.displayName = "BuyItNowButton";

export default BuyItNowButton;
