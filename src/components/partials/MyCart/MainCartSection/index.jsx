// components/MyCart/MainCartSection.jsx
import React from "react";
import ShippingProgress from "../ShippingProgress";
import ProductTable from "../ProductTable";

export default function MainCartSection({ cartData }) {
  return (
    <div className="flex w-full flex-col gap-5">
      <ShippingProgress
        amountAwayFromFreeShipping={cartData.amountAwayFromFreeShipping}
      />
      <ProductTable
        cartItems={cartData.cartItems}
        totalItems={cartData.itemCount}
        subtotal={cartData.paymentSummary.subtotal}
      />
    </div>
  );
}
