// components/MyCart/CartSidebar.jsx
import OfferItem from "@/components/partials/MyCart/OfferItem";
import PaymentSummary from "@/components/partials/MyCart/PaymentSummary";
import { Suspense } from "react";

export default function CartSidebar({
  offers,
  cashback,
  totalPrice,
  totalListingPrice,
  couponTotal,
  prepaidDiscount,
  prepaidDiscountPercent,
  shippingTotal,
  usableRewards,
  grandTotal,
  totalSaved,
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
        cashback={cashback}
        totalPrice={totalPrice}
        totalListingPrice={totalListingPrice}
        couponTotal={couponTotal}
        prepaidDiscount={prepaidDiscount}
        prepaidDiscountPercent={prepaidDiscountPercent}
        shippingTotal={shippingTotal}
        usableRewards={usableRewards}
        grandTotal={grandTotal}
        totalSaved={totalSaved}
      />
    </div>
  );
}
