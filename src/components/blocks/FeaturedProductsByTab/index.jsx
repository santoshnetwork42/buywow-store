"use client";

import SectionHeading from "@/components/common/SectionHeading";
import { Heading } from "@/components/elements";
import Slider from "@/components/features/Slider";
import ProductCard from "@/components/partials/Card/ProductCard";
import { getBgColor } from "@/utils/helpers";
import Link from "next/link";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

const FeaturedProductsByTab = ({
  title,
  featuredProductsByTabBgColor,
  button,
  featuredProductsTabItems,
}) => {
  const bgColorClass = getBgColor(featuredProductsByTabBgColor);

  const isPaddedColor =
    featuredProductsByTabBgColor === "LIME" ||
    featuredProductsByTabBgColor === "BLUE";

  const renderProductCard = (product, index) => (
    <ProductCard
      key={`product-${product?.id || index}`}
      className="w-[calc(50vw-16px)] max-w-[326px] bg-white-a700_01 sm:w-[calc(50vw-24px)] md:w-[calc(33vw-24.5px)] lg:w-[calc(33vw-30px)] xl:w-[calc(25vw-34px)]"
      {...product?.attributes}
    />
  );

  const renderTabPanel = (item, index) => (
    <TabPanel
      key={`tab-panel-${index}`}
      className="no-scrollbar w-full overflow-x-auto overflow-y-visible"
    >
      <Slider
        controlsContainerClassName="mb-2 md:mb-3"
        sliderClassName="gap-[5px] sm:gap-2 lg:gap-3"
        isContainShadow
      >
        {item?.products?.data?.map(renderProductCard)}
      </Slider>
    </TabPanel>
  );

  if (!featuredProductsTabItems?.length) return null;

  return (
    <div
      className={`container-main mb-main flex flex-col items-center justify-center ${bgColorClass} ${isPaddedColor ? "py-5" : ""}`}
    >
      <SectionHeading title={title} className="mb-3 lg:mb-2" />
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
      {!!button?.text && (
        <Link
          href={`/collections/${button.slug}`}
          className="mt-1.5 rounded-[24px] bg-yellow-900 px-4 py-2 text-center sm:mt-1 md:mt-0 md:px-5 md:py-3"
        >
          <Heading as="h3" size="xl" className="text-white-a700_01" responsive>
            {button.text}
          </Heading>
        </Link>
      )}
    </div>
  );
};

FeaturedProductsByTab.displayName = "FeaturedProductsByTab";

export default FeaturedProductsByTab;
