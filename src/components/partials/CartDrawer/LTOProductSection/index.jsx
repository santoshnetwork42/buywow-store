"use client";

import { Button, Heading, Text } from "@/components/elements";
import ProductThumbnail from "@/components/partials/Product/ProductThumbnail";
import { useCartDispatch } from "@/store/sagas/dispatch/cart.dispatch";
import { LIMITED_TIME_DEAL_DURATION_IN_MINUTES } from "@/utils/data/constants";
import { getDiscountPercentage, toDecimal } from "@/utils/helpers";
import { getProductMeta } from "@wow-star/utils";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import RemoveButton from "../MainCartSection/ProductItem/RemoveButton";

const Checkmark = dynamic(
  () => import("@/assets/svg/icons").then((mod) => mod.Checkmark),
  { ssr: false },
);

export const LimitedTimeDealProduct = ({
  product,
  parentRecordKey,
  isBought,
  removeFromCart,
  addToCart,
}) => {
  const { slug, listingPrice, recommendPrice, title, images } = product || {};
  const { thumbImage = "" } = getProductMeta(product) || {};
  const productImage = thumbImage?.imageKey || images?.items[0]?.imageKey;
  if (!product?.id) return null;

  const handleAddToCart = () => {
    addToCart({
      ...product,
      qty: 1,
      cartItemSource: "LIMITED_TIME_DEAL",
      parentRecordKey,
      section: {
        id: "LIMITED_TIME_DEAL".toLowerCase().replace(/\ /g, "-"),
        name: "LIMITED_TIME_DEAL",
      },
    });
  };

  const discount = getDiscountPercentage(recommendPrice, listingPrice);

  return (
    <Link
      prefetch={false}
      href={`/product/${slug}`}
      className="relative flex h-full w-full gap-3 rounded-md bg-white-a700 p-2.5 shadow md:p-3"
    >
      {/* <div className="absolute left-2 top-2 z-10 size-8 -translate-x-1/4 -translate-y-1/4 sm:size-9 md:size-10">
        <LimitedTimeDiscount discountAmount={discount} size={40} />
      </div> */}
      <div
        className="flex aspect-[74/80] w-[74px] items-center overflow-hidden rounded"
        style={{ backgroundColor: "rgb(255, 255, 255)" }}
      >
        <ProductThumbnail height={100} width={200} imageKey={productImage} />
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <div className="flex flex-1 flex-col">
          <div className="flex justify-between">
            {" "}
            <Heading
              as="h4"
              size="base"
              className="line-clamp-2 text-sm font-semibold"
              responsive
            >
              {title}
            </Heading>
            {isBought && (
              <RemoveButton onClick={() => removeFromCart(product)} />
            )}
          </div>
          {isBought && (
            <div className="mt-2 flex gap-2">
              <Checkmark className="mt-[3px] size-4" />
              <div className="text-sm font-normal text-green-500">
                Added Successfully
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-between">
          <div className="flex items-center gap-1 md:gap-2">
            <div className="flex shrink items-center gap-1 md:gap-2">
              <Heading as="span" size="lg" className="text-base" responsive>
                ₹{toDecimal(recommendPrice)}
              </Heading>
              {listingPrice > recommendPrice && (
                <Text
                  as="del"
                  size="base"
                  className="text-sm text-gray-500"
                  responsive
                >
                  ₹{toDecimal(listingPrice)}
                </Text>
              )}
              {discount > 0 && (
                <Text
                  size="sm"
                  as="p"
                  className="w-fit rounded-md bg-lime-50 px-2 py-0.5"
                  responsive
                >
                  {discount}% Off
                </Text>
              )}
            </div>
          </div>

          {!isBought && (
            <Button
              variant="primary"
              className={"shrink-0 px-3 py-1 text-sm"}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleAddToCart(e);
              }}
            >
              {"Add"}
            </Button>
          )}
        </div>
      </div>
    </Link>
  );
};
LimitedTimeDealProduct.displayName = "LimitedTimeDealProduct";

const LimitedTimeDealProductSection = ({
  parentRecordKey,
  product,
  addedAt: startTime,
  isBought,
}) => {
  const [timeLeft, setTimeLeft] = useState("");
  const { addToCart, removeFromCart } = useCartDispatch();
  // isBought,timeLeft
  // true =>> not to check
  // false =>> see and then go for limited time deal

  useEffect(() => {
    if (!isBought) {
      // if not bought then go for counter
      const endTime =
        new Date(startTime).getTime() +
        LIMITED_TIME_DEAL_DURATION_IN_MINUTES * 60 * 1000;

      const timer = setInterval(() => {
        const now = new Date().getTime();
        const remainingTime = endTime - now;

        if (remainingTime <= 0) {
          clearInterval(timer);
          setTimeLeft("");
        } else {
          // const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
          const seconds = Math.floor((remainingTime / 1000) % 60);
          setTimeLeft(`${minutes}m : ${seconds}s`);
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [startTime, isBought]);

  // if not bought and timeLeft null
  if (!isBought && !timeLeft) return null;

  return (
    <div
      className={twMerge(
        "mb-6 flex flex-col justify-center px-3 max-sm:[clipPath:inset(0_-100vmax)] sm:rounded-lg md:mb-7 md:px-4",
        "bg-lime-50 py-3 max-sm:shadow-[0_0_0_100vmax_#FBFBF5]",
        "!mb-0 rounded-lg shadow-[0_4px_4px_#0000000D]",
        "mb-1 md:mb-2",
        `${isBought ? "px-3! gap-3" : "px-3! gap-3"}`,
      )}
    >
      {
        <Heading
          size={"base"}
          as="h4"
          className={twMerge("line-clamp-2 w-fit", "text-sm")}
          responsive
        >
          <span className={`${!isBought ? "mb-1" : ""}`}>
            {"Limited Time Deal"}
          </span>
          {!isBought && !!timeLeft && (
            <span className="ml-0.5 text-sm font-bold text-yellow-900 lg:text-base">
              {" "}
              {timeLeft}
            </span>
          )}
        </Heading>
      }
      <LimitedTimeDealProduct
        key={`product-${product?.slug}`}
        product={product}
        parentRecordKey={parentRecordKey}
        isBought={isBought}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
      />
    </div>
  );
};

export default LimitedTimeDealProductSection;
