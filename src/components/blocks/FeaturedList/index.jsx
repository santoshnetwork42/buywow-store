import React from "react";
import { Text, Img } from "@/components/common";
import { extractAttributes } from "@/utils/helpers";

const FeaturedItem = React.memo(({ image, text, isWebHorizontal }) => {
  const { url, alternativeText } = extractAttributes(image);

  return (
    <div
      className={`flex flex-col items-center justify-center gap-1 ${isWebHorizontal && "md:flex-row"} md:gap-2 lg:gap-3 xl:gap-4`}
    >
      <Img
        src={url}
        width={60}
        height={60}
        alt={alternativeText || "Feature Icon"}
        isStatic
        className="aspect-square w-full max-w-10 rounded-full object-contain sm:max-w-12 md:max-w-14 lg:max-w-16"
      />
      <Text
        as="p"
        size="base"
        className={`line-clamp-2 shrink-0 text-center capitalize ${isWebHorizontal && "md:text-left"}`}
        dangerouslySetInnerHTML={{ __html: text }}
        responsive
      />
    </div>
  );
});

FeaturedItem.displayName = "FeaturedItem";

const FeaturedList = ({
  featuredListItems: features,
  isWebHorizontal,
  ...props
}) => {
  if (!features?.length) return null;

  const getMaxWidth = (length) => {
    if (length > 4) return "100%";
    if (length > 3) return "88%";
    if (length > 2) return "80%";
    if (length > 1) return "72%";
    return "100%";
  };

  return (
    <div
      style={{
        maxWidth: getMaxWidth(features?.length),
      }}
      className="mx-auto mb-7 flex w-full flex-wrap items-center justify-evenly gap-y-2 max-xl:!max-w-full md:mb-8"
    >
      {features.map((feature, index) => (
        <FeaturedItem
          key={`feature-${index}`}
          image={feature?.image}
          text={feature?.text}
          isWebHorizontal={isWebHorizontal}
        />
      ))}
    </div>
  );
};

export default FeaturedList;
