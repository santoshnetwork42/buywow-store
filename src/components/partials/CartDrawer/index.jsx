"use client";

import { showToast } from "@/components/common/ToastComponent";
import { Text } from "@/components/elements";
import Drawer from "@/components/features/Drawer";
import CartHeader from "@/components/partials/CartDrawer/CartHeader";
import Cashback from "@/components/partials/CartDrawer/Cashback";
import CheckoutButton from "@/components/partials/CartDrawer/CheckoutButton";
import CheckoutSummary from "@/components/partials/CartDrawer/CheckoutSummary";
import EmptyCart from "@/components/partials/CartDrawer/EmptyCart";
import LoyaltyCash from "@/components/partials/CartDrawer/LoyaltyCash";
import MainCartSection from "@/components/partials/CartDrawer/MainCartSection";
import CouponsAndOffers from "@/components/partials/CartDrawer/MainCartSection/CouponsAndOffers";
import ShippingProgress from "@/components/partials/Others/ShippingProgress";
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
import {
  useCartItems,
  useCartTotal,
  useConfiguration,
  useInventory,
} from "@wow-star/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const CartDrawer = ({ upsellProducts }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const _cx = searchParams?.get("_cx");
  const forceOpenCart = searchParams?.get("cart");

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
  const fixedCheckoutRef = useRef(null);

  useEffect(() => {
    const checkoutElement = fixedCheckoutRef.current;
    if (checkoutElement) {
      setCheckoutSectionHeight(checkoutElement.offsetHeight);
    }

    if (isCartOpen) {
      const timer = setTimeout(() => setDelayedIsOpen(true), 50);
      return () => clearTimeout(timer);
    } else {
      setDelayedIsOpen(false);
    }
  }, [isCartOpen, appliedCoupon]);

  const inventory = useInventory({ validateCart });
  const {
    ready: isInventoryCheckReady,
    success: isInventoryCheckSuccess,
    inventoryMapping,
    outOfStockItems,
  } = inventory;
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

  const cartItems = useCartItems({
    showLTOProducts: false,
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
        return Promise.resolve(false);
      }
    }

    const lscart = localStorage.getItem(`${STORE_PREFIX}-cartId`) || "";
    const cartId = lscart || shoppingCartId;

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
        return Promise.resolve(true);
      } catch (e) {
        await gokwikSdk.close();
        // errorHandler(e);
        router.push("/checkout");
      }
    }

    handleProceedToCheckout("BUYWOW");
    if (user?.id || guestCheckout || customUser?.phone) {
      router.push("/checkout");
      return Promise.resolve(true);
    }

    handlePasswordLessModal(true, true, "/checkout");
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

  const handleCartClose = useCallback(() => {
    handleCartVisibility(false);
  }, [handleCartVisibility]);

  useEffect(() => {
    if (isCartOpen) {
      viewCart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCartOpen]);

  useEffect(() => {
    const shouldForceOpenCart =
      forceOpenCart === "1" &&
      !isCartOpen &&
      !RESTRICT_SEARCH_AND_CART_TO_SHOW.some(
        (allowedPath) =>
          allowedPath === pathname ||
          (allowedPath !== "/" && pathname.startsWith(`${allowedPath}/`)),
      );

    if (shouldForceOpenCart) {
      handleCartVisibility(true);
    } else {
      handleCartVisibility(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceOpenCart]);

  useEffect(() => {
    if (_cx) {
      fetchAndAddProductsFromEncodedCart(_cx);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_cx]);

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
        {cartItems?.length > 0 ? (
          <>
            <div className="flex flex-1 flex-col gap-3 px-3 md:px-4">
              {/* <ShippingProgress
                freeShippingThreshold={targetAmountForFreeShipping}
                cartValue={totalAmountForShippingCharge}
                className="bg-[#F5E8DDBF] shadow-[0_4px_4px_#0000000D]"
              /> */}
              <MainCartSection
                cartItems={cartItems}
                inventoryMapping={inventoryMapping}
                upsellProducts={upsellProducts}
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
              <CouponsAndOffers />
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
