"use client";

import React from "react";
import { SliderItem, SliderItemSection } from "@/components/common/partials/SliderItemSection";

const ConcernSection = ({ sectionData }) => {
  const CustomSliderItem = (props) => (
    <SliderItem
      {...props}
      className="max-w-[100px] sm:max-w-[260px] w-full sm:w-[20vw] md:w-[20vw] lg:w-[22vw] xl:w-[20vw] overflow-hidden max-sm:p-[3px]"
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
