import React from "react";
import Link from "next/link";
import { Img } from "@/components/elements";
import SectionHeading from "@/components/common/SectionHeading";
import Slider from "@/components/features/Slider";
import { extractAttributes } from "@/utils/helpers";

const IngredientItem = ({ ingredient }) => {
  const { slug, image } = ingredient;
  const { url, alternativeText } = extractAttributes(image);

  return (
    <Link
      href={`/collections/${slug}` || "#"}
      className="aspect-[248/76] w-40 cursor-pointer sm:w-48 md:w-56 lg:w-60 xl:w-64"
    >
      <Img
        src={url}
        width={248}
        height={76}
        alt={alternativeText || `${slug} Image`}
        isStatic
        className="aspect-[248/76] h-auto w-full object-cover"
      />
    </Link>
  );
};

IngredientItem.displayName = "IngredientItem";

const IngredientCategories = ({
  title,
  ingredientCategoryItems: ingredients,
}) => {
  const ingredientGroups = ingredients.reduce((acc, _, index) => {
    if (index % 2 === 0) {
      acc.push(ingredients.slice(index, index + 2));
    }
    return acc;
  }, []);

  if (!ingredients?.length) return null;

  return (
    <div className="container-main mb-main flex flex-col items-center justify-center">
      <SectionHeading title={title} />
      <Slider sliderClassName="gap-1.5 sm:gap-3 md:gap-4 lg:gap-5">
        {ingredientGroups.map((group, index) => (
          <div
            key={`group-${index}`}
            className="flex h-full flex-col gap-y-1.5 sm:gap-y-3 md:gap-y-4 lg:gap-y-5"
          >
            {group.map((ingredient, subIndex) => (
              <IngredientItem
                key={`ingredient-${index}-${subIndex}}`}
                ingredient={ingredient}
              />
            ))}
          </div>
        ))}
      </Slider>
    </div>
  );
};

IngredientCategories.displayName = "IngredientCategories";

export default IngredientCategories;
