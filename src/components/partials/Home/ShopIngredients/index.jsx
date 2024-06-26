"use client";

import { Heading, Img } from "@/components/common";
import SliderComponent from "@/components/features/Slider/SliderScroll";
import { useDeviceWidth } from "@/utils/useDeviceWidth";
import React from "react";

const IngredientItem = ({ ingredient, index }) => (
  <div
    key={`ingredient-${index}`}
    className="relative flex h-[54px] w-[154px] max-w-[248px] items-center justify-center overflow-visible rounded-lg md:h-auto md:max-h-[76px] md:w-full"
  >
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
        <div className="no-scrollbar w-full overflow-visible overflow-x-auto">
          <div className="m-auto grid w-max grid-cols-5 justify-center gap-[5px] self-stretch sm:gap-3 md:w-fit lg:gap-5">
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
                className="flex flex-col items-center justify-center gap-[5px] sm:gap-3 lg:gap-5"
              >
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
            ),
          )}
        />
      );
    }
  };

  return (
    <div
      {...props}
      className={`${props.className} flex flex-col items-center justify-center gap-4 self-stretch lg:gap-5`}
    >
      <Heading size="heading6xl" as="h1" className="capitalize">
        {shopIngredientsData.title}
      </Heading>
      {renderIngredients()}
    </div>
  );
}
