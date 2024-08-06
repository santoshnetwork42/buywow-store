import React from "react";
import { VehicleIcon, IndiaMapIcon } from "@/assets/svg/icons";
import { Text } from "@/components/elements";
import AddToCart from "@/components/common/AddToCart";

const AddToCartSection = React.memo(({ product, selectedVariant }) => (
  <div className="max-md:container-main z-50 mt-6 flex w-full flex-col gap-2 bg-white-a700_01 max-md:fixed max-md:bottom-0 max-md:left-0 max-md:border-t max-md:py-3 md:gap-2.5">
    {product?.hasInventory ? (
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
    ) : (
      <>
        <Text as="p" size="2xl" className="mt-2 text-[#b10001]" responsive>
          Temporarily out of stock.
        </Text>
        <Text
          as="p"
          size="base"
          className="font-light text-[#6F4632]"
          responsive
        >
          We are working hard to be back in stock as soon as possible
        </Text>
      </>
    )}
  </div>
));

AddToCartSection.displayName = "AddToCartSection";

export default AddToCartSection;
