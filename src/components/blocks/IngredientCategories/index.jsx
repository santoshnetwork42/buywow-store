"use client";

import { Heading, Img } from "@/components/common";
import SectionHeading from "@/components/common/partials/SectionHeading";
import Slider from "@/components/features/Slider";
import SliderComponent from "@/components/features/Slider";
import { extractAttributes } from "@/utils/helpers";
import React from "react";

// const IngredientItem = ({ ingredient, index }) => (
//   <div
//     key={`ingredient-${index}`}
//     className="relative flex h-[54px] w-[154px] max-w-[248px] items-center justify-center overflow-visible rounded-lg md:h-auto md:max-h-[76px] md:w-full"
//   >
//     <Img
//       src={ingredient.image}
//       width={248}
//       height={76}
//       alt={`${ingredient.caption} image`}
//       className="w-full"
//     />
//   </div>
// );

export default function IngredientCategories({
  title,
  ingredientCategoryItems: ingredients,
  ...props
}) {
  // const renderIngredients = () => {
  //   if (width >= 768) {
  //     return (
  //       <div className="no-scrollbar w-full overflow-visible overflow-x-auto">
  //         <div className="m-auto grid w-max grid-cols-5 justify-center gap-[5px] self-stretch sm:gap-3 md:w-fit lg:gap-5">
  //           {shopIngredientsData.ingredients.map((ingredient, index) => (
  //             <IngredientItem
  //               key={index}
  //               ingredient={ingredient}
  //               index={index}
  //             />
  //           ))}
  //         </div>
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <SliderComponent
  //         items={Array.from(
  //           { length: Math.ceil(shopIngredientsData.ingredients.length / 2) },
  //           (_, index) => (
  //             <div
  //               key={`ingredient-group-${index}`}
  //               className="flex flex-col items-center justify-center gap-[5px] sm:gap-3 lg:gap-5"
  //             >
  //               {shopIngredientsData.ingredients
  //                 .slice(index * 2, index * 2 + 2)
  //                 .map((ingredient, subIndex) => (
  //                   <IngredientItem
  //                     key={`${index}-${subIndex}`}
  //                     ingredient={ingredient}
  //                     index={`${index}-${subIndex}`}
  //                   />
  //                 ))}
  //             </div>
  //           ),
  //         )}
  //       />
  //     );
  //   }
  // };

  if (!ingredients || ingredients?.length === 0) {
    return null;
  }

  return (
    <div
      className={`container-main mb-8 flex w-full flex-col items-center justify-center sm:mb-9 md:mb-10 lg:mb-11 xl:mb-12 ${props.className}`}
      {...props}
    >
      <SectionHeading title={title} />
      <Slider
        sliderClassName="gap-2 grid grid-rows-2 sm:gap-3 md:gap-4 lg:gap-5"
        sliderItemClassName=""
        showDotButtons={true}
      >
        {ingredients?.map((ingredient, index) => {
          const { slug, image } = ingredient;
          const { url, alternativeText } = extractAttributes(image);
          return (
            <div
              key={`ingredient-${index}`}
              className="relative flex h-[54px] w-[154px] max-w-[248px] items-center justify-center overflow-visible rounded-lg md:h-auto md:max-h-[76px] md:w-full"
            >
              <Img
                src={url}
                width={248}
                height={76}
                alt={alternativeText || `${slug} Image`}
                isStatic
                className="w-full"
              />
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
