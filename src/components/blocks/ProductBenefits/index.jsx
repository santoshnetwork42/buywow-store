import React from "react";
import { Heading, Img, Text } from "@/components/common";
import SectionHeading from "@/components/common/partials/SectionHeading";
import { extractAttributes, getBgColor } from "@/utils/helpers";

const BenefitItem = React.memo(({ text, subText, image }) => {
  const { url, alternativeText } = extractAttributes(image);

  return (
    <div className="m-auto flex w-full flex-col items-center">
      <Img
        src={url}
        alt={alternativeText}
        width={100}
        height={96}
        isStatic
        className="aspect-[100/96] w-20 sm:w-[84px] md:w-[88px] lg:w-[92px] xl:w-24"
      />
      <div className="flex flex-col items-center justify-center gap-1 md:gap-2">
        <Heading
          as="h5"
          className="line-clamp-2 text-center text-sm"
          size="base"
          responsive
        >
          {text}
        </Heading>
        <Text as="p" className="line-clamp-3 text-center" size="sm" responsive>
          {subText}
        </Text>
      </div>
    </div>
  );
});

BenefitItem.displayName = "BenefitItem";

const ProductBenefits = ({
  title,
  productBenefitsBgColor,
  productBenefitItems,
}) => {
  if (!Array.isArray(productBenefitItems) || productBenefitItems.length === 0) {
    return null;
  }

  const bgColorClass = getBgColor(productBenefitsBgColor);
  const isPaddedColor =
    productBenefitsBgColor === "LIME" || productBenefitsBgColor === "BLUE";

  return (
    <div
      className={`container-main mb-main flex flex-col items-center justify-center ${bgColorClass} ${
        isPaddedColor ? "py-5" : ""
      }`}
    >
      <SectionHeading title={title} />
      <div className="grid max-w-[1264px] grid-cols-2 justify-between gap-x-4 gap-y-6 sm:gap-x-5 md:grid-cols-4 md:gap-x-6 lg:gap-x-7 xl:gap-x-8">
        {productBenefitItems.map((item, index) => (
          <BenefitItem key={`benefit-${index}`} {...item} />
        ))}
      </div>
    </div>
  );
};

export default React.memo(ProductBenefits);
