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
      {...props}
    >
      <div className="overflow-hidden rounded-lg">
        <Img
          src={image.src}
          width={image.width}
          height={image.height}
          alt={image.alt || "Product image"}
          className="h-full w-full object-contain"
        />
      </div>
      <div className="flex h-14 flex-wrap gap-[4px] overflow-hidden">
        {features.map((feature, index) => (
          <Text
            key={index}
            as="p"
            className={`h-fit w-fit truncate rounded-[5px] px-2.5 py-[3px] capitalize ${
              index % 2 === 0 ? "bg-gray-100" : "bg-deep_orange-50"
            }`}
          >
            {feature}
          </Text>
        ))}
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <div className="flex flex-1 flex-col">
          <Heading
            size="heading2xl"
            as="h6"
            className="line-clamp-2 w-full capitalize leading-5"
          >
            {title}
          </Heading>
          <Text
            as="p"
            className="line-clamp-3 w-full text-[11px] !font-light leading-[130%]"
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
                className="h-[16px] w-[16px] rounded-[1px]"
              />
              <Text as="p" className="capitalize">
                {rating}
              </Text>
            </div>
            <Text as="p" className="capitalize">
              ({reviewCount} reviews)
            </Text>
          </div>
          <div className="flex flex-1 justify-between gap-[7px]">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-[6px] md:gap-2">
                <Heading size="headingxl" as="h6" className="capitalize">
                  {pricing.current}
                </Heading>
                <Text as="p" className="capitalize line-through">
                  {pricing.original}
                </Text>
              </div>
              <div className="hidden h-[23px] min-w-[62px] flex-row items-center justify-center rounded-sm bg-lime-50 px-2 text-center text-xs capitalize text-black-900 md:flex">
                {pricing.discount}% OFF
              </div>
            </div>
            <Button
              className="text-sm sm:px-3 sm:py-1 lg:px-4 lg:py-1"
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
