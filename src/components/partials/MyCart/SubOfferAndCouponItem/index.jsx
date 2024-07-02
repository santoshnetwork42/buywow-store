import { Button, Heading, Text } from "@/components/common";

export const CouponItem = ({ coupon, isApplied, onApply, onRemove }) => (
  <div
    className={`flex flex-col gap-2 rounded-lg border px-4 py-2 sm:py-3 lg:py-4 ${isApplied ? "border-green-500" : "border-gray-200"}`}
  >
    <div className="flex items-center justify-between">
      <Heading size="lg" className="text-base" responsive>
        {coupon.code}
      </Heading>
      <Button
        onClick={isApplied ? onRemove : onApply}
        className={`rounded px-4 py-1 !text-sm font-normal ${
          isApplied
            ? "bg-transparent text-black-900"
            : coupon.isDisabled
              ? "bg-gray-300 text-gray-500"
              : "text-white-a700"
        }`}
        disabled={!isApplied && coupon.isDisabled}
      >
        {isApplied ? "Remove" : "Apply"}
      </Button>
    </div>
    <Text as="p" size="sm">
      {coupon.description}
    </Text>
    {isApplied && (
      <Text as="p" size="base" className="text-green-600">
        Applied
      </Text>
    )}
    {coupon.additionalInfo && (
      <Text as="p" size="sm" className="text-red-500">
        {coupon.additionalInfo}
      </Text>
    )}
  </div>
);

export const SubOfferItem = ({ subOffer }) => (
  <div className="flex flex-col gap-4 rounded-lg border border-gray-200 p-4">
    <Heading size="lg" responsive>
      {subOffer.heading}
    </Heading>
    <Text as="p" size="sm">
      {subOffer.description}
    </Text>
  </div>
);
