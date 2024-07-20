import { Img } from "@/components/common";
import SectionHeading from "@/components/common/partials/SectionHeading";
import Slider from "@/components/features/Slider";
import { extractAttributes } from "@/utils/helpers";
import Link from "next/link";
import React from "react";

const IngredientItem = React.memo(({ ingredient }) => {
  const { slug, image } = ingredient;
  const { url, alternativeText } = extractAttributes(image);
  return (
    <Link
      href={`/collections/${slug}`}
      className={`w-40 cursor-pointer sm:w-48 md:w-56 lg:w-60 xl:w-64`}
    >
      <Img
        src={url}
        width={248}
        height={76}
        alt={alternativeText || `${slug} Image`}
        isStatic
        className="aspect-[248/76] h-full w-full object-cover"
      />
    </Link>
  );
});

IngredientItem.displayName = "IngredientItem";

export default function IngredientCategories({
  title,
  ingredientCategoryItems: ingredients,
  ...props
}) {
  if (!ingredients || ingredients.length === 0) {
    return null;
  }

  const ingredientGroups = [];
  for (let i = 0; i < ingredients.length; i += 2) {
    ingredientGroups.push(ingredients.slice(i, i + 2));
  }

  return (
    <div
      className={`container-main mb-8 flex flex-col items-center justify-center sm:mb-9 md:mb-10 lg:mb-11 xl:mb-12 ${props.className}`}
      {...props}
    >
      <SectionHeading title={title} />
      <Slider controlsContainerClassName="md:hidden">
        {ingredientGroups.map((group, index) => (
          <div
            key={`group-${index}`}
            className={`mr-1.5 flex h-full flex-col gap-y-1.5 sm:mr-3 sm:gap-y-3 md:mr-4 md:gap-y-4 lg:mr-5 lg:gap-y-5 ${index === ingredientGroups.length - 1 && "!mr-0"}`}
          >
            {group.map((ingredient, subIndex) => (
              <IngredientItem
                key={`ingredient-${index}-${subIndex}`}
                ingredient={ingredient}
              />
            ))}
          </div>
        ))}
      </Slider>
    </div>
  );
}
