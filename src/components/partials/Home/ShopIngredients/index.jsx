"use client";

import { Heading, Img } from "@/components/common";
import SliderComponent from "@/components/features/Slider/SliderScroll";
import { useDeviceWidth } from "@/utils/useDeviceWidth";
import React from "react";

const IngredientItem = ({ ingredient, index }) => (
  <div
    key={`ingredient-${index}`}
    className="w-[154px] md:w-full max-w-[248px] relative rounded-lg overflow-hidden">
    <Img
      src={ingredient.image}
      width={248}
      height={76}
      alt={`${ingredient.caption} image`}
      className="w-full"
    />
  </div>
);

export default function ShopIngredients({ shopIngredientsData, ...props }) {
  const width = useDeviceWidth();

  if (!width) return null;

  const renderIngredients = () => {
    if (width >= 768) {
      return (
        <div className="w-full overflow-x-auto no-scrollbar">
          <div className="grid grid-cols-5 w-max md:w-fit m-auto justify-center gap-[5px] sm:gap-3 lg:gap-5 self-stretch">
            {shopIngredientsData.ingredients.map((ingredient, index) => (
              <IngredientItem
                key={index}
                ingredient={ingredient}
                index={index}
              />
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <SliderComponent
          className="w-full"
          items={Array.from(
            { length: Math.ceil(shopIngredientsData.ingredients.length / 2) },
            (_, index) => (
              <div
                key={`ingredient-group-${index}`}
                className="flex flex-col gap-[5px] sm:gap-3 lg:gap-5">
                {shopIngredientsData.ingredients
                  .slice(index * 2, index * 2 + 2)
                  .map((ingredient, subIndex) => (
                    <IngredientItem
                      key={`${index}-${subIndex}`}
                      ingredient={ingredient}
                      index={`${index}-${subIndex}`}
                    />
                  ))}
              </div>
            )
          )}
        />
      );
    }
  };

  return (
    <div
      {...props}
      className={`${props.className} flex flex-col self-stretch items-center justify-center gap-4 lg:gap-5`}>
      <Heading
        size="heading6xl"
        as="h1"
        className="capitalize">
        {shopIngredientsData.title}
      </Heading>
      {renderIngredients()}
    </div>
  );
}
