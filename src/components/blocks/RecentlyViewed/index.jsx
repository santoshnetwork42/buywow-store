"use client";

import SectionHeading from "@/components/common/SectionHeading";
import Slider from "@/components/features/Slider";
import ProductCard from "@/components/partials/Card/ProductCard";
import { getBgColor } from "@/utils/helpers";
import { useSelector } from "react-redux";

const RecentlyViewed = ({
  recentlyViewedTitle: title,
  recentlyViewedBgColor: bgColor,
}) => {
  const products = useSelector((state) =>
    state.recentlyViewed?.recentlyViewedProducts?.slice(1),
  );

  if (!Array.isArray(products) || products.length === 0) return null;

  const bgColorClass = getBgColor(bgColor);
  const isPaddedColor = bgColor === "LIME" || bgColor === "BLUE";

  return (
    <div
      className={`container-main mb-main flex flex-col items-center justify-center ${bgColorClass} ${isPaddedColor ? "py-5" : ""}`}
    >
      <SectionHeading title={title} />
      <Slider
        controlsContainerClassName="mb-2 md:mb-3"
        sliderClassName="gap-[5px] sm:gap-2 lg:gap-3"
      >
        {products.map((product, index) => (
          <ProductCard
            key={`product-${index}`}
            className="w-[calc(50vw-16px)] max-w-[356px] bg-white-a700_01 sm:w-[calc(50vw-24px)] md:w-[calc(33vw-24.5px)] lg:w-[calc(33vw-30px)] xl:w-[calc(25vw-34px)]"
            {...product}
          />
        ))}
      </Slider>
    </div>
  );
};

export default RecentlyViewed;
