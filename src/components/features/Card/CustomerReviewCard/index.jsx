"use client";

import React from "react";
import { Button, Text, Heading, Img } from "@/components/common";
import { useDeviceWidth } from "@/utils/useDeviceWidth";

const CustomerReviewCard = ({ reviewData, ...props }) => {
  const width = useDeviceWidth();
  if (!width) return null;

  const { productImage, userInfo, reviewText, skinConcerns, relatedProduct } =
    reviewData;

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
        <Text size="text3xl" as="p" className="!font-medium max-sm:text-sm">
          {userInfo.name}, {userInfo.age} y/o
        </Text>
        <Text size="text3xl" as="p" className="w-full !leading-[140%]">
          {reviewText}
        </Text>
        <div className="flex items-center justify-between gap-5">
          <Text size="text3xl" as="p" className="shrink leading-[140%]">
            <span className="text-xs font-normal text-black-900 lg:text-sm">
              Concern:
            </span>
            <br />
            <span className="text-sm font-medium text-black-900 lg:text-base">
              {skinConcerns.join(", ")}
            </span>
          </Text>
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
            <div className="flex flex-col gap-[6px]">
              <Text as="p" className="line-clamp-1 !text-sm !font-medium">
                {relatedProduct.name}
              </Text>
              <div className="flex items-end justify-between gap-4 md:gap-5 lg:gap-6">
                <div className="flex items-center gap-1">
                  <Heading
                    size="headingmd"
                    as="p"
                    className="!font-semibold capitalize"
                  >
                    {relatedProduct.currentPrice}
                  </Heading>
                  <Text
                    size="textlg"
                    as="p"
                    className="capitalize line-through"
                  >
                    {relatedProduct.originalPrice}
                  </Text>
                </div>
                <Button className="rounded-full bg-yellow-900 px-3 py-1 text-center text-xs font-medium capitalize text-white-a700_01">
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
