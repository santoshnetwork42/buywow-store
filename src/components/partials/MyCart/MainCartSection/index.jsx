// components/MyCart/MainCartSection.jsx
import React from "react";
import ShippingProgress from "@/components/partials/MyCart/ShippingProgress";
import ProductTable from "@/components/partials/MyCart/ProductTable";

export default function MainCartSection({ cartData }) {
  const cartValue = cartData.paymentSummary.subtotal;
  const freeShippingThreshold = cartData.freeShippingThreshold;

  return (
    <div className="flex w-full flex-col gap-5">
      <ShippingProgress
        freeShippingThreshold={freeShippingThreshold}
        cartValue={cartValue}
      />
      <ProductTable
        cartItems={cartData.cartItems}
        totalItems={cartData.itemCount}
        subtotal={cartData.paymentSummary.subtotal}
      />
    </div>
  );
}
