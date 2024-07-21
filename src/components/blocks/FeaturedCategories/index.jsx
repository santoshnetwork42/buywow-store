import React from "react";
import SectionHeading from "@/components/common/partials/SectionHeading";
import Slider from "@/components/features/Slider";
import Link from "next/link";
import { Heading, Img } from "@/components/common";
import { extractAttributes } from "@/utils/helpers";

const CategoryItem = React.memo(({ category, size }) => {
  const { image, slug, title } = category;
  const { url, alternativeText } = extractAttributes(image);

  return (
    <Link
      href={`/collections/${slug}` || "#"}
      className={`w-[30vw] ${size === "SMALL" ? "max-w-[260px] sm:w-[26vw] md:w-[24vw] lg:w-[22vw] xl:w-[20vw]" : "sm:w-[28vw] sm:max-w-[396px] md:w-[26vw] lg:w-[24vw] xl:w-[22vw]"}`}
    >
      <div className="overflow-hidden rounded sm:rounded-md lg:rounded-lg">
        <Img
          src={url}
          width={size === "SMALL" ? 260 : 396}
          height={size === "SMALL" ? 260 : 470}
          alt={alternativeText || `${slug} Image`}
          isStatic
          className={`w-full object-contain ${size === "SMALL" ? "aspect-square" : "aspect-[396/470]"}`}
        />
      </div>
      <Heading
        size="xl"
        as="h3"
        className="m-auto mt-1 line-clamp-1 w-fit break-all border-b border-b-black-900 pb-1 font-medium sm:mt-2 lg:mt-3"
        responsive
      >
        {title}
      </Heading>
    </Link>
  );
});

CategoryItem.displayName = "CategoryItem";

const ConcernSection = React.memo(
  ({ title, featuredCategoryItems, featuredItemSize: size = "SMALL" }) => {
    if (!featuredCategoryItems || featuredCategoryItems.length === 0)
      return null;

    return (
      <div className="container-main mb-main">
        <SectionHeading title={title} />
        <Slider
          sliderClassName={`slider-gap-2 ${size === "SMALL" ? "md:slider-gap-2.5" : "sm:slider-gap-3 md:slider-gap-4 lg:slider-gap-5"}`}
        >
          {featuredCategoryItems.map((category, index) => (
            <CategoryItem
              key={`category-${index}`}
              category={category}
              size={size}
            />
          ))}
        </Slider>
      </div>
    );
  },
);

ConcernSection.displayName = "ConcernSection";

export default ConcernSection;
