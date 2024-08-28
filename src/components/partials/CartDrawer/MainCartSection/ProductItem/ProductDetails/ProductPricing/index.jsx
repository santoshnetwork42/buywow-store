import { Heading, Text } from "@/components/elements";
import { getDiscountPercentage, toDecimal } from "@/utils/helpers";
import React from "react";

const ProductPricing = ({
  price,
  listingPrice,
  cartItemType,
  isFreeProduct,
  slug,
}) => {
  const discountPercentage = getDiscountPercentage(price, listingPrice);

  if (cartItemType === "AUTO_FREE_PRODUCT_DISABLED") return null;

  if (isFreeProduct) {
    return (
      <div className="flex items-center gap-1.5 md:gap-2">
        {price > 0 && slug !== "gift" && (
          <Text
            as="span"
            size="sm"
            className="text-gray-600/75 line-through"
            responsive
          >
            ₹{toDecimal(price)}
          </Text>
        )}
        <Text
          size="sm"
          as="p"
          className="h-fit w-fit rounded-md bg-green-500 px-2 py-0.5 text-white-a700_01"
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
      {listingPrice > price && (
        <Text
          as="span"
          size="sm"
          className="text-gray-600/75 line-through"
          responsive
        >
          ₹{toDecimal(listingPrice)}
        </Text>
      )}
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

export default React.memo(ProductPricing);
