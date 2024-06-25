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
      className={`flex flex-col justify-start gap-2 self-stretch rounded-lg p-2 shadow-xs md:gap-3 ${className}`}
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
      <div className="ml-[5px] flex flex-wrap gap-[5px]">
        {features.map((feature, index) => (
          <Text
            key={index}
            as="p"
            className={`flex items-center justify-center rounded-[5px] px-2.5 py-[3px] capitalize ${
              index % 2 === 0 ? "bg-gray-100" : "bg-deep_orange-50"
            }`}
          >
            {feature}
          </Text>
        ))}
      </div>
      <div className="mb-[5px] ml-[5px] flex flex-1 flex-col gap-2">
        <div className="flex flex-1 flex-col">
          <Heading
            size="heading2xl"
            as="h5"
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
        <div className="flex items-center justify-between gap-5">
          <div className="flex flex-1 flex-col gap-[7px]">
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
              <Button
                className="ml-auto flex flex-row items-center justify-center self-end rounded-[17px] bg-yellow-900 px-3 py-1 text-center text-sm font-medium text-white-a700_01 md:hidden"
                onClick={onAddToCart}
              >
                Add
              </Button>
            </div>
          </div>
          <Button
            className="hidden h-[35px] min-w-[66px] flex-row items-center justify-center self-end rounded-[17px] bg-yellow-900 px-4 text-center text-lg font-medium text-white-a700_01 md:flex"
            onClick={onAddToCart}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
