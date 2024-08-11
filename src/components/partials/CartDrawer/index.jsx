"use client";

import Drawer from "@/components/features/Drawer";
import { useNavBarState } from "@/utils/context/navbar";
import { useCartItems, useCartTotal, useInventory } from "@wow-star/utils";
import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import CartHeader from "@/components/partials/CartDrawer/CartHeader";
import ShippingProgress from "@/components/partials/Others/ShippingProgress";
import MainCartSection from "@/components/partials/CartDrawer/MainCartSection";
import CheckoutSummary from "@/components/partials/CartDrawer/CheckoutSummary";
import Cashback from "./Cashback";
import EmptyCart from "./EmptyCart";
import LoyaltyCash from "./LoyaltyCash";
import { useCartDispatch } from "@/store/sagas/dispatch/cart.dispatch";
import { useModalDispatch } from "@/store/sagas/dispatch/modal.dispatch";
import { usePathname, useSearchParams } from "next/navigation";
import { useEventsDispatch } from "@/store/sagas/dispatch/events.dispatch";
import { fetchProductDetailsAPI } from "@/lib/appSyncAPIs";

const CartDrawer = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const _cx = searchParams?.get("_cx");
  const forceOpenCart = searchParams?.get("cart");

  const {
    cart: { isCartOpen },
  } = useSelector((state) => state?.modal?.modal);
  const { validateCart, emptyCart, addToCart } = useCartDispatch();
  const { handleCartVisibility } = useModalDispatch();
  const { viewCart } = useEventsDispatch();

  const cartItems = useCartItems({
    showLTOProducts: false,
    showNonApplicableFreeProducts: true,
  });

  const inventory = useInventory({ validateCart });
  const { inventoryMapping } = inventory;
  const { isRewardApplied, handleRewardApply } = useNavBarState();

  const {
    totalPrice,
    grandTotal,
    usableRewards,
    totalRewardPointsOfUser,
    prepaidCashbackRewardsOnOrder,
    amountNeededToAvailPrepaidCashback,
    showLoyalty,
    totalItems = 0,
  } = useCartTotal({
    paymentType: "PREPAID",
    isRewardApplied,
  });

  const handleCartClose = useCallback(() => {
    handleCartVisibility(false);
  }, [handleCartVisibility]);

  useEffect(() => {
    if (!isCartOpen) {
      viewCart();
    }
  }, [isCartOpen, viewCart]);

  useEffect(() => {
    if (!forceOpenCart) {
      handleCartVisibility(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const amountNeededToAvailCashback =
    amountNeededToAvailPrepaidCashback?.amount - grandTotal;

  useEffect(() => {
    async function fetchAndAddProduct() {
      if (_cx) {
        const cart = JSON.parse(atob(_cx));
        emptyCart();

        for (let index = 0; index < cart.length; index++) {
          const element = cart[index];

          if (element.product_id) {
            const product = await fetchProductDetailsAPI(element.product_id);
            let tmpName, tmpPrice;
            try {
              if (product) {
                if (
                  element.variant_id &&
                  element.variant_id !== element.product_id
                ) {
                  const variant = product.variants.items.find(
                    (i) => i.id === element.variant_id,
                  );
                  if (variant) {
                    tmpName = `${tmpName} - ${variant.title}`;
                    tmpPrice = variant.price;

                    addToCart({
                      ...product,
                      name: tmpName,
                      qty: Number(element.qty),
                      price: tmpPrice,
                      variantId: variant.id,
                    });
                    handleCartVisibility(true);
                  }
                } else {
                  addToCart({
                    ...product,
                    qty: Number(element.qty),
                    price: product?.price,
                  });
                  handleCartVisibility(true);
                }
              }
            } catch (error) {
              console.error("Error adding cart limechat :", error);
            }
          }
        }
      }
    }

    fetchAndAddProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_cx]);

  return (
    <Drawer
      isOpen={isCartOpen}
      width="500px"
      position="right"
      onClose={handleCartClose}
    >
      <div className="flex flex-1 flex-col gap-3 px-3 py-4 md:px-4">
        {/* done */}
        <CartHeader
          text="my Cart"
          totalItems={totalItems}
          cartClose={handleCartClose}
        />
        {cartItems?.length > 0 ? (
          <div className="flex w-full flex-1 flex-col gap-3">
            <ShippingProgress
              freeShippingThreshold={1203}
              cartValue={totalPrice}
              className="bg-[#F5E8DDBF] shadow-[0_4px_4px_#0000000D]"
            />
            <MainCartSection
              cartItems={cartItems}
              inventoryMapping={inventoryMapping}
              handleCartClose={handleCartClose}
            />
            {/* done */}
            <LoyaltyCash
              showLoyalty={showLoyalty}
              usableRewards={usableRewards}
              isRewardApplied={isRewardApplied}
              handleRewardApply={handleRewardApply}
              totalRewardPointsOfUser={totalRewardPointsOfUser}
            />
            {/* done */}
            <Cashback
              cashbackAmount={prepaidCashbackRewardsOnOrder}
              amountNeeded={amountNeededToAvailCashback}
            />
            {/* done */}
            <CheckoutSummary inventory={inventory} />
          </div>
        ) : (
          // done
          <EmptyCart cartClose={handleCartClose} />
        )}
      </div>
    </Drawer>
  );
};

export default CartDrawer;
