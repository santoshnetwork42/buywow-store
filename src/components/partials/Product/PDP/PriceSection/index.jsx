import React from "react";
import { Text } from "@/components/elements";
import { getDiscountPercentage, toDecimal } from "@/utils/helpers";

const PriceSection = React.memo(
  ({
    price,
    listingPrice,
    offerTag,
    totalOrders,
    hasInventory,
    currentInventory,
  }) => {
    const discountPercentage = getDiscountPercentage(price, listingPrice);

    return (
      <>
        <div className="flex items-center justify-between gap-2 sm:gap-3 md:justify-normal md:gap-4 lg:gap-5">
          <div className="flex items-center gap-2">
            <Text as="p" size="xl" className="font-semibold md:text-[22px]">
              ₹{toDecimal(price)}
            </Text>
            {!!(listingPrice >= price) && (
              <div className="flex items-center gap-1">
                <Text
                  as="p"
                  size="base"
                  className="text-sm font-light capitalize"
                  responsive
                >
                  MRP:
                </Text>
                <Text
                  as="p"
                  size="base"
                  className="text-sm line-through"
                  responsive
                >
                  ₹{toDecimal(listingPrice)}
                </Text>
              </div>
            )}
            {!!offerTag?.showOfferTag && !!(discountPercentage > 0) && (
              <Text
                as="p"
                size="sm"
                className="rounded-full px-2 py-1 md:font-medium"
                style={{ backgroundColor: offerTag?.bgColor || "#DD8434" }}
              >
                {discountPercentage}% Off
              </Text>
            )}
          </div>
          <Text as="p" size="sm" className="font-medium" responsive>
            MRP incl. of all taxes
          </Text>
        </div>
        <div className="mt-3 flex items-center gap-3 md:mt-4">
          {!!(totalOrders > 0) && (
            <Text
              as="p"
              size="lg"
              className="text-base font-medium text-green-700"
              responsive
            >
              {Math.ceil((totalOrders || 0) / 1000) * 1000}+ units sold
            </Text>
          )}
          {!!hasInventory && !!(currentInventory < 99) && (
            <Text
              as="p"
              size="base"
              className="text-sm text-red-500"
              responsive
            >
              Last {currentInventory} units left
            </Text>
          )}
        </div>
      </>
    );
  },
);

PriceSection.displayName = "PriceSection";

export default PriceSection;
