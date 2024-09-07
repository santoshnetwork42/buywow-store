import { ArrowIconSVG } from "@/assets/svg/icons";
import { Button, Heading, Input, Text } from "@/components/elements";
import Drawer from "@/components/features/Drawer";
import React from "react";
import CouponItem from "@/components/partials/CartDrawer/MainCartSection/CouponsAndOffers/CouponDrawer/CouponItem";

const CouponDrawer = ({
  isOpen,
  onClose,
  couponCode,
  setCouponCode,
  loading,
  error,
  applyCouponCode,
  featuredCoupons,
  appliedCoupon,
  handleCouponRemove,
}) => (
  <Drawer
    isOpen={isOpen}
    onClose={onClose}
    position="right"
    width="500px"
    isNestedDrawer={true}
  >
    <div className="flex flex-1 flex-col gap-4 px-3 py-4 md:px-4">
      <div className="flex items-center gap-3 border-b-[0.25px] border-black-900 pb-2 md:gap-4 md:pb-2.5">
        <Button
          onClick={onClose}
          className="flex size-8 items-center justify-center rounded-full bg-deep_orange-50_03 md:size-9"
        >
          <ArrowIconSVG side="left" strokeWidth={1.8} />
        </Button>
        <Heading size="xl" as="h2" className="text-lg" responsive>
          Coupons & Offers{" "}
          {featuredCoupons?.length > 0 && `(${featuredCoupons.length})`}
        </Heading>
      </div>

      <div className="flex flex-col gap-2">
        <Input
          placeholder="Enter coupon code here"
          name="coupon_code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          className="flex flex-grow rounded-lg border px-3 py-2.5 shadow-[0_4px_4px_#0000000D]"
          suffix={
            <Button
              onClick={() => couponCode && applyCouponCode(couponCode)}
              size="small"
              className="text-base font-semibold text-yellow-900"
              disabled={loading}
            >
              Apply
            </Button>
          }
        />
        {error && (
          <Text as="p" size="sm" className="text-red-600" responsive>
            {error}
          </Text>
        )}
      </div>

      {featuredCoupons?.length > 0 && (
        <div className="mt-3 flex flex-col gap-3">
          {featuredCoupons
            .filter((c) => c.coupon)
            .map(({ allowed, coupon, message }) => (
              <CouponItem
                key={coupon.id}
                coupon={coupon}
                appliedCouponCode={appliedCoupon?.code}
                allowed={allowed}
                exclusions={message}
                applyCoupon={applyCouponCode}
                removeCoupon={handleCouponRemove}
                loading={loading}
              />
            ))}
        </div>
      )}

      <Text as="p" size="sm" className="mt-4 font-medium">
        <span className="font-bold text-yellow-900">*</span>Applicable on
        certain products
      </Text>
    </div>
  </Drawer>
);

export default React.memo(CouponDrawer);
