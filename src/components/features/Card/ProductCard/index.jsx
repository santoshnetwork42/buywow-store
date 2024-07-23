import React, { memo } from "react";
import Link from "next/link";
import { Button, Text, Heading, Img } from "@/components/common";
import { getOfferValue } from "@/utils/helpers";

const BenefitTag = memo(({ bgColor, tag }) => (
  <Text
    as="span"
    size="sm"
    className="inline-block h-fit w-fit truncate rounded-[5px] px-2.5 py-[3px] capitalize"
    style={{ backgroundColor: bgColor }}
    responsive
  >
    {tag + tag}
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
        {rating.toFixed(1)}
      </Text>
    </div>
    <Text as="span" size="sm" className="capitalize" responsive>
      (
      {totalRatings > 9999
        ? (totalRatings / 1000).toFixed(0) + "k+"
        : totalRatings}{" "}
      reviews)
    </Text>
  </div>
));

RatingDisplay.displayName = "RatingDisplay";

const PriceDisplay = memo(({ price, listingPrice }) => (
  <div className="flex items-center gap-2">
    <div className="flex shrink items-center gap-1 md:gap-2">
      <Heading as="span" size="lg" className="text-base" responsive>
        ₹{price}
      </Heading>
      <Text as="span" size="sm" className="font-light capitalize line-through">
        ₹{listingPrice}
      </Text>
    </div>
    {price < listingPrice && (
      <div className="hidden h-6 min-w-[62px] items-center justify-center rounded-sm bg-lime-50 px-2 text-center text-xs capitalize text-black-900 md:flex">
        {getOfferValue(price, listingPrice)}% OFF
      </div>
    )}
  </div>
));

PriceDisplay.displayName = "PriceDisplay";

const ProductCard = memo(
  ({ imageBgColor, productBenefitTags, slug, fetchedProduct, className }) => {
    const { listingPrice, price, rating, title, totalRatings, benefits } =
      fetchedProduct;

    return (
      <Link
        href={`/products/${slug}`}
        className={`flex h-full flex-col justify-start gap-2 self-stretch rounded-lg p-[5px] shadow-xs md:gap-3 md:p-2 ${className}`}
      >
        <div
          className="overflow-hidden rounded-lg p-0.5 sm:p-1 md:p-2 lg:p-3 xl:p-4"
          style={{ backgroundColor: imageBgColor }}
        >
          <Img
            src="img_product_1.png"
            width={274}
            height={274}
            alt={title}
            className="aspect-[165/190] w-full object-contain lg:aspect-[300/330]"
          />
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
              {benefits.join(" | ")}
            </Text>
          </div>
          <div className="flex flex-col justify-between gap-2">
            <RatingDisplay rating={rating} totalRatings={totalRatings} />
            <div className="flex flex-1 justify-between">
              <PriceDisplay price={price} listingPrice={listingPrice} />
              <Button
                variant="primary"
                size="medium"
                className="shrink-0 text-sm md:text-base lg:text-lg"
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
