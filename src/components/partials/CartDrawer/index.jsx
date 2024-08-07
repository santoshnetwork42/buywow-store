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

  const validateCart = (payload) => {
    dispatch({
      type: cartSagaActions.VALIDATE_CART,
      payload,
    });
  };
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

  return (
    <Drawer
      isOpen={isCartOpen}
      width="500px"
      position="right"
      onClose={handleCartClose}
    >
      <div className="flex flex-1 flex-col gap-3 px-3 py-4 md:px-4">
        <CartHeader totalItems={totalItems} onClose={handleCartClose} />
        <div className="flex w-full flex-1 flex-col gap-3">
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
          <div className="flex flex-col items-center justify-center">
            <CartIcon size={250} />
            <Link
              href="/"
              className="rounded-full bg-yellow-900 p-4 text-lg text-white-a700_01"
              onClick={handleCartClose}
            >
              Return To Home
            </Link>
          </div>
          <Cashback cashbackAmount={prepaidCashbackRewardsOnOrder} />
          <CheckoutSummary inventory={inventory} />
        </div>
      </div>
    </Drawer>
  );
};

export default CartDrawer;
