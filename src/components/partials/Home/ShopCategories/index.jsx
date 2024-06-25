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
      className="w-full max-w-[112px] overflow-hidden max-sm:p-[3px] sm:w-[24vw] sm:max-w-[275px] md:w-[26vw] lg:w-[28vw] xl:w-[30vw]"
      width={395}
      height={470}
      aspectRatio="aspect-[395/470]"
    />
  );

  return (
    <SliderItemSection
      sectionData={sectionData}
      ItemComponent={CustomSliderItem}
    />
  );
}
