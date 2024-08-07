import { Heading, Img, Text } from "@/components/elements";
import { copyText, toDecimal } from "@/utils/helpers";
import { useFreebie } from "@wow-star/utils";
import React from "react";

const BestPriceDisplay = ({ bestCoupon, price, hasInventory }) => {
  const freeProduct = useFreebie();
  const { coupon, discount } = bestCoupon || {};
  const isProductCoupon = coupon?.couponType === "PRODUCT";

  if (!bestCoupon || !hasInventory) return null;

  return (
    <div className="flex justify-between rounded bg-gray-50 px-3 pb-2 pt-2.5 sm:w-[60%] md:w-full xl:w-[60%]">
      <div className="flex gap-2">
        <div className="aspect-square w-6 md:w-7">
          <Img
            src="img_product_best_price_display.svg"
            width={28}
            height={28}
            className="aspect-square h-auto w-full object-contain"
          />
        </div>
        <div className="flex flex-col justify-center gap-1">
          <Heading size="base" as="h4" className="text-sm" responsive>
            Best Price
          </Heading>
          <div className="flex items-center gap-1">
            <Text as="span" size="sm" className="font-light" responsive>
              Use code:
            </Text>
            <Text as="span" size="sm" responsive>
              {coupon?.code}
            </Text>
            <Text
              as="span"
              size="sm"
              onClick={() =>
                copyText(coupon?.code, `Coupon code copied: ${coupon?.code}`)
              }
              className="cursor-pointer underline"
              responsive
            >
              Copy
            </Text>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <Heading as="h4" size="base" className="text-sm font-bold" responsive>
          ₹{toDecimal(price - discount)}
        </Heading>
        <Text as="span" size="sm" className="line-through" responsive>
          ₹{toDecimal(price)}
        </Text>
      </div>
    </div>
  );
};

const AllOffers = ({ bestCoupon }) => {
  return (
    <div className="flex flex-1 rounded bg-blue-50 px-3 py-2.5">All Offers</div>
  );
};

const OffersAndDiscounts = ({ bestCoupon, price, hasInventory }) => {
  if (!bestCoupon || !hasInventory) return null;
  return (
    <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2.5 md:flex-col md:items-stretch lg:gap-3 xl:flex-row xl:items-center">
      <BestPriceDisplay
        bestCoupon={bestCoupon}
        price={price}
        hasInventory={hasInventory}
      />
      {/* <AllOffers bestCoupon={bestCoupon} /> */}
    </div>
  );
};

export default OffersAndDiscounts;
