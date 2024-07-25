"use client";

import React, { useMemo } from "react";
import { IndiaMapIcon, StarIcon, VehicleIcon } from "@/assets/svg/icons";
import { Button, Heading, Text } from "@/components/common";
import HighLights from "@/components/partials/Product/HighLights";
import MetaData from "@/components/partials/Product/MetaData";
import ProductImageSection from "@/components/blocks/ProductDetailView/ProductImageSection";
import { useProduct, useProductVariantGroups } from "@wow-star/utils";
import { extractAttributes, getOfferValue } from "@/utils/helpers";

const ProductDetailView = React.memo(({ product: { pdpProduct } }) => {
  const {
    slug,
    promotionTag,
    productBenefitTags,
    productDetailView,
    fetchedProduct,
  } = extractAttributes(pdpProduct);

  const [selectedVariant] = useProductVariantGroups(fetchedProduct);
  const packageProduct = useProduct(fetchedProduct, selectedVariant?.id);

  const { title, benefits, rating, totalRatings, listingPrice, price } =
    fetchedProduct || {};

  const imageList = packageProduct?.images?.items || [];

  const formattedRating = useMemo(() => rating?.toFixed(1), [rating]);
  const formattedTotalRatings = useMemo(() => {
    if (!totalRatings) return "0";
    return totalRatings > 9999
      ? `${(totalRatings / 1000).toFixed(0)}k+`
      : totalRatings.toString();
  }, [totalRatings]);

  const discountPercentage = useMemo(() => {
    if (price && listingPrice && price < listingPrice) {
      return getOfferValue(price, listingPrice);
    }
    return null;
  }, [price, listingPrice]);

  if (!fetchedProduct) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container-main mb-main mt-3 grid grid-cols-1 gap-y-3 sm:gap-y-5 md:mt-4 md:grid-cols-[52%_1fr] md:gap-x-12 md:gap-y-0 lg:gap-x-14 xl:gap-x-16">
      <div className="order-2 md:order-1 md:row-span-2">
        <ProductImageSection imageList={imageList} />
      </div>

      <div className="order-1 md:order-2">
        <div className="flex flex-col gap-1">
          <Heading className="line-clamp-2 md:text-[28px]" as="p" size="2xl">
            {title}
          </Heading>
          {benefits && (
            <Text
              as="p"
              className="line-clamp-3 font-light"
              size="sm"
              responsive
            >
              {benefits.join(" | ")}
            </Text>
          )}
          <div className="flex items-center gap-1">
            <StarIcon size={14} />
            <Text className="font-light capitalize" size="sm" responsive>
              {formattedRating} ({formattedTotalRatings} reviews)
            </Text>
          </div>
        </div>
      </div>

      <div className="order-3 mt-2 flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2 sm:gap-3 md:justify-normal md:gap-4 lg:gap-5">
          <div className="flex items-center gap-2">
            <Text as="p" size="xl" className="font-semibold md:text-[22px]">
              ₹{price}
            </Text>
            {listingPrice && (
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
                  ₹{listingPrice}
                </Text>
              </div>
            )}
            {discountPercentage && (
              <div className="flex items-center gap-1">
                <Text
                  as="p"
                  size="sm"
                  className="rounded-full bg-lime-100 px-2 py-1 md:font-medium"
                >
                  {discountPercentage}% Off
                </Text>
              </div>
            )}
          </div>
          <Text as="p" size="sm" className="font-light">
            MRP incl. of all taxes
          </Text>
        </div>
        <div className="flex flex-col gap-1">
          <Button className="w-full py-4 sm:py-2">Add To Cart</Button>
          <div className="flex justify-evenly gap-4">
            <div className="flex items-center gap-1">
              <VehicleIcon size={30} />
              <Text as="p" size="sm" responsive={false}>
                Ships within 1-2 days
              </Text>
            </div>
            <div className="flex items-center gap-1">
              <IndiaMapIcon size={22} />
              <Text as="p" size="sm" responsive={false}>
                Shipping Across india
              </Text>
            </div>
          </div>
        </div>
        <HighLights />
        <MetaData />
      </div>
    </div>
  );
});

ProductDetailView.displayName = "ProductDetailView";

export default ProductDetailView;
