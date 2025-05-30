import { Text } from "@/components/elements";
import { getDiscountPercentage, toDecimal } from "@/utils/helpers";
import React from "react";
import { twMerge } from "tailwind-merge";

const PriceSection = React.memo(
  ({
    price,
    listingPrice,
    offerTag,
    totalOrders,
    hasInventory,
    currentInventory,
    minimumOrderQuantity,
    showVariantThumbnails,
  }) => {
    const discountPercentage = getDiscountPercentage(price, listingPrice);

    return (
      <>
        <div
          className={twMerge(
            `mt-2 flex items-center justify-between gap-2 sm:gap-3 md:justify-normal md:gap-4 lg:gap-5`,
            !showVariantThumbnails ? "sm:hidden" : "",
          )}
        >
          <div className="flex items-center gap-2">
            <Text as="p" size="xl" className="font-semibold md:text-[22px]">
              ₹{toDecimal(price)}
            </Text>
            {listingPrice > price && (
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
            {!!offerTag?.showOfferTag && discountPercentage > 0 && (
              <Text
                as="p"
                size="sm"
                className="rounded-full bg-lime-50 px-2 py-1 md:font-medium"
              >
                {discountPercentage}% Off
              </Text>
            )}
          </div>
          <Text as="p" size="sm" className="font-medium" responsive>
            MRP incl. of all taxes
          </Text>
        </div>
        <div
          className={twMerge(
            "mt-2 flex items-center gap-3 md:mt-3",
            // !showVariantThumbnails ? "sm:hidden" : "",
          )}
        >
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
          {!!hasInventory &&
            !!(currentInventory < 99) &&
            showVariantThumbnails && (
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
        <div
          className={twMerge(
            "mt-1 flex items-center md:mt-2",
            !showVariantThumbnails ? "sm:hidden" : "",
          )}
        >
          {!!(minimumOrderQuantity > 1) && (
            <Text as="p" size="sm" className="font-medium">
              {`Minimum Order Quantity : ${minimumOrderQuantity}`}
            </Text>
          )}
        </div>
      </>
    );
  },
);

PriceSection.displayName = "PriceSection";

export default PriceSection;
