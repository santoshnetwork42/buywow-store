// components/MyCart/CartSidebar.jsx
import React, { Suspense } from "react";
import AjaxCartDesktopDivOfferViewAll from "@/components/partials/MyCart/AjaxCartDesktopDivOfferViewAll";
import PaymentSummary from "../PaymentSummary";

export default function CartSidebar({ offers, paymentSummary, cashback }) {
  return (
    <div className="flex w-full shrink flex-col gap-10">
      <div className="flex flex-col gap-3">
        <Suspense fallback={<div>Loading feed...</div>}>
          {offers.map((offer, index) => (
            <AjaxCartDesktopDivOfferViewAll
              key={index}
              promoimage={offer.image}
              offersheading={offer.heading}
              offerssubtext={offer.subtext}
              className="bg-blue_gray-300_01"
            />
          ))}
        </Suspense>
      </div>
      <PaymentSummary summary={paymentSummary} cashback={cashback} />
    </div>
  );
}
