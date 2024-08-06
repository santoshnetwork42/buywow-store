// components/MyCart/MainCartSection.jsx
import React from "react";
import ShippingProgress from "@/components/partials/Others/ShippingProgress";
import CartProductList from "@/components/partials/MyCart/CartProductList";

export default function MainCartSection({
  cartData,
  totalCartItems,
  subTotal,
  inventoryMapping = {},
}) {
  const freeShippingThreshold = cartData.freeShippingThreshold;

  return (
    <div className="flex w-full flex-col gap-5">
      <ShippingProgress
        freeShippingThreshold={freeShippingThreshold}
        cartValue={subTotal}
      />
      <CartProductList
        cartItems={cartData}
        totalItems={totalCartItems}
        subtotal={subTotal}
        inventoryMapping={inventoryMapping}
      />
    </div>
  );
}
