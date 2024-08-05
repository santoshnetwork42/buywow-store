import React, { useMemo } from "react";
import { Text, Heading } from "@/components/elements";
import { getDiscountPercentage, toDecimal } from "@/utils/helpers";

const ProductPricing = ({ price, listingPrice, cartItemType, slug }) => {
  const isFreeProduct = useMemo(
    () =>
      cartItemType === "FREE_PRODUCT" || cartItemType === "AUTO_FREE_PRODUCT",
    [cartItemType],
  );
  const showStrikePrice = listingPrice && price < listingPrice;

  const discountPercentage = useMemo(
    () => getDiscountPercentage(price, listingPrice),
    [price, listingPrice],
  );

  if (cartItemType === "AUTO_FREE_PRODUCT_DISABLED") return null;

  if (isFreeProduct) {
    return (
      <div className="flex items-center gap-1.5 md:gap-2">
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
    <div className="flex items-center gap-1.5">
      <Heading as="h4" size="base" className="text-sm" responsive>
        ₹{toDecimal(price)}
      </Heading>
      {!!showStrikePrice && (
        <Text as="span" size="sm" className="line-through" responsive>
          ₹{toDecimal(listingPrice)}
        </Text>
      )}
      {!!(discountPercentage > 0) && (
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

export default React.memo(ProductPricing);
