import React, { useMemo } from "react";
import { Text, Heading } from "@/components/elements";
import { getOfferValueWithPercentage, toDecimal } from "@/utils/helpers";

const ProductPricing = ({ price, listingPrice, cartItemType, slug }) => {
  const isFreeProduct =
    cartItemType === "FREE_PRODUCT" || cartItemType === "AUTO_FREE_PRODUCT";
  const showStrikePrice = listingPrice && price < listingPrice;

  const discountPercentage = useMemo(
    () => getOfferValueWithPercentage(price, listingPrice),
    [price, listingPrice],
  );

  if (cartItemType === "AUTO_FREE_PRODUCT_DISABLED") return null;

  if (isFreeProduct) {
    return (
      <div className="flex flex-wrap items-center gap-1.5 md:gap-2">
        {price > 0 && slug !== "gift" && (
          <Text as="span" size="sm" className="line-through" responsive>
            ₹{toDecimal(price)}
          </Text>
        )}
        <Text
          size="sm"
          as="p"
          className="h-fit w-fit rounded-md bg-green-600 px-2 py-0.5 text-white-a700_01"
          responsive
        >
          Free
        </Text>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <Heading as="h4" size="base" className="text-sm" responsive>
          ₹{toDecimal(price)}
        </Heading>
        {showStrikePrice && (
          <Text as="span" size="sm" className="line-through" responsive>
            ₹{toDecimal(listingPrice)}
          </Text>
        )}
      </div>
      {discountPercentage > 0 && (
        <Text
          size="sm"
          as="p"
          className="w-fit rounded-md bg-lime-50 px-2 py-0.5"
          responsive
        >
          {discountPercentage}% Off
        </Text>
      )}
    </div>
  );
};

export default ProductPricing;
