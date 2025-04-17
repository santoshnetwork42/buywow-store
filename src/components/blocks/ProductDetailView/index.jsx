"use client";

import { Text } from "@/components/elements";
import AddToCartSection from "@/components/partials/Product/PDP/AddToCartSection";
import PriceSection from "@/components/partials/Product/PDP/PriceSection";
import ProductHeader from "@/components/partials/Product/PDP/ProductHeader";
import ProductImageSection from "@/components/partials/Product/PDP/ProductImageSection";
import { useEventsDispatch } from "@/store/sagas/dispatch/events.dispatch";
import { useRecentlyViewedDispatch } from "@/store/sagas/dispatch/recentlyViewed.dispatch";
import { useStoreConfig } from "@/utils/context/navbar";
import { PDP_BLOCK_PROMOTION_TAG_TO_IGNORE } from "@/utils/data/constants";
import handleRedirect from "@/utils/handleRedirect";
import { extractAttributes } from "@/utils/helpers";
import { getPublicImageURL } from "@/utils/helpers/img-loader";
import {
  useProduct,
  useProductCoupons,
  useProductVariantGroups,
} from "@wow-star/utils-cms";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";

const VariantSelector = dynamic(
  () => import("@/components/partials/Product/PDP/VariantSelector"),
  { ssr: false },
);

const ProductDetailViewBlocks = dynamic(
  () => import("@/components/partials/Product/PDP/ProductDetailViewBlocks"),
  { ssr: false },
);

const OffersAndDiscounts = dynamic(
  () => import("@/components/partials/Product/PDP/OffersAndDiscounts"),
  { ssr: false },
);

const ProductDetailView = ({ product, marketPlaceLinks }) => {
  const {
    promotionTag,
    productBenefitTags,
    offerTag,
    productDetailView,
    fetchedProduct,
    slug,
  } = extractAttributes(product?.pdpProduct);

  const { addRecentlyViewedProduct } = useRecentlyViewedDispatch();
  const [selectedVariant, variantGroup, onVariantChange] =
    useProductVariantGroups(fetchedProduct);
  const packageProduct = useProduct(fetchedProduct, selectedVariant?.id);
  const bestCoupon = useProductCoupons(packageProduct, selectedVariant?.id);
  const { viewItemEvent, productViewedKwikpassEvent } = useEventsDispatch();

  const storeConfig = useStoreConfig();
  const { data: storeConfigData } = storeConfig;

  const { tag, bgColor } = extractAttributes(
    storeConfigData?.attributes?.promotion_tag,
  );

  useEffect(() => {
    addRecentlyViewedProduct(extractAttributes(product?.pdpProduct));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  useEffect(() => {
    if (fetchedProduct) {
      viewItemEvent({
        ...fetchedProduct,
        section: { id: "product-detail", name: "Product Detail" },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchedProduct]);

  //  kwikpass event useEffect
  useEffect(() => {
    const { id, price, title, slug, images } = packageProduct;

    const imageUrl = getPublicImageURL({
      key:
        selectedVariant?.images?.items?.[0]?.imageKey ||
        images?.items?.[0]?.imageKey,
    });
    const timeoutId = setTimeout(() => {
      productViewedKwikpassEvent({
        productId: id,
        slug,
        title,
        price,
        variantId: selectedVariant?.id || "",
        imageUrl,
      });
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [selectedVariant, slug]);

  if (!fetchedProduct?.id) {
    handleRedirect(`/products/${slug}`);
    return null;
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
    <div className="container-main mb-main mt-2 grid w-full grid-cols-1 gap-y-1 sm:gap-y-5 md:mt-4 md:grid-cols-[54%_calc(46%-2.5rem)] md:grid-rows-[auto_auto_1fr] md:gap-x-10 md:gap-y-0 lg:grid-cols-[54%_calc(46%-3rem)] lg:gap-x-12 xl:grid-cols-[54%_calc(46%-4rem)] xl:gap-x-16">
      <div className="relative flex flex-col gap-2 md:row-span-3">
        {tag && !PDP_BLOCK_PROMOTION_TAG_TO_IGNORE.includes(slug) && (
          <div className="w-max md:hidden">
            {/* Have added it for temporary purpose, remove once feature is ready */}
            <Text
              as="span"
              size="sm"
              className={`rounded-md p-1 px-2 capitalize text-white-a700`}
              responsive
              style={{ backgroundColor: bgColor || "#DD8434" }}
            >
              {tag}
            </Text>
          </div>
        )}
        <ProductHeader
          title={`${title}${selectedVariant?.id ? ` - ${selectedVariant?.label}` : ""}`}
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
        {tag && !PDP_BLOCK_PROMOTION_TAG_TO_IGNORE.includes(slug) && (
          <div className="mb-1 hidden w-max md:block">
            {/* Have added it for temporary purpose, remove once feature is ready */}
            <Text
              as="span"
              size="sm"
              className={`rounded-md p-1 px-2 capitalize text-white-a700`}
              responsive
              style={{ backgroundColor: bgColor || "#DD8434" }}
            >
              {tag}
            </Text>
          </div>
        )}
        <ProductHeader
          title={`${title}${selectedVariant?.id ? ` - ${selectedVariant?.label}` : ""}`}
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
        {!marketPlaceLinks?.length && (
          <OffersAndDiscounts
            bestCoupon={bestCoupon}
            price={price}
            hasInventory={hasInventory}
            product={{
              id: packageProduct?.id,
              collections: packageProduct?.collections,
            }}
          />
        )}
        <div className="mt-5 flex flex-col">
          {!!variantGroup?.length && (
            <VariantSelector
              variantGroups={variantGroup}
              onVariantChange={onVariantChange}
            />
          )}
          <AddToCartSection
            product={packageProduct}
            selectedVariant={selectedVariant}
            marketPlaceLinks={marketPlaceLinks}
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
