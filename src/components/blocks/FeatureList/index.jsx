import React from "react";
import { Text, Img } from "@/components/common";
import { extractAttributes } from "@/utils/helpers";

const FeatureItem = React.memo(({ image, text }) => {
  const { url, alternativeText } = extractAttributes(image);

  return (
    <div className="flex flex-col items-center justify-center gap-1 md:flex-row md:gap-2 lg:gap-3 xl:gap-4">
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
        className="line-clamp-2 shrink-0 text-center capitalize md:text-left"
        responsive
      >
        {text}
      </Text>
    </div>
  );
});

FeatureItem.displayName = "FeatureItem";

const FeatureList = ({ benefits: features, ...props }) => {
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
      className={`m mx-auto mb-7 flex w-full flex-wrap items-center justify-evenly gap-y-2 max-xl:!max-w-full md:mb-8 ${props?.className}`}
      {...props}
    >
      {features.map((feature, index) => (
        <FeatureItem
          key={feature?.id || `feature-${index}`}
          image={feature?.image}
          text={feature?.text}
        />
      ))}
    </div>
  );
};

export default FeatureList;
