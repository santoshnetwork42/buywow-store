"use client";

import {
  useCartItems,
  useCartTotal,
  useConfiguration,
  useInventory,
  useNavbar,
} from "@wow-star/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import { showToast } from "@/components/common/ToastComponent";
import { Text } from "@/components/elements";
import Drawer from "@/components/features/Drawer";
import CartHeader from "@/components/partials/CartDrawer/CartHeader";

import { GOKWIK_MID, STORE_PREFIX } from "@/config";
import { getUserAPI } from "@/lib/appSyncAPIs";
import { useCartDispatch } from "@/store/sagas/dispatch/cart.dispatch";
import { useEventsDispatch } from "@/store/sagas/dispatch/events.dispatch";
import { useModalDispatch } from "@/store/sagas/dispatch/modal.dispatch";
import { useGuestCheckout } from "@/utils/context/navbar";
import {
  GOKWIK_ENABLED,
  PREPAID_ENABLED,
  RESTRICT_SEARCH_AND_CART_TO_SHOW,
} from "@/utils/data/constants";
import dynamic from "next/dynamic";

const EmptyCart = dynamic(
  () => import("@/components/partials/CartDrawer/EmptyCart"),
);

const LoyaltyCash = dynamic(
  () => import("@/components/partials/CartDrawer/LoyaltyCash"),
);

const Cashback = dynamic(
  () => import("@/components/partials/CartDrawer/Cashback"),
);

const ShippingProgress = dynamic(
  () => import("@/components/partials/Others/ShippingProgress"),
);

const MainCartSection = dynamic(
  () => import("@/components/partials/CartDrawer/MainCartSection"),
);

const CheckoutSummary = dynamic(
  () => import("@/components/partials/CartDrawer/CheckoutSummary"),
);

const CheckoutButton = dynamic(
  () => import("@/components/partials/CartDrawer/CheckoutButton"),
);

const CouponsAndOffers = dynamic(
  () =>
    import("@/components/partials/CartDrawer/MainCartSection/CouponsAndOffers"),
);

