// components/MyCart/CartSidebar.jsx
import React, { Suspense } from "react";
import PaymentSummary from "@/components/partials/MyCart/PaymentSummary";
import OfferItem from "@/components/partials/MyCart/OfferItem";

export default function CartSidebar({
  offers,
  paymentSummary,
  cashback,
  subTotal,
}) {
  return (
    <div className="flex w-full flex-col gap-10">
      <div className="flex flex-col gap-3">
        <Suspense fallback={<div>Loading feed...</div>}>
          {offers.map((offer, index) => (
            <OfferItem key={index} offer={offer} />
          ))}
        </Suspense>
      </div>
      <PaymentSummary
        summary={paymentSummary}
        cashback={cashback}
        subTotal={subTotal}
      />
    </div>
  );
}
