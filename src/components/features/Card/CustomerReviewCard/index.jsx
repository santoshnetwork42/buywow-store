"use client";

import React from "react";
import { Button, Text, Heading, Img } from "@/components/common";
import { useDeviceWidth } from "@/hooks/useDeviceWidth";

const CustomerReviewCard = ({ reviewData, ...props }) => {
  const width = useDeviceWidth();
  if (!width) return null;

  if (!reviewData) return null;

  const { productImage, userInfo, reviewText, skinConcerns, relatedProduct } =
    reviewData;

  if (
    !productImage ||
    !userInfo ||
    !reviewText ||
    !skinConcerns ||
    !relatedProduct
  ) {
    return null;
  }

  if (
    !relatedProduct.image ||
    !relatedProduct.name ||
    !relatedProduct.currentPrice ||
    !relatedProduct.originalPrice ||
    !relatedProduct.addToCartText
  ) {
    return null;
  }

  const imageSource = width < 576 ? productImage.mobile : productImage.desktop;

  return (
    <div {...props} className={`${props.className} flex flex-col`}>
      <Img
        src={imageSource.src}
        width={imageSource.width}
        height={imageSource.height}
        alt={productImage.alt}
        className={`w-full rounded object-contain sm:rounded-md lg:rounded-lg ${imageSource.aspectRatio}`}
      />
      <div className="flex flex-col gap-2 md:gap-3">
        <Heading size="base" as="h4" className="text-sm" responsive>
          {userInfo.name}, {userInfo.age} y/o
        </Heading>
        <Text size="base" as="p" className="w-full" responsive>
          {reviewText}
        </Text>
        <div className="flex items-center justify-between gap-5">
          <div className="shrink">
            <Text size="sm" as="p" responsive>
              Concern:
            </Text>
            <Heading size="base" as="h5" className="text-sm" responsive>
              {Array.isArray(skinConcerns)
                ? skinConcerns.join(", ")
                : skinConcerns}
            </Heading>
          </div>
          <div className="flex items-center justify-center gap-2 rounded bg-lime-100_01 p-2">
            <div className="flex aspect-square w-[48px] shrink-0 flex-col items-center justify-center rounded bg-white-a700_01 md:aspect-[48/56]">
              <Img
                src={relatedProduct.image.src}
                width={relatedProduct.image.width}
                height={relatedProduct.image.height}
                alt={relatedProduct.image.alt}
                className="rounded-sm object-contain"
              />
            </div>
            <div className="flex flex-col gap-1">
              <Heading as="h5" size="sm" className="line-clamp-1">
                {relatedProduct.name}
              </Heading>
              <div className="flex items-end justify-between gap-4 md:gap-5 lg:gap-6">
                <div className="flex items-center gap-1">
                  <Text size="sm" as="p" className="!font-semibold capitalize">
                    {relatedProduct.currentPrice}
                  </Text>
                  <Text size="xs" as="p" className="capitalize line-through">
                    {relatedProduct.originalPrice}
                  </Text>
                </div>
                <Button className="rounded-full bg-yellow-900 px-3 py-1 text-center text-xs font-medium capitalize text-white-a700_01 sm:text-sm lg:text-sm">
                  {relatedProduct.addToCartText}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerReviewCard;
