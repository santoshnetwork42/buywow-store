"use client";

import AddToCart from "@/components/common/AddToCart";
import { Heading, Img, Text } from "@/components/elements";
import ProductThumbnail from "@/components/partials/Product/ProductThumbnail";
import { useIsInteractive } from "@/utils/context/navbar";
import {
  extractAttributes,
  formatTotalRatings,
  getDiscountPercentage,
  toDecimal,
} from "@/utils/helpers";
import { useProduct, useProductVariantGroups } from "@wow-star/utils";
import Link from "next/link";
import { memo, useEffect } from "react";
import { twMerge } from "tailwind-merge";

const BenefitTag = memo(({ bgColor, tag }) => {
  if (!tag) return null;
  return (
    <Text
      as="span"
      size="sm"
      className="inline-block h-fit w-fit truncate rounded-[5px] px-2.5 py-[3px] capitalize"
      style={{ backgroundColor: bgColor || "#FFFFFF" }}
      responsive
    >
      {tag}
    </Text>
  );
});

const RatingDisplay = memo(({ rating, totalRatings }) => {
  if (!(totalRatings > 0)) return null;
  return (
    <div className="flex items-center gap-1">
      <Img
        src="img_star.svg"
        width={16}
        height={16}
        alt="Rating stars"
        className="aspect-square w-[12px] sm:w-[14px] lg:w-[16px]"
        isStatic
      />
      <Text as="span" size="sm" className="capitalize" responsive>
        {toDecimal(rating, 2)}
      </Text>
      <Text as="span" size="sm" className="capitalize" responsive>
        ({formatTotalRatings(totalRatings)}) reviews
      </Text>
    </div>
  );
});

const PriceDisplay = memo(({ price, listingPrice }) => {
  if (!price) return null;
  return (
    <div className="flex shrink items-center gap-1">
      <Heading as="span" size="lg" className="text-base" responsive>
        ₹{toDecimal(price)}
      </Heading>
      {listingPrice > price && (
        <Text
          as="span"
          size="sm"
          className="font-light capitalize line-through"
        >
          ₹{toDecimal(listingPrice)}
        </Text>
      )}
    </div>
  );
});

const ProductCard = memo(
  ({
    imageBgColor,
    productBenefitTags,
    promotionTag,
    parentPromotionTag,
    slug,
    fetchedProduct,
    offerTag,
    className,
    image,
    showBenefitTags = true,
    sendProductDataToParent,
  }) => {
    const isInteractive = useIsInteractive();
    const [selectedVariant] = useProductVariantGroups(fetchedProduct);
    const packageProduct = useProduct(fetchedProduct, selectedVariant?.id);

    const {
      listingPrice,
      price,
      rating,
      title,
      totalRatings,
      benefits,
      thumbImage,
    } = packageProduct || {};

    useEffect(() => {
      if (packageProduct && sendProductDataToParent) {
        const productDetail = {
          packageProduct,
          selectedVariantId: selectedVariant?.id,
        };
        sendProductDataToParent(productDetail);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedVariant?.id]);

    const discountPercentage = getDiscountPercentage(price, listingPrice);

    const { url } = extractAttributes(image);

    if (!fetchedProduct?.id || !packageProduct) return null;

    return (
      <Link
        prefetch={false}
        href={`/products/${slug || packageProduct?.slug || "#"}`}
        className={twMerge(
          `flex h-full flex-col justify-start gap-2 self-stretch rounded-lg p-[5px] shadow-xs md:gap-3 md:p-2`,
          className,
        )}
      >
        <div
          className="relative overflow-hidden rounded-lg"
          style={{ backgroundColor: imageBgColor || "#F7F7E7" }}
        >
          <ProductThumbnail
            width={500}
            height={550}
            url={url}
            imageKey={thumbImage?.imageKey}
            className="aspect-[165/190] w-full object-contain lg:aspect-[300/330]"
            alt={title || "Product image"}
          />
          {!!parentPromotionTag?.data
            ? (() => {
                const { tag, bgColor } = extractAttributes(parentPromotionTag);
                return (
                  <Text
                    as="span"
                    size="sm"
                    className={`absolute left-1.5 top-1.5 z-10 rounded px-2 py-1 capitalize text-white-a700 md:left-2.5 md:top-2.5 md:px-3 ${!!offerTag?.showOfferTag && discountPercentage > 0 && "max-w-[50%]"}`}
                    responsive
                    style={{ backgroundColor: bgColor || "#DD8434" }}
                  >
                    {tag}
                  </Text>
                );
              })()
            : !!promotionTag?.data &&
              (() => {
                const { tag, bgColor } = extractAttributes(promotionTag);
                return (
                  <Text
                    as="span"
                    size="sm"
                    className={`absolute left-1.5 top-1.5 z-10 rounded px-2 py-1 capitalize text-white-a700 md:left-2.5 md:top-2.5 md:px-3 ${!!offerTag?.showOfferTag && discountPercentage > 0 && "max-w-[50%]"}`}
                    responsive
                    style={{ backgroundColor: bgColor || "#DD8434" }}
                  >
                    {tag}
                  </Text>
                );
              })()}
          {!!offerTag?.showOfferTag && discountPercentage > 0 && (
            <Text
              as="span"
              size="sm"
              className="absolute right-1.5 top-1.5 z-10 rounded px-2 py-1 capitalize md:right-2.5 md:top-2.5 md:px-3"
              responsive
              style={{ backgroundColor: offerTag?.bgColor || "#DD8434" }}
            >
              {discountPercentage}% OFF
            </Text>
          )}
        </div>

        {!!showBenefitTags && productBenefitTags?.data?.length > 0 && (
          <div className="flex max-h-12 flex-wrap gap-[4px] overflow-hidden md:max-h-[52px]">
            {productBenefitTags?.data?.slice(0, 2).map((benefitTag, index) => (
              <BenefitTag key={index} {...benefitTag.attributes} />
            ))}
          </div>
        )}

        <div className="flex flex-1 flex-col gap-2">
          <div className="flex flex-1 flex-col gap-1">
            <Heading
              as="h3"
              size="xl"
              className="line-clamp-2 w-full"
              title={title}
              responsive
            >
              {title}
            </Heading>
            {!!benefits?.length && (
              <Text
                as="p"
                size="sm"
                className="line-clamp-3 w-full font-light"
                responsive
              >
                {benefits.join(" | ")}
              </Text>
            )}
          </div>
          {isInteractive && (
            <div className="flex flex-col gap-2">
              <RatingDisplay rating={rating} totalRatings={totalRatings} />
              <div className="flex items-center justify-between gap-1">
                <PriceDisplay price={price} listingPrice={listingPrice} />
                <AddToCart
                  product={packageProduct}
                  selectedVariant={selectedVariant}
                  buttonText="Add"
                  buttonSize="medium"
                  quantityClassName="grid-cols-[repeat(3,24px)] sm:grid-cols-[repeat(3,32px)] lg:grid-cols-[repeat(3,36px)] h-8"
                  buttonClassName="text-base rounded-md w-16 h-8 sm:h-auto"
                />
              </div>
            </div>
          )}
        </div>
      </Link>
    );
  },
);

RatingDisplay.displayName = "RatingDisplay";
PriceDisplay.displayName = "PriceDisplay";
BenefitTag.displayName = "BenefitTag";
ProductCard.displayName = "ProductCard";

export default ProductCard;
