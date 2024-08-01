"use client";

import React, { useMemo } from "react";
import {
  useProduct,
  useProductCoupons,
  useProductVariantGroups,
} from "@wow-star/utils";
import { extractAttributes, getOfferValue } from "@/utils/helpers";
import ProductHeader from "@/components/partials/Product/ProductHeader";
import PriceSection from "@/components/partials/Product/PriceSection";
import VariantSelector from "@/components/partials/Product/VariantSelector";
import AddToCartSection from "@/components/partials/Product/AddToCartSection";
import ProductImageSection from "@/components/partials/Product/ProductImageSection";
import ProductDetailViewBlocks from "@/components/partials/Product/ProductDetailViewBlocks";

const ProductDetailView = React.memo(({ product }) => {
  const {
    promotionTag,
    productBenefitTags,
    offerTag,
    productDetailView,
    fetchedProduct,
  } = extractAttributes(product?.pdpProduct);

  const [selectedVariant, variantGroup, onVariantChange] =
    useProductVariantGroups(fetchedProduct);
  const packageProduct = useProduct(fetchedProduct, selectedVariant?.id);
  const bestCoupon = useProductCoupons(packageProduct, selectedVariant?.id);

  // console.log("packageProduct", packageProduct);
  // console.log("selectedVariant", selectedVariant);

  const {
    title,
    benefits,
    rating,
    totalRatings,
    listingPrice,
    price,
    hasInventory,
    currentInventory,
    totalOrders,
    images,
  } = packageProduct || {};

  const imageList = useMemo(
    () => images?.items?.sort((a, b) => a.position - b.position) || [],
    [images],
  );

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

  if (!fetchedProduct) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container-main mb-main mt-3 grid w-full grid-cols-1 gap-y-3 sm:gap-y-5 md:mt-4 md:grid-cols-[50%_calc(50%-2.5rem)] md:grid-rows-[auto_auto_1fr] md:gap-x-10 md:gap-y-0 lg:grid-cols-[50%_calc(50%-3rem)] lg:gap-x-12 xl:grid-cols-[50%_calc(50%-4rem)] xl:gap-x-16">
      <div className="relative order-2 md:order-1 md:row-span-3">
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
          totalOrders={totalOrders}
          hasInventory={hasInventory}
          currentInventory={currentInventory}
        />
        <VariantSelector
          variantGroups={variantGroup}
          onVariantChange={onVariantChange}
        />
        <AddToCartSection
          product={packageProduct}
          selectedVariant={selectedVariant}
        />
      </div>

      {productDetailView?.length > 0 && (
        <div className="order-4 mt-3 sm:mt-5 lg:mt-7">
          <ProductDetailViewBlocks blocks={productDetailView} />
        </div>
      )}
    </div>
  );
});

ProductDetailView.displayName = "ProductDetailView";

export default ProductDetailView;
