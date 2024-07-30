"use client";

import React, { useMemo, useCallback, useState, useEffect } from "react";
import { IndiaMapIcon, StarIcon, VehicleIcon } from "@/assets/svg/icons";
import { Button, Heading, Img, Text } from "@/components/elements";
import { useProduct, useProductVariantGroups } from "@wow-star/utils";
import { extractAttributes, getOfferValue } from "@/utils/helpers";
import dynamic from "next/dynamic";

const ProductImageSection = dynamic(
  () => import("@/components/partials/Product/ProductImageSection"),
);
const ProductDetailViewBlocks = dynamic(
  () => import("@/components/partials/Product/ProductDetailViewBlocks"),
);

const ProductDetailView = React.memo(({ product }) => {
  const {
    slug,
    promotionTag,
    productBenefitTags,
    offerTag,
    productDetailView,
    fetchedProduct,
  } = extractAttributes(product?.pdpProduct);

  const [defaultVariant, variantGroup] =
    useProductVariantGroups(fetchedProduct);
  const [selectedVariantId, setSelectedVariantId] = useState(null);

  useEffect(() => {
    if (defaultVariant?.id) {
      setSelectedVariantId(defaultVariant.id);
    }
  }, [defaultVariant]);

  const packageProduct = useProduct(fetchedProduct, selectedVariantId);

  const {
    title,
    benefits,
    rating,
    totalRatings,
    listingPrice,
    price,
    variants,
  } = packageProduct || {};

  const imageList = packageProduct?.images?.items || [];

  const formattedRating = useMemo(() => rating?.toFixed(1) || "0.0", [rating]);
  const formattedTotalRatings = useMemo(() => {
    if (!totalRatings) return "0";
    return totalRatings > 9999
      ? `${Math.floor(totalRatings / 1000)}k+`
      : totalRatings.toString();
  }, [totalRatings]);

  const discountPercentage = useMemo(() => {
    if (
      offerTag?.showOfferTag &&
      price &&
      listingPrice &&
      price < listingPrice
    ) {
      return getOfferValue(price, listingPrice);
    }
    return null;
  }, [price, listingPrice, offerTag]);

  const handleAddToCart = useCallback(() => {
    // Implement add to cart functionality
    console.log("Add to cart clicked");
  }, []);

  const handleVariantSelect = useCallback((variantId) => {
    setSelectedVariantId(variantId);
  }, []);

  if (!fetchedProduct) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container-main mb-main mt-3 grid w-full grid-cols-1 gap-y-3 sm:gap-y-5 md:mt-4 md:grid-cols-[50%_calc(50%-2.5rem)] md:grid-rows-[auto_auto_1fr] md:gap-x-10 md:gap-y-0 lg:grid-cols-[50%_calc(50%-3rem)] lg:gap-x-12 xl:grid-cols-[50%_calc(50%-4rem)] xl:gap-x-16">
      <div className="order-2 md:order-1 md:row-span-3">
        <ProductImageSection
          imageList={imageList}
          promotionTag={promotionTag}
          productBenefitTags={productBenefitTags}
        />
      </div>

      <div className="order-1 md:order-2">
        <ProductHeader
          title={title}
          benefits={benefits}
          formattedRating={formattedRating}
          formattedTotalRatings={formattedTotalRatings}
        />
      </div>

      <div className="order-3 mt-2 flex flex-col">
        <PriceSection
          price={price}
          listingPrice={listingPrice}
          discountPercentage={discountPercentage}
        />
        <VariantSelector
          variants={variants?.items}
          fetchedProduct={fetchedProduct}
          selectedVariantId={selectedVariantId}
          onVariantSelect={handleVariantSelect}
        />
        <AddToCartSection onAddToCart={handleAddToCart} />
      </div>

      {productDetailView?.length > 0 && (
        <div className="order-4 mt-3 sm:mt-5 lg:mt-7">
          <ProductDetailViewBlocks blocks={productDetailView} />
        </div>
      )}
    </div>
  );
});

