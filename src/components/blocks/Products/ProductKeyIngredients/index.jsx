import React from "react";
import { Heading, Img } from "@/components/elements";
import SectionHeading from "@/components/elements/SectionHeading";
import { extractAttributes, getBgColor } from "@/utils/helpers";

const AdditionalIngredient = React.memo(({ title, image }) => {
  const { url, alternativeText } = extractAttributes(image);
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="aspect-[114/100] w-full max-w-16 sm:max-w-20 lg:max-w-24 xl:max-w-28">
        <Img
          src={url}
          width={114}
          height={100}
          alt={alternativeText || "Additional Ingredient"}
          isStatic
          className="aspect-[114/100] h-auto w-full object-contain"
        />
      </div>
      <Heading
        as="h4"
        size="base"
        className="line-clamp-2 text-center"
        responsive
      >
        {title}
      </Heading>
    </div>
  );
});

AdditionalIngredient.displayName = "AdditionalIngredient";

const PrimaryIngredient = React.memo(({ webImage, mWebImage }) => {
  const webImageAttrs = extractAttributes(webImage);
  const mWebImageAttrs = extractAttributes(mWebImage);

  return (
    <picture className="w-[90%] max-w-[498px] shrink-0 md:w-[55%] md:max-w-[725px] xl:w-[60%]">
      {webImageAttrs.url && (
        <source
          media="(min-width: 768px)"
          srcSet={webImageAttrs.url}
          width={725}
          height={274}
        />
      )}
      <Img
        src={mWebImageAttrs.url || webImageAttrs.url}
        alt={
          mWebImageAttrs.alternativeText ||
          webImageAttrs.alternativeText ||
          `Main Ingredient`
        }
        height={576}
        width={576}
        priority
        isStatic
        className="aspect-square h-auto w-full object-contain md:aspect-[725/274]"
      />
    </picture>
  );
});

PrimaryIngredient.displayName = "PrimaryIngredient";

const ProductKeyIngredients = ({
  title,
  productProductKeyIngredientImagesBgColor: bgColor,
  primaryIngredient,
  secondaryIngredients,
}) => {
  if (!primaryIngredient && !secondaryIngredients?.length) return null;

  const bgColorClass = getBgColor(bgColor);
  const isPaddedColor = bgColor === "LIME" || bgColor === "BLUE";

  return (
    <div
      className={`container-main mb-main flex flex-col items-center justify-center ${bgColorClass} ${
        isPaddedColor ? "py-5" : ""
      }`}
    >
      <SectionHeading title={title} />
      <div className="mt-1 flex w-full flex-col items-center justify-center gap-5 sm:gap-7 md:flex-row md:gap-9 lg:gap-12">
        {primaryIngredient && <PrimaryIngredient {...primaryIngredient} />}
        {secondaryIngredients?.length > 0 && (
          <div className="grid w-full max-w-[452px] grid-cols-3 gap-y-3 sm:gap-x-1 md:gap-x-2 md:gap-y-4 lg:gap-x-3 lg:gap-y-5 xl:gap-y-6">
            {secondaryIngredients.map((ingredient, index) => (
              <AdditionalIngredient
                key={`ingredient-${index}`}
                {...ingredient}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(ProductKeyIngredients);
