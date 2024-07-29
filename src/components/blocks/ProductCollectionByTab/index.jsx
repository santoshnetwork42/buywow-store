"use client";

import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import { Heading } from "@/components/common";
import ProductCard from "@/components/features/Card/ProductCard";
import SortDropdown from "@/components/common/partials/SortDropdown";
import BlogCard from "@/components/features/Card/BlogCard";
import Slider from "@/components/features/Slider";

const SORT_OPTIONS = [
  { value: "RECOMMENDED", label: "Recommended" },
  { value: "LATEST", label: "Latest" },
  { value: "BEST_SELLERS", label: "Best Sellers" },
  { value: "HIGHEST_RATED", label: "Highest Rated" },
  { value: "PRICE_HIGH_TO_LOW", label: "High to Low" },
  { value: "PRICE_LOW_TO_HIGH", label: "Low to High" },
  { value: "AVAILABILITY", label: "Availability" },
];

const ProductCollectionByTab = ({
  title,
  defaultCollectionSorting = "RECOMMENDED",
  productCollectionTabItems,
  verticalBlogSection,
  horizontalBlogSection,
}) => {
  const [sortOption, setSortOption] = useState(defaultCollectionSorting);
  const [horizontalCardWidth, setHorizontalCardWidth] = useState("100%");
  const containerRef = useRef(null);

  const handleSortChange = useCallback((option) => {
    setSortOption(option);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current && window.innerWidth >= 1200) {
        const containerWidth = containerRef.current.offsetWidth;
        setHorizontalCardWidth(`${(containerWidth - 12) / 2}px`);
      } else {
        setHorizontalCardWidth("auto");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderTabList = useMemo(() => {
    if (!productCollectionTabItems?.length) return null;

    return (
      <TabList className="flex w-max gap-2 sm:gap-3 md:gap-4 xl:gap-5">
        {productCollectionTabItems.map((category, index) => {
          const tabTitle = category.tab?.data?.attributes?.title;
          return (
            <Tab
              key={`tab-${index}`}
              className="w-max rounded-full border-[0.5px] border-lime-100 px-2.5 py-1 text-sm font-light capitalize !leading-[1.25] md:border md:px-3 md:py-1.5 md:text-base"
            >
              {tabTitle || `Tab ${index + 1}`}
            </Tab>
          );
        })}
      </TabList>
    );
  }, [productCollectionTabItems]);

  if (!productCollectionTabItems?.length) return null;

  return (
    <div className="container-main mb-main flex flex-col justify-center gap-8 sm:gap-10 lg:gap-12">
      <Tabs
        className="flex flex-col"
        selectedTabClassName="bg-blue-50 !border-blue-50 font-normal"
        selectedTabPanelClassName="relative tab-panel--selected"
      >
        <div className="mb-5 grid grid-cols-[1fr_auto] items-center gap-4 sm:mb-6 sm:gap-5 lg:mb-7 lg:grid-cols-[auto_1fr_auto] xl:gap-8">
          <Heading
            as="h2"
            size="2xl"
            className="shrink-0 lg:order-1"
            responsive
          >
            {title}
          </Heading>
          <SortDropdown
            className="shrink-0 lg:order-3"
            options={SORT_OPTIONS}
            onOptionChange={handleSortChange}
          />
          <div className="no-scrollbar col-span-full w-full overflow-x-auto max-lg:[text-align:-webkit-center] lg:order-2 lg:col-span-1">
            {renderTabList}
          </div>
        </div>

        {productCollectionTabItems.map((category, index) => (
          <TabPanel key={`tab-panel-${index}`}>
            <div className="grid grid-cols-2 justify-center gap-x-1 gap-y-6 sm:grid-cols-2 sm:gap-x-2 md:grid-cols-3 md:gap-y-7 lg:gap-x-3 xl:grid-cols-[repeat(auto-fill,min(356px,calc(25vw-34px)))]">
              {category.products?.data?.map((product, productIndex) => (
                <ProductCard
                  className="h-auto bg-white-a700_01"
                  key={`product-${productIndex}`}
                  {...product.attributes}
                />
              ))}
              {verticalBlogSection?.verticalBlogItem && (
                <BlogCard
                  cardData={verticalBlogSection.verticalBlogItem}
                  isVertical={true}
                  className="col-start-[-2]"
                  row={verticalBlogSection.row}
                />
              )}
              {horizontalBlogSection?.map((horizontalBlogs, index) => (
                <div
                  ref={containerRef}
                  className="col-span-full"
                  style={{ gridRow: horizontalBlogs?.row }}
                  key={`horizontal-blog-${index}`}
                >
                  <Slider
                    sliderClassName="gap-3 xl:!overflow-visible"
                    showDotButtons={true}
                    dragFree={false}
                  >
                    {horizontalBlogs?.horizontalBlogItems?.map(
                      (card, cardIndex) => (
                        <BlogCard
                          key={`horizontal-blog-${cardIndex}`}
                          cardData={card}
                          isVertical={false}
                          className="max-xl:!w-[calc(50vw-42px)] max-lg:!w-[calc(50vw-34px)] max-md:!w-[calc(100vw-40px)] max-sm:!w-[calc(100vw-24px)]"
                          style={{ width: horizontalCardWidth }}
                        />
                      ),
                    )}
                  </Slider>
                </div>
              ))}
            </div>
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
};

export default React.memo(ProductCollectionByTab);