const CartDrawer = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { ltoProducts } = useNavbar();

  const appliedCoupon = useSelector((state) => state.cart?.coupon);
  const shoppingCartId = useSelector((state) => state.cart?.cartId);
  const isShoppingCartIdLoading = useSelector(
    (state) => state.cart?.isShoppingCartIdLoading,
  );
  const user = useSelector((state) => state.user?.user);
  const customUser = useSelector((state) => state.user?.customUser);
  const cartList = useSelector((state) => state.cart?.data);
  const isCartOpen = useSelector(
    (state) => state.modal?.modal?.cart?.isCartOpen,
  );
  const isRewardApplied = useSelector((state) => state.cart?.isRewardApplied);

  const { validateCart, fetchAndAddProductsFromEncodedCart, applyRewardPoint } =
    useCartDispatch();
  const { handleCartVisibility, handlePasswordLessModal } = useModalDispatch();
  const { handleOutOfStock, handleProceedToCheckout, viewCart } =
    useEventsDispatch();

  const [delayedIsOpen, setDelayedIsOpen] = useState(false);
  const [checkoutSectionHeight, setCheckoutSectionHeight] = useState(0);
  const [isCouponsSidebarOpen, setIsCouponsSidebarOpen] = useState(false);
  const fixedCheckoutRef = useRef(null);

  const inventory = useInventory({ validateCart });
  const guestCheckout = useGuestCheckout();
  const prepaidEnabled = useConfiguration(PREPAID_ENABLED, true);
  const gokwikEnabled = useConfiguration(GOKWIK_ENABLED, false);

  const {
    grandTotal,
    usableRewards,
    totalRewardPointsOfUser,
    prepaidCashbackRewardsOnOrder,
    amountNeededToAvailPrepaidCashback,
    totalAmountForShippingCharge,
    targetAmountForFreeShipping,
    totalAmountSaved,
    showLoyalty,
    totalItems = 0,
  } = useCartTotal({
    paymentType: prepaidEnabled ? "PREPAID" : "COD",
    isRewardApplied,
  });

  const {
    ready: isInventoryCheckReady,
    success: isInventoryCheckSuccess,
    inventoryMapping,
    outOfStockItems,
  } = inventory;

  const cartItems = useCartItems({
    showLTOProducts: true,
    showNonApplicableFreeProducts: true,
  });

  const amountNeededToAvailCashback =
    amountNeededToAvailPrepaidCashback?.isEnabled
      ? amountNeededToAvailPrepaidCashback?.amount - grandTotal
      : 0;

  const validateAndGoToCheckout = useCallback(async () => {
    if (!isInventoryCheckSuccess) {
      handleOutOfStock(outOfStockItems, inventoryMapping);
      showToast.error("Please remove out of stock product from cart");
      return false;
    }

    handleCartVisibility(false);

    if (user?.id) {
      const getUserResponse = await getUserAPI();
      if (!getUserResponse?.isActive) {
        router.push("/404");
        return false;
      }
    }

    const cartId =
      localStorage.getItem(`${STORE_PREFIX}-cartId`) || shoppingCartId;
    const isGKCXEnabled = !!(GOKWIK_MID && cartId && gokwikEnabled);

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

        handleProceedToCheckout("GOKWIK");
        return true;
      } catch (e) {
        await gokwikSdk.close();
        router.push("/checkout");
      }
    }

    handleProceedToCheckout("BUYWOW");
    if (user?.id || guestCheckout || customUser?.phone) {
      router.push("/checkout");
      return true;
    }

    handlePasswordLessModal(true, true, "/checkout");
    return false;
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

  const handleCartClose = useCallback(() => {
    handleCartVisibility(false);
    if (typeof window !== "undefined") window.history.back();
  }, [handleCartVisibility]);

  useEffect(() => {
    const handlePopState = () => {
      if (isCartOpen) {
        handleCartVisibility(false);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("popstate", handlePopState);

      // Push a new state when the cart opens
      if (isCartOpen) {
        window.history.pushState({ cart: "open" }, "");
      }
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("popstate", handlePopState);
      }
    };
  }, [isCartOpen, handleCartVisibility]);

  useEffect(() => {
    if (isCartOpen) viewCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCartOpen]);

  useEffect(() => {
    handleCartVisibility(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    const forceOpenCart = searchParams?.get("cart") === "1";
    const _cx = searchParams?.get("_cx");

    const shouldForceOpenCart =
      forceOpenCart &&
      !isCartOpen &&
      !RESTRICT_SEARCH_AND_CART_TO_SHOW.some(
        (allowedPath) =>
          allowedPath === pathname ||
          (allowedPath !== "/" && pathname.startsWith(`${allowedPath}/`)),
      );
    handleCartVisibility(shouldForceOpenCart);

    if (_cx) fetchAndAddProductsFromEncodedCart(_cx);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    if (isCartOpen) {
      const timer = setTimeout(() => setDelayedIsOpen(true), 50);
      return () => clearTimeout(timer);
    } else {
      setIsCouponsSidebarOpen(false);
      setDelayedIsOpen(false);
    }
  }, [isCartOpen]);

  useEffect(() => {
    const checkoutElement = fixedCheckoutRef.current;
    if (checkoutElement) {
      setCheckoutSectionHeight(checkoutElement.offsetHeight);
    }
  }, [appliedCoupon, isCartOpen]);

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
    }
    return "";
  };

  let isNudge = getCollectionWiseNudgeMsg();

  return (
    <Drawer
      isOpen={isCartOpen}
      width="500px"
      position="right"
      onClose={handleCartClose}
    >
      <div
        className="relative flex flex-1 flex-col gap-3 pt-4"
        style={{ paddingBottom: `${checkoutSectionHeight}px` }}
      >
        <CartHeader
          text="my Cart"
          totalItems={totalItems}
          cartClose={handleCartClose}
          className="mx-3 md:mx-4"
        />
        {!!isNudge && !!cartItems.length && (
          <div className="bg-blue_gray-400_01 py-1.5 text-center md:py-2">
            <Text
              as="p"
              size="base"
              className="text-sm text-white-a700"
              responsive
            >
              {isNudge}
            </Text>
          </div>
        )}
        {cartItems?.length > 0 ? (
          <>
            <div className="flex flex-1 flex-col gap-3 px-3 md:px-4">
              <ShippingProgress
                freeShippingThreshold={targetAmountForFreeShipping}
                cartValue={totalAmountForShippingCharge}
                className="bg-[#F5E8DDBF] shadow-[0_4px_4px_#0000000D]"
              />
              <MainCartSection
                cartItems={cartItems}
                inventoryMapping={inventoryMapping}
                ltoProducts={ltoProducts}
              />
              <LoyaltyCash
                showLoyalty={showLoyalty}
                usableRewards={usableRewards}
                isRewardApplied={isRewardApplied}
                handleRewardApply={applyRewardPoint}
                totalRewardPointsOfUser={totalRewardPointsOfUser}
              />
              <Cashback
                cashbackAmount={prepaidCashbackRewardsOnOrder}
                amountNeeded={amountNeededToAvailCashback}
              />
              <CheckoutSummary />
            </div>

            <div
              ref={fixedCheckoutRef}
              className="fixed bottom-0 z-10 flex w-full max-w-[500px] flex-col gap-3 border-t bg-white-a700 px-3 pb-2.5 pt-1.5 transition-[right] duration-300 ease-in-out md:gap-4 md:px-4 md:pb-2.5"
              style={{ right: delayedIsOpen ? "0" : "-100%" }}
            >
              <CouponsAndOffers
                isSidebarOpen={isCouponsSidebarOpen}
                setIsSidebarOpen={setIsCouponsSidebarOpen}
              />
              <CheckoutButton
                grandTotal={grandTotal}
                totalAmountSaved={totalAmountSaved}
                validateAndGoToCheckout={validateAndGoToCheckout}
                checkoutButtonDisabled={checkoutButtonDisabled}
              />
              <Text
                size="sm"
                as="p"
                className="border-t-[0.25px] border-[#DDDDDD] pt-2 text-center"
              >
                Estimated delivery within 3-5 days
              </Text>
            </div>
          </>
        ) : (
          <EmptyCart cartClose={handleCartClose} />
        )}
      </div>
    </Drawer>
  );
};

export default CartDrawer;
