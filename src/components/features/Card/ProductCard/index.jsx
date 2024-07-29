"use client";

import { Button, Heading, Img, Text } from "@/components/common";
import ProductThumbImage from "@/components/common/ProductThumbImage";
import { cartSagaActions } from "@/store/sagas/sagaActions/cart.actions";
import { extractAttributes, getOfferValue } from "@/utils/helpers";
import Link from "next/link";
import { memo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { twMerge } from "tailwind-merge";

const BenefitTag = memo(({ bgColor, tag }) => (
  <Text
    as="span"
    size="sm"
    className="inline-block h-fit w-fit truncate rounded-[5px] px-2.5 py-[3px] capitalize"
    style={{ backgroundColor: bgColor || "#FFFFFF" }}
    responsive
  >
    {tag}
  </Text>
));

BenefitTag.displayName = "BenefitTag";

const RatingDisplay = memo(({ rating, totalRatings }) => (
  <div className="flex items-center gap-1">
    <div className="flex items-center gap-[3px]">
      <Img
        src="img_star_6.svg"
        width={16}
        height={16}
        alt="Rating stars"
        className="aspect-square w-[12px] sm:w-[14px] lg:w-[16px]"
      />
      <Text as="span" size="sm" className="capitalize" responsive>
        {rating ? rating.toFixed(1) : "N/A"}
      </Text>
    </div>
    <Text as="span" size="sm" className="capitalize" responsive>
      (
      {totalRatings
        ? totalRatings > 9999
          ? `${Math.floor(totalRatings / 1000)}k+`
          : totalRatings
        : 0}{" "}
      reviews)
    </Text>
  </div>
));

RatingDisplay.displayName = "RatingDisplay";

const PriceDisplay = memo(({ price, listingPrice }) => (
  <div className="flex items-center gap-2">
    <div className="flex shrink items-center gap-1 md:gap-2">
      <Heading as="span" size="lg" className="text-base" responsive>
        ₹{price || 0}
      </Heading>
      {listingPrice && (
        <Text
          as="span"
          size="sm"
          className="font-light capitalize line-through"
        >
          ₹{listingPrice}
        </Text>
      )}
    </div>
  </div>
));

PriceDisplay.displayName = "PriceDisplay";

const ProductCard = memo(
  ({
    imageBgColor,
    productBenefitTags,
    promotionTag,
    slug,
    fetchedProduct,
    offerTag,
    className,
  }) => {
    const { listingPrice, price, rating, title, totalRatings, benefits } =
      fetchedProduct;

    const dispatch = useDispatch();

    const addToCartHandler = useCallback(
      (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch({
          type: cartSagaActions.ADD_TO_CART,
          payload: {
            product: fetchedProduct,
          },
        });
      },
      [dispatch, fetchedProduct],
    );

    if (!fetchedProduct) return null;

    return (
      <Link
        href={slug ? `/products/${slug}` : "#"}
        className={twMerge(
          `flex h-full flex-col justify-start gap-2 self-stretch rounded-lg p-[5px] shadow-xs md:gap-3 md:p-2`,
          className,
        )}
      >
        <div
          className="relative overflow-hidden rounded-lg p-0.5 sm:p-1 md:p-2 lg:p-3 xl:p-4"
          style={{ backgroundColor: imageBgColor || "#FFFFFF" }}
        >
          <ProductThumbImage
            width={500}
            height={550}
            fetchedProduct={fetchedProduct}
            className="aspect-[165/190] w-full object-contain lg:aspect-[300/330]"
            isStatic
            alt="Product Image"
          />
          {promotionTag?.data &&
            (() => {
              const { tag, bgColor } = extractAttributes(promotionTag);
              return (
                <Text
                  as="span"
                  size="sm"
                  className="absolute left-1 top-1 z-10 rounded px-2 py-1 text-white-a700 sm:left-1.5 sm:top-1.5 md:left-2 md:top-2 md:px-3 lg:left-2.5 lg:top-2.5"
                  responsive
                  style={{ backgroundColor: bgColor || "#DD8434" }}
                >
                  {tag}
                </Text>
              );
            })()}
          {offerTag?.showOfferTag && price < listingPrice && (
            <Text
              as="span"
              size="sm"
              className="absolute right-1 top-1 z-10 rounded bg-lime-50 px-2 py-1 text-center capitalize sm:right-1.5 sm:top-1.5 md:right-2 md:top-2 md:px-3 lg:right-2.5 lg:top-2.5"
              responsive
              style={{ backgroundColor: offerTag?.bgColor || "#DD8434" }}
            >
              {getOfferValue(price, listingPrice)}% OFF
            </Text>
          )}
        </div>

        <div className="flex max-h-12 flex-wrap gap-[4px] overflow-hidden md:max-h-[52px]">
          {productBenefitTags?.data?.map((benefitTag, index) => (
            <BenefitTag key={index} {...benefitTag.attributes} />
          ))}
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <div className="flex flex-1 flex-col">
            <Heading
              as="h3"
              size="xl"
              className="line-clamp-2 w-full"
              responsive
            >
              {title}
            </Heading>
            <Text
              as="p"
              size="sm"
              className="line-clamp-3 w-full font-light"
              responsive
            >
              {benefits && benefits.length > 0
                ? benefits.join(" | ")
                : "No benefits listed"}
            </Text>
          </div>
          <div className="flex flex-col justify-between gap-1">
            <RatingDisplay rating={rating} totalRatings={totalRatings} />
            <div className="flex flex-1 justify-between">
              <PriceDisplay price={price} listingPrice={listingPrice} />
              <Button
                variant="primary"
                size="medium"
                className="shrink-0 text-sm md:text-base lg:text-lg"
                onClick={addToCartHandler}
              >
                Add
              </Button>
            </div>
          </div>
        </div>
      </Link>
    );
  },
);

ProductCard.displayName = "ProductCard";

export default ProductCard;
