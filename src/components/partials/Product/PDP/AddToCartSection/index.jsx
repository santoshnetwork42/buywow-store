import { IndiaMapIcon, VehicleIcon } from "@/assets/svg/icons";
import AddToCart from "@/components/common/AddToCart";
import { Img, Text } from "@/components/elements";
import { getDiscountPercentage, toDecimal } from "@/utils/helpers";
import React, { useCallback, useEffect, useState } from "react";

const AddToCartSection = React.memo(({ product, selectedVariant }) => {
  const [isFixed, setIsFixed] = useState(false);

  const { hasInventory, thumbImage, title, price, listingPrice } = product;

  const discountPercentage = getDiscountPercentage(price, listingPrice);

  const checkVisibility = useCallback(() => {
    const element = document.getElementById("main-add-to-cart-section");
    if (element) {
      const rect = element.getBoundingClientRect();
      setIsFixed(rect.bottom < 0);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", checkVisibility);
    return () => window.removeEventListener("scroll", checkVisibility);
  }, [checkVisibility]);

  const renderAddToCartContent = () => (
    <>
      <AddToCart
        product={product}
        selectedVariant={selectedVariant}
        buttonText="Add To Cart"
        buttonClassName="w-full py-3 text-xl md:py-4"
        quantityClassName="flex-1 min-h-full"
        showGoToCart
      />
      <div className="hidden justify-evenly gap-2 md:flex">
        <div className="flex items-center gap-1">
          <VehicleIcon size={24} />
          <Text as="p" size="sm" responsive>
            Ships within 1-2 days
          </Text>
        </div>
        <div className="flex items-center gap-1">
          <IndiaMapIcon size={16} />
          <Text as="p" size="sm" responsive>
            Shipping Across india
          </Text>
        </div>
      </div>
    </>
  );

  const renderOutOfStockContent = () => (
    <>
      <Text as="p" size="2xl" className="mt-2 text-[#b10001]" responsive>
        Temporarily out of stock.
      </Text>
      <Text as="p" size="base" className="font-light text-[#6F4632]" responsive>
        We are working hard to be back in stock as soon as possible
      </Text>
    </>
  );

  return (
    <>
      <div
        id="main-add-to-cart-section"
        className="z-50 flex w-full flex-col gap-2 bg-white-a700_01 md:gap-2.5"
      >
        {hasInventory ? renderAddToCartContent() : renderOutOfStockContent()}
      </div>
      {isFixed && hasInventory && (
        <>
          {/* Mobile fixed bottom bar */}
          <div className="fixed bottom-0 left-0 z-50 w-full border-t bg-white-a700_01 py-3 md:hidden">
            <div className="container-main">
              <AddToCart
                product={product}
                selectedVariant={selectedVariant}
                buttonText="Add To Cart"
                buttonClassName="w-full py-3 text-xl"
                quantityClassName="flex-1 min-h-full"
                showGoToCart
              />
            </div>
          </div>
          {/* Desktop sticky bar */}
          <div className="fixed bottom-0 left-0 z-50 hidden w-full border-t bg-white-a700_01 py-3 shadow-md md:block">
            <div className="container-main flex items-center justify-between gap-8">
              <div className="flex items-center gap-4">
                <div className="size-16 shrink-0 overflow-hidden rounded bg-lime-50">
                  <Img
                    src={thumbImage?.imageKey}
                    alt={title}
                    height={200}
                    width={200}
                    addPrefix
                    className="h-auto w-full object-contain mix-blend-darken"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Text as="h3" size="lg" className="font-semibold">
                    {title}
                  </Text>
                  <div className="flex items-center gap-2">
                    <Text as="p" size="base">
                      ₹{toDecimal(price)}
                    </Text>
                    {listingPrice > price && (
                      <Text
                        as="p"
                        size="sm"
                        className="text-gray-600 line-through"
                      >
                        ₹{toDecimal(listingPrice)}
                      </Text>
                    )}
                    {discountPercentage > 0 && (
                      <Text
                        as="p"
                        size="sm"
                        className="rounded-full bg-lime-100 px-2 py-1 text-[13px] md:font-medium"
                      >
                        {discountPercentage}% Off
                      </Text>
                    )}
                  </div>
                </div>
              </div>
              <div className="h-12 w-[50%] max-w-[500px] shrink-0">
                <AddToCart
                  product={product}
                  selectedVariant={selectedVariant}
                  buttonText="Add To Cart"
                  buttonClassName="w-full py-2 text-lg h-full"
                  quantityClassName="flex-1 min-h-full"
                  showGoToCart
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
});

AddToCartSection.displayName = "AddToCartSection";

export default AddToCartSection;
