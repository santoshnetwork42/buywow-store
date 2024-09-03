"use client";

import AddToCartSection from "@/components/partials/Product/PDP/AddToCartSection";
import OffersAndDiscounts from "@/components/partials/Product/PDP/OffersAndDiscounts";
import PriceSection from "@/components/partials/Product/PDP/PriceSection";
import ProductDetailViewBlocks from "@/components/partials/Product/PDP/ProductDetailViewBlocks";
import ProductHeader from "@/components/partials/Product/PDP/ProductHeader";
import ProductImageSection from "@/components/partials/Product/PDP/ProductImageSection";
import VariantSelector from "@/components/partials/Product/PDP/VariantSelector";
import { useEventsDispatch } from "@/store/sagas/dispatch/events.dispatch";
import { useRecentlyViewedDispatch } from "@/store/sagas/dispatch/recentlyViewed.dispatch";
import { extractAttributes } from "@/utils/helpers";
import {
  useProduct,
  useProductCoupons,
  useProductVariantGroups,
} from "@wow-star/utils";
import { useEffect, useRef } from "react";

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
  const { viewItem } = useEventsDispatch();
  const viewItemEventTriggered = useRef(false);

  useEffect(() => {
    addRecentlyViewedProduct(extractAttributes(product?.pdpProduct));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  useEffect(() => {
    if (fetchedProduct && !viewItemEventTriggered.current) {
      viewItem({
        ...fetchedProduct,
        section: { id: "product-detail", name: "Product Detail" },
      });
      viewItemEventTriggered.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchedProduct]);

  if (!fetchedProduct?.id) {
    return <div>Product not found</div>;
  }

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

  return (
    <div className="container-main mb-main mt-3 grid w-full grid-cols-1 gap-y-3 sm:gap-y-5 md:mt-4 md:grid-cols-[54%_calc(46%-2.5rem)] md:grid-rows-[auto_auto_1fr] md:gap-x-10 md:gap-y-0 lg:grid-cols-[54%_calc(46%-3rem)] lg:gap-x-12 xl:grid-cols-[54%_calc(46%-4rem)] xl:gap-x-16">
      <div className="relative flex flex-col gap-2 md:row-span-3">
        <ProductHeader
          title={title}
          benefits={benefits}
          rating={rating}
          totalRatings={totalRatings}
          className="md:hidden"
        />
        <ProductImageSection
          imageList={imageList}
          promotionTag={promotionTag}
          productBenefitTags={productBenefitTags}
        />
      </div>

      <div className="sticky top-10 z-10 flex flex-col">
        <ProductHeader
          title={title}
          benefits={benefits}
          rating={rating}
          totalRatings={totalRatings}
          className="hidden md:flex"
        />
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
          productId={packageProduct?.id}
        />
        <div className="mt-5 flex flex-col">
          <VariantSelector
            variantGroups={variantGroup}
            onVariantChange={onVariantChange}
          />
          <AddToCartSection
            product={packageProduct}
            selectedVariant={selectedVariant}
          />
          {!!(productDetailView?.length > 0) && (
            <ProductDetailViewBlocks blocks={productDetailView} />
          )}
        </div>
      </div>
    </div>
  );
};

ProductDetailView.displayName = "ProductDetailView";

export default ProductDetailView;
