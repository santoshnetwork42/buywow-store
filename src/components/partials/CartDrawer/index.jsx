"use client";

import { showToast } from "@/components/common/ToastComponent";
import Drawer from "@/components/features/Drawer";
import CartHeader from "@/components/partials/CartDrawer/CartHeader";
import CheckoutSummary from "@/components/partials/CartDrawer/CheckoutSummary";
import MainCartSection from "@/components/partials/CartDrawer/MainCartSection";
import ShippingProgress from "@/components/partials/Others/ShippingProgress";
import { GOKWIK_MID, STORE_PREFIX } from "@/config";
import { getUserAPI } from "@/lib/appSyncAPIs";
import { useCartDispatch } from "@/store/sagas/dispatch/cart.dispatch";
import { useEventsDispatch } from "@/store/sagas/dispatch/events.dispatch";
import { useModalDispatch } from "@/store/sagas/dispatch/modal.dispatch";
import { useGuestCheckout } from "@/utils/context/navbar";
import { GOKWIK_ENABLED, PREPAID_ENABLED } from "@/utils/data/constants";
import {
  useCartItems,
  useCartTotal,
  useConfiguration,
  useInventory,
} from "@wow-star/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import Cashback from "./Cashback";
import CheckoutButton from "./CheckoutButton";
import EmptyCart from "./EmptyCart";
import LoyaltyCash from "./LoyaltyCash";
import CouponsAndOffers from "./MainCartSection/CouponsAndOffers";

const CartDrawer = ({ upsellProducts }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const _cx = searchParams?.get("_cx");
  const forceOpenCart = searchParams?.get("cart");

  const {
    appliedCoupon,
    shoppingCartId,
    user,
    customUser,
    cartList,
    isShoppingCartIdLoading,
    isCartOpen,
    isRewardApplied,
  } = useSelector((state) => ({
    appliedCoupon: state.cart?.coupon,
    shoppingCartId: state.cart?.cartId,
    isShoppingCartIdLoading: state.cart?.isShoppingCartIdLoading,
    user: state.user?.user,
    customUser: state.user?.customUser,
    cartList: state.cart?.data,
    isCartOpen: state.modal?.modal?.cart?.isCartOpen,
    isRewardApplied: state.cart?.isRewardApplied,
  }));

  const { validateCart, fetchAndAddProductsFromEncodedCart, applyRewardPoint } =
    useCartDispatch();
  const { handleCartVisibility, handlePasswordLessModal } = useModalDispatch();
  const { handleOutOfStock, handleProceedToCheckout, viewCart } =
    useEventsDispatch();

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
        console.log(e);
        // await gokwikSdk.close();
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
    if (!forceOpenCart) {
      handleCartVisibility(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

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
      <div className="relative flex flex-1 flex-col gap-3 pt-4">
        {/* done */}
        <CartHeader
          text="my Cart"
          totalItems={totalItems}
          cartClose={handleCartClose}
          className="mx-3 md:mx-4"
        />
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
                handleCartClose={handleCartClose}
                upsellProducts={upsellProducts}
              />
              {/* done */}
              <LoyaltyCash
                showLoyalty={showLoyalty}
                usableRewards={usableRewards}
                isRewardApplied={isRewardApplied}
                handleRewardApply={applyRewardPoint}
                totalRewardPointsOfUser={totalRewardPointsOfUser}
              />
              {/* done */}
              <Cashback
                cashbackAmount={prepaidCashbackRewardsOnOrder}
                amountNeeded={amountNeededToAvailCashback}
              />
              {/* done */}
              <CheckoutSummary />
            </div>

            <div className="sticky bottom-0 left-3 z-10 flex flex-col gap-3 border-t bg-white-a700 px-3 pb-4 pt-1.5 md:gap-4 md:px-4">
              {/* done */}
              <CouponsAndOffers />
              {/* done */}
              <CheckoutButton
                grandTotal={grandTotal}
                totalAmountSaved={totalAmountSaved}
                validateAndGoToCheckout={validateAndGoToCheckout}
                checkoutButtonDisabled={checkoutButtonDisabled}
              />
            </div>
          </>
        ) : (
          // done
          <EmptyCart cartClose={handleCartClose} />
        )}
      </div>
    </Drawer>
  );
};

export default CartDrawer;