const ProductHeader = React.memo(
  ({ title, benefits, formattedRating, formattedTotalRatings }) => (
    <div className="flex flex-col gap-1">
      <Heading className="line-clamp-2 md:text-[28px]" as="p" size="2xl">
        {title}
      </Heading>
      {benefits && (
        <Text as="p" className="line-clamp-3 font-light" size="sm" responsive>
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
  ),
);

const PriceSection = React.memo(
  ({ price, listingPrice, discountPercentage }) => (
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
          <Text
            as="p"
            size="sm"
            className="rounded-full bg-lime-100 px-2 py-1 md:font-medium"
          >
            {discountPercentage}% Off
          </Text>
        )}
      </div>
      <Text as="p" size="sm" className="font-light" responsive>
        MRP incl. of all taxes
      </Text>
    </div>
  ),
);

const VariantSelector = React.memo(
  ({ variants, fetchedProduct, selectedVariantId, onVariantSelect }) => {
    const sortedVariants = useMemo(() => {
      return [...variants].sort((a, b) => {
        const priceA = a.price || 0;
        const priceB = b.price || 0;
        return priceA - priceB;
      });
    }, [variants]);

    if (!variants || variants.length === 0) return null;

    return (
      <div className="mt-5 flex flex-col gap-2">
        <Heading as="h5" size="base">
          Select Pack
        </Heading>
        <div className="flex flex-wrap gap-2 md:gap-3">
          {sortedVariants.map((variant) => (
            <VariantItem
              key={variant.id}
              variant={variant}
              fetchedProduct={fetchedProduct}
              isSelected={selectedVariantId === variant.id}
              onSelect={() => onVariantSelect(variant.id)}
            />
          ))}
        </div>
      </div>
    );
  },
);

const VariantItem = React.memo(
  ({ variant, fetchedProduct, isSelected, onSelect }) => {
    const variantProduct = useProduct(fetchedProduct, variant.id);

    if (!variantProduct) return null;

    const { title, price, listingPrice, brand } = variantProduct;

    return (
      <div
        className={`flex max-w-[112px] flex-col gap-2 rounded bg-orange-50_01 p-1.5 sm:max-w-[130px] md:p-2 ${isSelected ? "border-2 border-black-900" : ""}`}
        onClick={onSelect}
      >
        <div className="aspect-[114/92] rounded bg-white-a700">
          <Img
            src={variantProduct?.thumbImage?.imageKey}
            width={300}
            height={300}
            alt={title}
            addPrefix
            isStatic
            className="aspect-[114/92] h-auto w-full object-contain p-1"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="">
            <Heading as="h6" size="sm" className="line-clamp-1 break-all">
              {title}
            </Heading>
            <Text as="p" size="xs" className="line-clamp-1 break-all">
              {brand}
            </Text>
          </div>
          <div className="">
            <div className="flex items-center gap-1">
              <Heading as="h6" size="sm" className="font-semibold">
                ₹{price}
              </Heading>
              {listingPrice && (
                <Text as="p" size="xs" className="line-through">
                  ₹{listingPrice}
                </Text>
              )}
            </div>
            {price < listingPrice && (
              <Text as="p" size="xs" className="font-semibold">
                Save ₹{listingPrice - price}
              </Text>
            )}
          </div>
        </div>
      </div>
    );
  },
);

const AddToCartSection = React.memo(({ onAddToCart }) => (
  <div className="mt-6 flex flex-col gap-2 md:gap-2.5">
    <Button className="w-full py-4" variant="primary" onClick={onAddToCart}>
      <Heading
        size="xl"
        as="h3"
        className="text-lg text-white-a700_01"
        responsive
      >
        Add to cart
      </Heading>
    </Button>
    <div className="flex justify-evenly gap-2">
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
  </div>
));

ProductDetailView.displayName = "ProductDetailView";
ProductHeader.displayName = "ProductHeader";
PriceSection.displayName = "PriceSection";
VariantSelector.displayName = "VariantSelector";
VariantItem.displayName = "VariantItem";
AddToCartSection.displayName = "AddToCartSection";

export default ProductDetailView;
