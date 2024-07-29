"use client";

import React, { useMemo, useCallback } from "react";
import SectionHeading from "@/components/common/partials/SectionHeading";
import { getBgColor } from "@/utils/helpers";
import { TabPanel, TabList, Tab, Tabs } from "react-tabs";
import Slider from "@/components/features/Slider";
import ProductCard from "@/components/features/Card/ProductCard";
import Link from "next/link";
import { Heading } from "@/components/common";

const FeaturedProductsByTab = React.memo(
  ({
    title,
    featuredProductsByTabBgColor,
    button,
    featuredProductsTabItems,
  }) => {
    const bgColorClass = useMemo(
      () => getBgColor(featuredProductsByTabBgColor),
      [featuredProductsByTabBgColor],
    );

    const isPaddedColor = useMemo(
      () =>
        featuredProductsByTabBgColor === "LIME" ||
        featuredProductsByTabBgColor === "BLUE",
      [featuredProductsByTabBgColor],
    );

    const renderProductCard = useCallback(
      (product, index) => (
        <ProductCard
          key={`product-${product?.id || index}`}
          className="w-[calc(50vw-16px)] max-w-[356px] bg-white-a700_01 sm:w-[calc(50vw-24px)] md:w-[calc(33vw-24.5px)] lg:w-[calc(33vw-30px)] xl:w-[calc(25vw-34px)]"
          {...product?.attributes}
        />
      ),
      [],
    );

    const renderTabPanel = useCallback(
      (item, index) => (
        <TabPanel
          key={`tab-panel-${index}`}
          className="no-scrollbar w-full overflow-x-auto overflow-y-visible"
        >
          <Slider
            controlsContainerClassName="mb-2 md:mb-3"
            sliderClassName="gap-[5px] sm:gap-2 lg:gap-3"
          >
            {item?.products?.data?.map(renderProductCard)}
          </Slider>
        </TabPanel>
      ),
      [renderProductCard],
    );

    if (!featuredProductsTabItems?.length) return null;

    return (
      <div
        className={`container-main mb-main flex flex-col items-center justify-center ${bgColorClass} ${isPaddedColor ? "py-5" : ""}`}
      >
        {title && <SectionHeading title={title} />}

        <Tabs
          className="flex w-full flex-col items-center gap-3 sm:gap-4 lg:gap-5"
          selectedTabClassName="text-black-900 font-normal bg-amber-200 rounded-full"
          selectedTabPanelClassName="relative tab-panel--selected"
        >
          <div className="no-scrollbar w-full overflow-x-auto [text-align:-webkit-center]">
            <TabList className="flex w-max gap-1 sm:gap-3 lg:gap-5">
              {featuredProductsTabItems.map((item, index) => (
                <Tab
                  key={index}
                  className="px-2.5 py-1 text-sm font-light capitalize text-black-900 sm:px-3 md:px-4 md:py-[6px] md:text-base"
                >
                  {item?.tab?.data?.attributes?.title}
                </Tab>
              ))}
            </TabList>
          </div>
          <div className="flex w-full flex-col">
            {featuredProductsTabItems.map(renderTabPanel)}
          </div>
        </Tabs>
        {button && (
          <Link
            href={`/collections/${button.slug}`}
            className="mt-2 rounded-[24px] bg-yellow-900 px-4 py-2 text-center max-sm:mt-1 md:px-5 md:py-3"
          >
            <Heading
              as="h3"
              size="xl"
              className="text-white-a700_01"
              responsive
            >
              {button.text}
            </Heading>
          </Link>
        )}
      </div>
    );
  },
);

FeaturedProductsByTab.displayName = "FeaturedProductsByTab";

export default FeaturedProductsByTab;
