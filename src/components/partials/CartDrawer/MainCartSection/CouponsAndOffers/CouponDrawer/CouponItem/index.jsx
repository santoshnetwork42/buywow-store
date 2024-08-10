import React from "react";
import { Button, Heading, Text } from "@/components/elements";

const CouponItem = ({
  title,
  coupon,
  appliedCouponCode,
  allowed,
  applyCoupon,
  removeCoupon,
  exclusions,
  loading,
}) => {
  if (!coupon) return null;

  const isApplied = appliedCouponCode === coupon.code;
  const showAsterisk = !!(
    coupon.applicableProducts?.length || coupon.applicableCollections?.length
  );

  return (
    <div
      className={`flex flex-col gap-3 rounded-lg px-4 py-3 ${
        isApplied ? "border-2 border-green-500 bg-green-100" : "bg-pink-200"
      }`}
    >
      <div className="flex flex-col gap-1">
        {!!title && (
          <Heading as="h3" size="lg">
            {title}
          </Heading>
        )}
        {!!coupon.couponNote && (
          <Text
            as="p"
            size="sm"
            dangerouslySetInnerHTML={{ __html: coupon.couponNote }}
            className="inline-html-content"
          />
        )}
        {!!exclusions && (
          <Text as="p" size="sm" className={`${!allowed && "text-red-600"}`}>
            {exclusions}
            {showAsterisk && "*"}
          </Text>
        )}
      </div>
      <div className="flex items-center justify-between">
        <Heading
          as="h5"
          size="sm"
          className={`rounded-full border-[1.5px] border-dashed ${
            isApplied
              ? "border-green-700 bg-green-50"
              : "border-yellow-900 bg-white-a700"
          } px-2.5 py-1`}
        >
          {coupon.code}
        </Heading>
        <Button
          variant={isApplied ? "secondary" : "primary"}
          size="small"
          onClick={isApplied ? removeCoupon : () => applyCoupon(coupon.code)}
          disabled={!allowed || loading}
        >
          {isApplied ? "REMOVE" : "Apply"}
        </Button>
      </div>
      <Text as="p" size="xs">
        *Other T&C May Apply
      </Text>
    </div>
  );
};

export default React.memo(CouponItem);
