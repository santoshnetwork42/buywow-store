// components/MyCart/OfferSidebar.jsx
import React, { useState } from "react";
import { Button, Heading, Input, Text } from "@/components/elements";
import Sidebar from "@/components/features/Drawer";
import { CouponItem } from "@/components/partials/MyCart/SubOfferAndCouponItem";
import { CloseSVG } from "@/assets/images";

export default function OfferSidebar({
  isOpen,
  onClose,
  coupons,
  appliedCoupon,
  onApplyCoupon,
  onRemoveCoupon,
}) {
  const [couponCode, setCouponCode] = useState("");

  const handleApplyCoupon = () => {
    if (couponCode) {
      onApplyCoupon(couponCode);
      setCouponCode("");
    }
  };

  return (
    <Sidebar isOpen={isOpen} onClose={onClose} position="right" width="460px">
      <div className="flex h-full flex-col gap-3 p-3 !pb-0 sm:p-4 md:p-5 lg:p-6">
        <div className="mb-0 flex items-center justify-between">
          <Heading size="xl" as="h3">
            COUPONS ({coupons.length})
          </Heading>
          <Button onClick={onClose} className="bg-transparent p-2">
            <CloseSVG height={24} width={24} fillColor="#000000" />
          </Button>
        </div>
        <div className="flex rounded-lg border px-3 py-1.5">
          <Input
            placeholder="Enter coupon code here"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="flex flex-grow border-0 p-0"
            suffix={
              <Button
                onClick={handleApplyCoupon}
                className="border-0 bg-transparent text-base text-black-900 sm:text-base lg:text-base"
              >
                Apply
              </Button>
            }
          />
        </div>
        <div className="no-scrollbar flex flex-grow flex-col gap-2 overflow-y-auto">
          {coupons.map((coupon, index) => (
            <CouponItem
              key={index}
              coupon={coupon}
              isApplied={appliedCoupon === coupon.code}
              onApply={() => onApplyCoupon(coupon.code)}
              onRemove={() => onRemoveCoupon(coupon.code)}
            />
          ))}
          <Text size="sm" as="p" className="mb-4 mt-2 text-gray-500" responsive>
            *Applicable on certain products
          </Text>
        </div>
      </div>
    </Sidebar>
  );
}
