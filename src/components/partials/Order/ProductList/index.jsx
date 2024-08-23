import { Heading, Img, Text } from "@/components/elements";
import { toDecimal } from "@/utils/helpers";
import Link from "next/link";
import React, { useMemo } from "react";

const ProductItem = React.memo(({ item }) => {
  const { product, variant, quantity, price, cancelledQuantity, thumbImage } =
    item || {};
  const totalPrice = useMemo(
    () => toDecimal((quantity || 0) * (price || 0)),
    [quantity, price],
  );

  return (
    <Link
      className="flex w-full gap-2 rounded-md border p-2 shadow-xs sm:gap-3 sm:p-3 lg:gap-4 lg:p-4"
      href={`/products/${product?.slug || ""}`}
    >
      <div className="aspect-[65/77] w-20 overflow-hidden rounded-md bg-lime-50 sm:w-24 md:aspect-square lg:w-28">
        <Img
          src={thumbImage}
          alt={product?.title || "Product Image"}
          className="aspect-[65/77] h-auto w-full object-contain mix-blend-darken md:aspect-square"
          width={80}
          height={88}
          addPrefix
          isStatic
        />
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex flex-1 justify-between gap-2">
          <div className="flex flex-col gap-1">
            <Text as="p" size="base" className="text-sm" responsive>
              {product?.title || "Untitled Product"}
            </Text>
            <Text
              as="span"
              size="base"
              className="text-sm font-light text-gray-600"
              responsive
            >
              {variant?.title || ""}
            </Text>
          </div>
          <Text as="p" size="lg" className="text-base" responsive>
            ₹{totalPrice}
          </Text>
        </div>
        <Text
          as="p"
          size="base"
          className="mb-1 text-sm font-light text-gray-600 md:mb-2"
          responsive
        >
          Qty: {quantity || cancelledQuantity || 0}
        </Text>
      </div>
    </Link>
  );
});

ProductItem.displayName = "ProductItem";

const ProductList = React.memo(({ productItems }) => {
  return (
    <div className="flex flex-col gap-2 sm:gap-3 lg:gap-4">
      <div className="flex items-center justify-between">
        <Heading as="h3" size="xl" className="text-lg font-medium" responsive>
          PRODUCT DETAILS
        </Heading>
      </div>
      <div className="flex flex-col gap-3 md:gap-4">
        {productItems.map((item) => (
          <ProductItem key={`order-${item.id}`} item={item} />
        ))}
      </div>
    </div>
  );
});

ProductList.displayName = "ProductList";

export default ProductList;
