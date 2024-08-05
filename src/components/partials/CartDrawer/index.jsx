"use client";

import { CloseSVG } from "@/assets/images";
import { Button, Heading } from "@/components/elements";
import Drawer from "@/components/features/Drawer";
import { cartSagaActions } from "@/store/sagas/sagaActions/cart.actions";
import { modalSagaActions } from "@/store/sagas/sagaActions/modal.actions";
import { useNavBarState } from "@/utils/context/navbar";
import { useCartItems, useCartTotal, useInventory } from "@wow-star/utils";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartHeader from "@/components/partials/CartDrawer/CartHeader";
import ShippingProgress from "@/components/partials/Others/ShippingProgress";
import MainCartSection from "@/components/partials/CartDrawer/MainCartSection";

const CartDrawer = () => {
  const dispatch = useDispatch();
  const {
    modal: {
      cart: { isCartOpen },
    },
  } = useSelector((state) => state?.modal);

  const cartData = useCartItems({
    showLTOProducts: false,
    showNonApplicableFreeProducts: true,
  });

  const validateCart = useCallback(
    (payload) => {
      dispatch({
        type: cartSagaActions.VALIDATE_CART,
        payload,
      });
    },
    [dispatch],
  );
  const inventory = useInventory({ validateCart });
  const { inventoryMapping } = inventory;

  const { isRewardApplied } = useNavBarState();

  const {
    totalListingPrice,
    totalPrice,
    shippingTotal,
    totalAmountSaved: totalSaved,
    couponTotal,
    grandTotal,
    prepaidDiscount,
    codCharges,
    prepaidDiscountPercent,
    usableRewards,
    totalItems = 0,
  } = useCartTotal({
    paymentType: "PREPAID",
    isRewardApplied,
  });

  const handleCartOpen = useCallback(
    (isOpen = false) => {
      dispatch({
        type: modalSagaActions.SET_CART_MODAL,
        payload: { isCartOpen: isOpen },
      });
    },
    [dispatch],
  );

  const handleCartClose = useCallback(() => {
    handleCartOpen(false);
  }, [handleCartOpen]);

  return (
    <Drawer
      isOpen={isCartOpen}
      width="500px"
      position="right"
      onClose={handleCartClose}
    >
      <div className="flex flex-col gap-3 px-3 pt-4 md:px-4">
        <CartHeader totalItems={totalItems} onClose={handleCartClose} />
        <div className="flex w-full flex-col gap-3">
          <ShippingProgress
            freeShippingThreshold={1203}
            cartValue={totalPrice}
            className="bg-[#F5E8DDBF] shadow-[0_4px_4px_#0000000D]"
          />
          <MainCartSection
            cartData={cartData}
            inventoryMapping={inventoryMapping}
            handleCartClose={handleCartClose}
          />
        </div>
      </div>
    </Drawer>
  );
};

export default CartDrawer;
