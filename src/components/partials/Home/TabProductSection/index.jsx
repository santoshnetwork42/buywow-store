"use client";

import { Heading } from "@/components/common";
import React from "react";
import ProductCarousal from "@/components/features/Carousel/ProductCarousel";
import TabComponent from "@/components/common/partials/TabComponent";

const TabProductSection = ({ title, categories, products }) => {
  const tabData = categories.map((category) => ({
    label: category,
    content: products[category] || [],
  }));

  return (
    <div className="flex flex-col items-center gap-3 md:gap-2">
      <Heading size="heading" as="h1" responsive>
        {title}
      </Heading>
      <TabComponent
        tabData={tabData}
        renderContent={(content, index) => (
          <ProductCarousal products={content} className={"w-full"} />
        )}
        className="flex w-full flex-col items-center gap-3 sm:gap-4 lg:gap-5"
        selectedTabClassName="text-black-900 font-normal bg-amber-200 rounded-full"
        selectedTabPanelClassName="relative tab-panel--selected"
        tabClassName="text-black-900"
      />
    </div>
  );
};

export default TabProductSection;
