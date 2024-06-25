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
      className="max-w-[112px] sm:max-w-[295px] w-full sm:w-[24vw] md:w-[26vw] lg:w-[28vw] xl:w-[30vw] overflow-hidden max-sm:p-[3px]"
      width={395}
      height={470}
      aspectRatio="aspect-[365/470]"
    />
  );

  return (
    <SliderItemSection
      sectionData={sectionData}
      ItemComponent={CustomSliderItem}
    />
  );
}
