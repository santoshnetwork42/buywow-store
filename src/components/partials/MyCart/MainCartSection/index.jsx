// components/MyCart/MainCartSection.jsx
import React from "react";
import ShippingProgress from "@/components/partials/MyCart/ShippingProgress";
import CartProductList from "@/components/partials/MyCart/CartProductList";

export default function MainCartSection({
  cartData,
  realCartData,
  totalCartItemsCount,
  subTotal,
}) {
  const cartValue = cartData.paymentSummary.subtotal;
  const freeShippingThreshold = cartData.freeShippingThreshold;

  return (
    <div className="flex w-full flex-col gap-5">
      <ShippingProgress
        freeShippingThreshold={freeShippingThreshold}
        cartValue={cartValue}
      />
      <CartProductList
        cartItems={realCartData.data}
        totalItems={totalCartItemsCount}
        subtotal={subTotal}
      />
    </div>
  );
}
