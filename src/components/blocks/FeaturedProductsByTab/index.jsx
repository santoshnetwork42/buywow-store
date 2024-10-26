"use client";

import SectionHeading from "@/components/common/SectionHeading";
import { Heading } from "@/components/elements";
import Slider from "@/components/features/Slider";
import ProductCard from "@/components/partials/Card/ProductCard";
import { useStoreConfig } from "@/utils/context/navbar";
import { getBgColor } from "@/utils/helpers";
import { setSoldOutLast } from "@/utils/helpers/products";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

const FeaturedProductsByTab = ({
  title,
  featuredProductsByTabBgColor,
  button,
  featuredProductsTabItems,
  isPersistLoading,
  promotion,
  lazyBlock,
  showProductsOnVariantStockOut = true,
}) => {
  const pathname = usePathname();
  const storeConfig = useStoreConfig();
  const { data: storeConfigData } = storeConfig;

  const bgColorClass = getBgColor(featuredProductsByTabBgColor);

  const isPaddedColor =
    featuredProductsByTabBgColor === "LIME" ||
    featuredProductsByTabBgColor === "BLUE";

  if (
    !featuredProductsTabItems?.length ||
    (isPersistLoading && pathname !== "/")
  )
    return null;

  const renderTabPanel = (item, tabIndex) => (
    <TabPanel
      key={`tab-panel-${tabIndex}`}
      className="no-scrollbar w-full overflow-x-auto overflow-y-visible"
    >
      <Slider
        controlsContainerClassName="mb-2 md:mb-3"
        sliderClassName="gap-[5px] sm:gap-2 lg:gap-3"
        isContainShadow
      >
        {setSoldOutLast(
          item?.products?.data,
          true,
          showProductsOnVariantStockOut,
        )?.map((product, productIndex) => (
          <ProductCard
            key={`product-${product?.id}-${tabIndex}-${productIndex}`}
            className="w-[calc(50vw-16px)] max-w-[326px] bg-white-a700_01 sm:w-[calc(50vw-24px)] md:w-[calc(33vw-24.5px)] lg:w-[calc(33vw-30px)] xl:w-[calc(25vw-34px)]"
            parentPromotionTag={
              (promotion?.data && promotion) ||
              (storeConfigData?.attributes?.promotion_tag?.data &&
                storeConfigData?.attributes?.promotion_tag)
            }
            priority={!lazyBlock && !tabIndex && productIndex < 4}
            {...product?.attributes}
          />
        ))}
      </Slider>
    </TabPanel>
  );

  return (
    <div
      className={`container-main mb-4 flex flex-col items-center justify-center sm:mb-5 md:mb-6 lg:mb-5 xl:mb-6 ${bgColorClass} ${isPaddedColor ? "py-5" : ""}`}
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
          prefetch={false}
          href={`/collections/${button.slug}`}
          className="mb-4 mt-1 rounded-[24px] bg-yellow-900 px-4 py-2 text-center md:px-5 md:py-3 lg:mb-6"
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
