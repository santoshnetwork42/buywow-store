"use client";

import { Heading, Img } from "@/components/common";
import { useDeviceWidth } from "@/utils/hooks/useDeviceWidth";
import React from "react";

const ProductKeyIngredients = ({ data, className, ...props }) => {
  const width = useDeviceWidth();
  if (!width) return null;

  const { title, keyIngredient, additionalIngredients } = data;
  return (
    <div
      className={`container-main flex flex-col gap-5 bg-lime-50 pb-7 pt-4 sm:pb-8 sm:pt-5 md:gap-6 md:pb-9 lg:pb-10 lg:pt-6 ${className}`}
      {...props}
    >
      <Heading as="h1" size="heading" responsive>
        {title}
      </Heading>
      <div className="flex flex-col items-center justify-center gap-5 sm:gap-7 md:flex-row md:gap-9 lg:gap-12 xl:gap-14">
        <div className="w-[55%] max-w-[725px] shrink-0 xl:w-[60%]">
          <Img
            src={
              width < 768
                ? keyIngredient.mobileImage.src
                : keyIngredient.desktopImage.src
            }
            height={width < 768 ? 344 : 274}
            width={width < 768 ? 344 : 725}
            alt={
              width < 768
                ? keyIngredient.mobileImage.alt
                : keyIngredient.desktopImage.alt
            }
            className={`h-auto w-full rounded-xl object-contain ${width < 768 ? "aspect-square" : "aspect-[725/274]"} `}
          />
        </div>
        <div className="grid w-full grid-cols-3 gap-y-3 sm:gap-x-1 sm:gap-y-4 md:w-auto md:gap-x-2 lg:gap-x-3 lg:gap-y-5 xl:gap-y-6">
          {additionalIngredients.map((ingredient, index) => (
            <div
              key={`ingredient-${index}`}
              className="flex flex-col items-center gap-1"
            >
              <div className="max-w-16 sm:max-w-20 lg:max-w-24 xl:max-w-28">
                <Img
                  src={ingredient.image}
                  width={114}
                  height={100}
                  alt={`${ingredient.caption} image`}
                  className="aspect-[114/100] h-auto w-full object-contain"
                />
              </div>
              <Heading
                as="h4"
                size="base"
                className="line-clamp-2 text-center"
                responsive
              >
                {ingredient.caption}
              </Heading>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductKeyIngredients;
