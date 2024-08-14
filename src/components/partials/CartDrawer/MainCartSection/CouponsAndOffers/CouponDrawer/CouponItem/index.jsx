import { Button, Heading, Text } from "@/components/elements";
import Accordion from "@/components/features/Accordion";
import React from "react";

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
    <div className="flex flex-col rounded-lg border-[0.5px] border-[#1F1F1F]">
      <div className="flex flex-col gap-1.5 p-3">
        <div className="flex gap-4">
          <div className="flex flex-1 flex-col gap-1.5">
            {!title && (
              <Heading as="h4" size="lg">
                {title}
                Get 25% Off | Save ₹323
              </Heading>
            )}
            {!!exclusions && (
              <Text as="p" size="sm" className="font-medium text-yellow-900">
                {exclusions}
                {showAsterisk && "*"}
              </Text>
            )}
          </div>
          <Button
            variant="primary"
            size="small"
            className={`h-fit overflow-visible px-3 py-1.5 ${isApplied ? "bg-transparent uppercase text-black-900" : "bg-yellow-900"}`}
            onClick={isApplied ? removeCoupon : () => applyCoupon(coupon.code)}
            disabled={!allowed || loading}
          >
            {isApplied ? "Remove" : "Apply"}
          </Button>
        </div>
        {!!coupon.couponNote && (
          <Text
            as="p"
            size="sm"
            dangerouslySetInnerHTML={{ __html: coupon.couponNote }}
            className="inline-html-content"
          />
        )}
      </div>
      <div className="relative mt-1 border-b-[1px] border-dotted border-[#1F1F1F] before:absolute before:left-0 before:size-[18px] before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-45 before:rounded-full before:border-[0.5px] before:border-transparent before:border-r-[#1F1F1F] before:border-t-[#1F1F1F] before:bg-white-a700 after:absolute after:right-0 after:size-[18px] after:-translate-y-1/2 after:translate-x-1/2 after:rotate-[225deg] after:rounded-full after:border-[0.5px] after:border-transparent after:border-r-[#1F1F1F] after:border-t-[#1F1F1F] after:bg-white-a700" />
      <div className="flex justify-between px-3 py-2">
        <Accordion
          className="border-b-0"
          accordionButtonClassName="py-1 gap-2 w-fit"
          variant="small"
          title={
            <Text as="span" size="sm" className="underline">
              {" "}
              View details{" "}
            </Text>
          }
        >
          <ul className="list-inside list-disc">
            <Text as="li" size="sm">
              Only valid on prepaid orders
            </Text>
            <Text as="li" size="sm">
              Other T&amp;C may apply
            </Text>
          </ul>
        </Accordion>
        <Heading
          as="h5"
          size="sm"
          className={`h-fit rounded-md border-[1.5px] border-dashed border-blue-300 bg-blue-300/15 px-3 py-1.5`}
        >
          {coupon.code}
        </Heading>
      </div>
    </div>
  );
};

export default React.memo(CouponItem);
