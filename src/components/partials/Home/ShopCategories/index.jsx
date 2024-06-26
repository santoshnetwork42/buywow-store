"use client";

import {
  SliderItem,
  SliderItemSection,
} from "@/components/common/partials/SliderItemSection";
import React, { Suspense } from "react";

export default function ShopCategories({ sectionData }) {
  const CustomSliderItem = (props) => (
    <SliderItem
      {...props}
      className="max-sm:p-[3px]"
      imageClassName="w-full max-w-[112px] overflow-hidden sm:w-[24vw] sm:max-w-[276px] md:w-[26vw] lg:w-[28vw] xl:w-[30vw]"
      width={276}
      height={328}
      aspectRatio="aspect-[276/328]"
    />
  );

  return (
    <SliderItemSection
      sectionData={sectionData}
      ItemComponent={CustomSliderItem}
    />
  );
}
