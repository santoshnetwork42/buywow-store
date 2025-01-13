import AddToCart from "@/components/common/AddToCart";
import { Button, Text } from "@/components/elements";
import React, { useCallback, useRef } from "react";

const AddToCartSection = React.memo(({ product, selectedVariant }) => {
  const sectionRef = useRef(null);
  const borderRef = useRef(null);

  const { hasInventory, thumbImage, title, price, listingPrice } =
    product || {};

  const renderAddToCartContent = useCallback(
    () => (
      <>
        <AddToCart
          product={product}
          selectedVariant={selectedVariant}
          buttonText="Add To Cart"
          buttonClassName="w-full py-3 md:py-4"
          quantityClassName="flex-1 min-h-full"
          showGoToCart
        />
      </>
    ),
    [product, selectedVariant],
  );

  const renderOutOfStockContent = useCallback(
    () => (
      <>
        <Button
          variant="primary"
          size="none"
          className="h-full w-full bg-gray-400 py-3 text-xl text-white-a700 opacity-100 md:py-4"
          disabled
        >
          Sold Out
        </Button>
        <Text
          as="p"
          size="base"
          className="hidden font-light text-red-600 md:block"
          responsive
        >
          We are working hard to be back in stock as soon as possible
        </Text>
      </>
    ),
    [],
  );

  return (
    <>
      <div ref={borderRef} />
      <div
        ref={sectionRef}
        className="z-50 mb-2 flex w-full flex-col gap-2 bg-white-a700_01 md:static md:gap-2.5 md:border-0 md:py-0"
      >
        {hasInventory ? renderAddToCartContent() : renderOutOfStockContent()}
      </div>
    </>
  );
});

AddToCartSection.displayName = "AddToCartSection";

export default AddToCartSection;
