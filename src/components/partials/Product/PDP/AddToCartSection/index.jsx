import { IndiaMapIcon, VehicleIcon } from "@/assets/svg/icons";
import AddToCart from "@/components/common/AddToCart";
import { Button, Img, Text } from "@/components/elements";
import { getDiscountPercentage, toDecimal } from "@/utils/helpers";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

const AddToCartSection = React.memo(({ product, selectedVariant }) => {
  const [isFixed, setIsFixed] = useState(false);
  const sectionRef = useRef(null);
  const originalPositionRef = useRef(null);
  const borderRef = useRef(null);

  const { hasInventory, thumbImage, title, price, listingPrice } = product;

  const discountPercentage = getDiscountPercentage(price, listingPrice);

  const checkVisibility = useCallback(() => {
    if (window.innerWidth < 768) {
      if (borderRef.current) {
        setIsFixed(
          borderRef.current.getBoundingClientRect().top <
            window.innerHeight - 49 - 11,
        );
      }
    } else {
      if (sectionRef.current) {
        setIsFixed(sectionRef.current.getBoundingClientRect().bottom < 0);
      }
    }
  }, []);

  useEffect(() => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      originalPositionRef.current =
        rect.bottom + window.scrollY - windowHeight + 12;
    }

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
      {/* <Text as="p" size="2xl" className="text-[#b10001]" responsive>
        Temporarily out of stock.
      </Text>
      <Text as="p" size="base" className="font-light text-[#6F4632]" responsive>
        We are working hard to be back in stock as soon as possible
      </Text> */}
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
  );

  return (
    <>
      <div ref={borderRef} />
      <div
        ref={sectionRef}
        className={twMerge(
          `z-50 mb-6 flex w-full flex-col gap-2 bg-white-a700_01 md:static md:mb-7 md:gap-2.5 md:border-0 md:py-0`,
          isFixed
            ? "container-main fixed bottom-0 left-0 mb-0 border-t py-3"
            : "",
        )}
      >
        {hasInventory ? renderAddToCartContent() : renderOutOfStockContent()}
      </div>

      {/* Desktop sticky bar */}
      {isFixed && hasInventory && (
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
      )}
    </>
  );
});

AddToCartSection.displayName = "AddToCartSection";

export default AddToCartSection;
