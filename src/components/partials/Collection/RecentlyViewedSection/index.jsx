import { Heading } from "@/components/common";
import ProductCarousel from "@/components/features/Carousel/ProductCarousel";
import React from "react";

const RecentlyViewedSection = ({ recentlyViewedData }) => {
  return (
    <div className="flex flex-col items-center gap-3 sm:gap-4 lg:gap-5">
      <Heading size="heading" as="h1" responsive>
        {recentlyViewedData.title}
      </Heading>
      <ProductCarousel
        products={recentlyViewedData.productsData}
        className={"w-full"}
      />
    </div>
  );
};

export default RecentlyViewedSection;
