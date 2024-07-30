// components/MyCart/OfferItem.jsx
import React, { useState } from "react";
import { Button, Heading, Img, Text } from "@/components/elements";
import OfferSidebar from "@/components/partials/MyCart/OfferSidebar";

export default function OfferItem({ offer }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  const handleApplyCoupon = (code) => {
    setAppliedCoupon(code);
    // Add logic to apply the coupon to the cart
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    // Add logic to remove the coupon from the cart
  };

  if (!offer) return null;

  return (
    <>
      <div
        className={`relative flex shrink items-center justify-between gap-2 rounded-lg py-2 pl-2 pr-5 shadow-xs md:pl-2.5 ${offer.bgColor}`}
      >
        <div className="flex items-center justify-center gap-2">
          <Img
            src={offer.image}
            width={32}
            height={32}
            alt="promo image"
            className="aspect-square w-[32px] object-contain"
          />
          <div className="flex flex-col justify-center">
            <Heading
              size="base"
              as="h4"
              className={`${offer.textColor} line-clamp-1`}
              responsive
            >
              {offer.heading}
            </Heading>
            <Text
              size="base"
              as="p"
              className={`${offer.textColor} line-clamp-2`}
              responsive
            >
              {offer.subtext}
            </Text>
          </div>
        </div>
        <Button
          className="relative flex h-9 w-9 shrink-0 rounded-full bg-white-a700_01 p-0"
          onClick={openSidebar}
        >
          <Img src="img_group_1400002487.svg" width={7} height={20} />
        </Button>
      </div>

      <OfferSidebar
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
        coupons={offer.coupons}
        appliedCoupon={appliedCoupon}
        onApplyCoupon={handleApplyCoupon}
        onRemoveCoupon={handleRemoveCoupon}
      />
    </>
  );
}
