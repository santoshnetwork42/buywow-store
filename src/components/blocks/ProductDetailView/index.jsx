"use client";

import AddToCartSection from "@/components/partials/Product/PDP/AddToCartSection";
import OffersAndDiscounts from "@/components/partials/Product/PDP/OffersAndDiscounts";
import PriceSection from "@/components/partials/Product/PDP/PriceSection";
import ProductDetailViewBlocks from "@/components/partials/Product/PDP/ProductDetailViewBlocks";
import ProductHeader from "@/components/partials/Product/PDP/ProductHeader";
import ProductImageSection from "@/components/partials/Product/PDP/ProductImageSection";
import VariantSelector from "@/components/partials/Product/PDP/VariantSelector";
import { useRecentlyViewedDispatch } from "@/store/sagas/dispatch/recentlyViewed.dispatch";
import { extractAttributes } from "@/utils/helpers";
import {
  useProduct,
  useProductCoupons,
  useProductVariantGroups,
} from "@wow-star/utils";
import { useEffect } from "react";

const ProductDetailView = ({ product }) => {
  const {
    promotionTag,
    productBenefitTags,
    offerTag,
    productDetailView,
    fetchedProduct,
  } = extractAttributes(product?.pdpProduct);

  const { addRecentlyViewedProduct } = useRecentlyViewedDispatch();
  const [selectedVariant, variantGroup, onVariantChange] =
    useProductVariantGroups(fetchedProduct);
  const packageProduct = useProduct(fetchedProduct, selectedVariant?.id);
  const bestCoupon = useProductCoupons(packageProduct, selectedVariant?.id);

  useEffect(() => {
    addRecentlyViewedProduct(extractAttributes(product?.pdpProduct));
  }, [product]);

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

  const imageList = images?.items
    ? [...images.items].sort((a, b) => a.position - b.position)
    : [];

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
          rating={rating}
          totalRatings={totalRatings}
        />
      </div>

      <div className="order-3 mt-2 flex flex-col">
        <PriceSection
          price={price}
          listingPrice={listingPrice}
          offerTag={offerTag}
          totalOrders={totalOrders}
          hasInventory={hasInventory}
          currentInventory={currentInventory}
        />
        <OffersAndDiscounts
          bestCoupon={bestCoupon}
          price={price}
          hasInventory={hasInventory}
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

      {!!(productDetailView?.length > 0) && (
        <div className="order-4 mt-3 sm:mt-5 lg:mt-7">
          <ProductDetailViewBlocks blocks={productDetailView} />
        </div>
      )}
    </div>
  );
};

ProductDetailView.displayName = "ProductDetailView";

export default ProductDetailView;
