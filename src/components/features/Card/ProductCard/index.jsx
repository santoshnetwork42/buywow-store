import { Button, Text, Heading, Img } from "@/components/common";
import React from "react";

export default function ProductCard({
  image,
  features,
  title,
  benefits,
  rating,
  reviewCount,
  pricing,
  onAddToCart,
  className,
  ...props
}) {
  return (
    <div
      className={`flex flex-col justify-start gap-2 self-stretch rounded-lg p-[5px] shadow-xs md:gap-3 md:p-2 ${className}`}
    >
      <div className="overflow-hidden rounded-lg bg-lime-50 p-0.5 sm:p-1 md:p-2 lg:p-3 xl:p-4">
        <Img
          src={image.src}
          width={274}
          height={274}
          alt={image.alt || "Product image"}
          className="aspect-[165/190] w-full object-contain lg:aspect-[300/330]"
        />
      </div>
      <div className="flex h-12 flex-wrap gap-[4px] overflow-hidden md:h-[52px]">
        {features.map((feature, index) => (
          <Text
            key={index}
            as="p"
            size="sm"
            className={`h-fit w-fit truncate rounded-[5px] px-2.5 py-[3px] capitalize ${
              index % 2 === 0 ? "bg-gray-100" : "bg-deep_orange-50"
            }`}
            responsive
          >
            {feature}
          </Text>
        ))}
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <div className="flex flex-1 flex-col">
          <Heading size="xl" as="h3" className="line-clamp-2 w-full" responsive>
            {title}
          </Heading>
          <Text
            as="p"
            size="sm"
            className="line-clamp-3 w-full font-light"
            responsive
          >
            {benefits}
          </Text>
        </div>
        <div className="flex flex-col justify-between gap-2">
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-[3px]">
              <Img
                src="img_star_6.svg"
                width={16}
                height={16}
                alt="Rating stars"
                className="aspect-square w-[12px] sm:w-[14px] lg:w-[16px]"
              />
              <Text as="p" size="sm" className="capitalize" responsive>
                {rating}
              </Text>
            </div>
            <Text as="p" size="sm" className="capitalize" responsive>
              ({reviewCount} reviews)
            </Text>
          </div>
          <div className="flex flex-1 justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 md:gap-2">
                <Heading size="lg" as="h4" className="text-base" responsive>
                  {pricing.current}
                </Heading>
                <Text
                  as="p"
                  size="sm"
                  className="font-light capitalize line-through"
                >
                  {pricing.original}
                </Text>
              </div>
              <div className="hidden h-6 min-w-[62px] flex-row items-center justify-center rounded-sm bg-lime-50 px-2 text-center text-xs capitalize text-black-900 md:flex">
                {pricing.discount}% OFF
              </div>
            </div>
            <Button
              className="py-1 text-sm sm:px-3 lg:px-4"
              onClick={onAddToCart}
            >
              Add
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
