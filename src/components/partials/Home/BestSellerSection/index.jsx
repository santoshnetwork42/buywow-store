// components/BestSellerSection.jsx
"use client";

import { Button, Heading } from "@/components/common";
import React from "react";
import ProductCarousal from "@/components/features/Carousel/ProductCarousel";
import TabComponent from "@/components/common/partials/TabComponent";

const BestSellerSection = ({ title, categories, products }) => {
  const tabData = categories.map((category) => ({
    label: category,
    content: products[category] || [],
  }));

  return (
    <div className="self-stretch">
      <div className="flex flex-col items-center lg:gap-[20px]">
        <Heading
          size="heading6xl"
          as="h1"
          className="capitalize text-[24px] sm:text-[28px] lg:text-[32px]"
        >
          {title}
        </Heading>
        <TabComponent
          tabData={tabData}
          renderContent={(content, index) => (
            <ProductCarousal
              products={content}
              className={"gap-[5px] sm:gap-2 lg:gap-3"}
            />
          )}
          className="flex flex-col w-full items-center gap-[19px]"
          selectedTabClassName="!text-black-900 font-normal bg-amber-200 rounded-full"
          selectedTabPanelClassName="relative tab-panel--selected"
          tabClassName="text-black-900"
        />
        <Button className="flex h-[49px] min-w-[112px] flex-row items-center justify-center rounded-[24px] bg-yellow-900 px-5 text-center text-xl font-medium capitalize text-white-a700_01">
          view all
        </Button>
      </div>
    </div>
  );
};

export default BestSellerSection;
