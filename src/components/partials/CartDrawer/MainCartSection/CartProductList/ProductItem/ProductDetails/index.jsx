import React from "react";
import Link from "next/link";
import { Heading, Text } from "@/components/elements";
import ProductPricing from "@/components/partials/CartDrawer/MainCartSection/CartProductList/ProductItem/ProductDetails/ProductPricing";

const ProductDetails = ({
  title,
  price,
  slug,
  hasInventory,
  currentInventory,
  listingPrice,
  cartItemType,
  isFreeProduct,
  quantity,
  couponMessage,
  handleCartClose,
}) => (
  <div className="flex flex-1 flex-col justify-between gap-1">
    <div className="flex flex-col gap-1">
      <Link href={`/product/${slug}`} onClick={handleCartClose}>
        <Heading size="base" as="h4" className="line-clamp-3" responsive>
          {title}
        </Heading>
      </Link>
      <ProductPricing
        price={price}
        listingPrice={listingPrice}
        cartItemType={cartItemType}
        slug={slug}
      />
    </div>
    {!!hasInventory && currentInventory < 10 && (
      <Text size="xs" as="p" className="line-clamp-1 text-yellow-900">
        Only {currentInventory} left!
      </Text>
    )}
    {!isFreeProduct && !!quantity && (
      <Text size="sm" as="p" className="mb-1 mt-2 text-gray-500" responsive>
        Qty: {quantity}
      </Text>
    )}
    {cartItemType === "AUTO_FREE_PRODUCT_DISABLED" && (
      <Text size="sm" as="p" className="mt-2 text-red-500" responsive>
        {couponMessage}
      </Text>
    )}
  </div>
);

export default React.memo(ProductDetails);
