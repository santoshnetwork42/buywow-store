"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Button, Heading, Text } from "@/components/elements";
import Slider from "@/components/features/Slider";
import {
  extractAttributes,
  getDiscountPercentage,
  getOfferValue,
} from "@/utils/helpers";
import ProductThumbnail from "@/components/partials/Product/ProductThumbnail";
import AddToCart from "@/components/common/AddToCart";
import { useProduct, useProductVariantGroups } from "@wow-star/utils";
import { twMerge } from "tailwind-merge";

const UpsellProduct = React.memo(({ product, index, text, subText }) => {
  const { fetchedProduct, imageBgColor, slug } = extractAttributes(product);

  const [selectedVariant] = useProductVariantGroups(fetchedProduct);
  const packageProduct = useProduct(fetchedProduct, selectedVariant?.id);

  if (!fetchedProduct || !packageProduct) return null;

  const { price, listingPrice } = packageProduct || {};

  const discount = getDiscountPercentage(price, listingPrice);

  return (
    <Link
      href={`/product/${slug}`}
      className="flex h-full w-[76vw] min-w-[340px] max-w-[360px] gap-3 rounded bg-white-a700 p-2.5 shadow md:p-3"
    >
      <div
        className="flex aspect-[74/80] w-[74px] items-center"
        style={{ backgroundColor: imageBgColor }}
      >
        <ProductThumbnail
          height={100}
          width={200}
          imageKey={packageProduct?.thumbImage?.imageKey}
        />
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <div className="flex flex-1 flex-col">
          <Heading
            as="h4"
            size="base"
            className="line-clamp-1 text-sm font-semibold"
            responsive
          >
            <span className="font-normal">Step {index + 1}:</span>
            {" " + text}
          </Heading>
          <Text as="p" size="sm" className="line-clamp-2" responsive>
            {subText}
          </Text>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center gap-1 md:gap-2">
            <div className="flex shrink items-center gap-1 md:gap-2">
              <Heading as="span" size="lg" className="text-base" responsive>
                ₹{price}
              </Heading>
              <Text
                as="span"
                size="sm"
                className="font-light capitalize line-through"
              >
                ₹{listingPrice}
              </Text>
            </div>
            {discount && (
              <div className="flex h-6 min-w-[62px] items-center justify-center rounded-full bg-lime-50 px-2 text-xs capitalize">
                {discount}% OFF
              </div>
            )}
          </div>
          <AddToCart
            product={packageProduct}
            buttonText={"Add"}
            buttonClassName={"shrink-0 px-3 py-1 text-sm"}
            quantityClassName="grid-cols-[repeat(3,26px)] h-[26px] sm:h-[26px] md:h-[28px] lg:h-[28px] md:grid-cols-[repeat(3,28px)]"
          />
        </div>
      </div>
    </Link>
  );
});

UpsellProduct.displayName = "UpsellProduct";

const UpsellProducts = ({
  title,
  upsellProductsBgColor,
  upsellProductItems,
  endTime,
  isCartUpsell,
}) => {
  const [timeLeft, setTimeLeft] = useState("");

  const bgColorClass = useMemo(() => {
    switch (upsellProductsBgColor) {
      case "LIME":
        return isCartUpsell ? "bg-lime-50" : "bg-gray-50";
      case "BLUE":
        return "bg-blue-50";
      default:
        return "bg-white-a700_01";
    }
  }, [upsellProductsBgColor]);

  const isPaddedColor =
    upsellProductsBgColor === "LIME" || upsellProductsBgColor === "BLUE";

  const shadowClass = useMemo(() => {
    switch (upsellProductsBgColor) {
      case "LIME":
        return "max-sm:shadow-[0_0_0_100vmax_#FBFBF5]";
      case "BLUE":
        return "max-sm:shadow-[0_0_0_100vmax_#E7F0F9]";
      default:
        return "";
    }
  }, [upsellProductsBgColor]);

  useEffect(() => {
    if (!endTime) return;

    const parseTime = (timeString) => {
      const [hours, minutes, seconds] = timeString.split(":").map(Number);
      return hours * 3600 + minutes * 60 + Math.floor(seconds);
    };

    let secondsLeft = parseTime(endTime);

    const calculateTimeLeft = () => {
      if (secondsLeft > 0) {
        const hours = Math.floor(secondsLeft / 3600);
        const minutes = Math.floor((secondsLeft % 3600) / 60);
        const seconds = secondsLeft % 60;
        return `${hours.toString().padStart(2, "0")}h : ${minutes.toString().padStart(2, "0")}m : ${seconds.toString().padStart(2, "0")}s`;
      }
      return "";
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      secondsLeft -= 1;
      setTimeLeft(calculateTimeLeft());
      if (secondsLeft <= 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  if (!Array.isArray(upsellProductItems) || upsellProductItems.length === 0)
    return null;

  if (isCartUpsell && !timeLeft) return null;

  return (
    <div
      className={twMerge(
        "mb-6 flex flex-col justify-center gap-3 px-3 max-sm:[clipPath:inset(0_-100vmax)] sm:rounded-lg md:mb-7 md:px-4",
        shadowClass,
        bgColorClass,
        isPaddedColor ? "py-3" : "",
        isCartUpsell && "rounded-lg",
      )}
    >
      <Heading
        size={isCartUpsell ? "base" : "lg"}
        as="h4"
        className={twMerge(
          "line-clamp-2 w-fit",
          isCartUpsell ? "text-sm" : "text-base",
        )}
        responsive
      >
        <span>{title}</span>
        {timeLeft && (
          <span className="ml-0.5 text-sm font-bold text-yellow-900 lg:text-base">
            {" "}
            {timeLeft}
          </span>
        )}
      </Heading>
      <Slider sliderClassName="gap-2 lg:gap-3 lg:mb-4">
        {upsellProductItems.map((item, index) => (
          <UpsellProduct key={`product-${index}`} {...item} index={index} />
        ))}
      </Slider>
    </div>
  );
};

export default UpsellProducts;
