"use client";

import React from "react";
import {
  SliderItem,
  SliderItemSection,
} from "@/components/common/partials/SliderItemSection";

const ConcernSection = ({ sectionData }) => {
  const CustomSliderItem = (props) => (
    <SliderItem
      {...props}
      className="w-[100px] overflow-hidden max-sm:mx-[2px] sm:w-[20vw] sm:max-w-[260px] md:w-[20vw] lg:w-[22vw] xl:w-[20vw]"
      width={260}
      height={260}
      aspectRatio="aspect-square"
    />
  );

  return (
    <SliderItemSection
      sectionData={sectionData}
      ItemComponent={CustomSliderItem}
    />
  );
};

export default ConcernSection;
