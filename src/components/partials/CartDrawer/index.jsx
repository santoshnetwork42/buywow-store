"use client";

import Drawer from "@/components/features/Drawer";
import { cartSagaActions } from "@/store/sagas/sagaActions/cart.actions";
import { modalSagaActions } from "@/store/sagas/sagaActions/modal.actions";
import { useNavBarState } from "@/utils/context/navbar";
import { useCartItems, useCartTotal, useInventory } from "@wow-star/utils";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CartHeader from "@/components/partials/CartDrawer/CartHeader";
import ShippingProgress from "@/components/partials/Others/ShippingProgress";
import MainCartSection from "@/components/partials/CartDrawer/MainCartSection";
import { CartIcon } from "@/assets/svg/icons";
import Link from "next/link";
import CheckoutSummary from "@/components/partials/CartDrawer/CheckoutSummary";
import Cashback from "./Cashback";
import EmptyCart from "./EmptyCart";
import LoyaltyCash from "./LoyaltyCash";

const CartDrawer = () => {
  const dispatch = useDispatch();
  const {
    modal: {
      cart: { isCartOpen },
    },
  } = useSelector((state) => state?.modal);

  const cartItems = useCartItems({
    showLTOProducts: false,
    showNonApplicableFreeProducts: true,
  });

  const validateCart = (payload) => {
    dispatch({
      type: cartSagaActions.VALIDATE_CART,
      payload,
    });
  };

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

  const handleCartOpen = (isOpen = false) => {
    dispatch({
      type: modalSagaActions.SET_CART_MODAL,
      payload: { isCartOpen: isOpen },
    });
  };

  const handleCartClose = () => {
    handleCartOpen(false);
  };

  const amountNeededToAvailCashback =
    amountNeededToAvailPrepaidCashback?.amount - grandTotal;

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
