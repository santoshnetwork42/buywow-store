"use client";

import SortDropdown from "@/components/common/SortDropdown";
import { Heading } from "@/components/elements";
import InfiniteScroll from "@/components/features/InfiniteScroll";
import Slider from "@/components/features/Slider";
import BlogCard from "@/components/partials/Card/BlogCard";
import ProductCard from "@/components/partials/Card/ProductCard";
import ProductCardSkeleton from "@/components/partials/Card/ProductCard/ProductCardSkeleton";
import { searchCMSCollectionProductsAPI } from "@/lib/appSyncAPIs";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

const SORT_OPTIONS = [
  { value: "RECOMMENDED", label: "Recommended" },
  { value: "LATEST", label: "Latest" },
  { value: "BEST_SELLERS", label: "Best Sellers" },
  { value: "HIGHEST_RATED", label: "Highest Rated" },
  { value: "PRICE_HIGH_TO_LOW", label: "High to Low" },
  { value: "PRICE_LOW_TO_HIGH", label: "Low to High" },
  { value: "AVAILABILITY", label: "Availability" },
];

const HorizontalBlogSection = React.memo(
  ({ horizontalBlogs, containerRef, horizontalCardWidth }) => (
    <div
      ref={containerRef}
      className="col-span-full"
      style={{ gridRow: horizontalBlogs?.row }}
    >
      <Slider
        sliderClassName="gap-3 xl:!overflow-visible"
        showDotButtons={true}
        dragFree={false}
      >
        {horizontalBlogs?.horizontalBlogItems?.map((card, cardIndex) => (
          <BlogCard
            key={`horizontal-blog-${cardIndex}`}
            cardData={card}
            isVertical={false}
            className="max-xl:!w-[calc(50vw-42px)] max-lg:!w-[calc(50vw-34px)] max-md:!w-[calc(100vw-40px)] max-sm:!w-[calc(100vw-24px)]"
            style={{ width: horizontalCardWidth }}
          />
        ))}
      </Slider>
    </div>
  ),
);

HorizontalBlogSection.displayName = "HorizontalBlogSection";

const ProductCollectionByTab = ({
  title,
  defaultCollectionSorting = "RECOMMENDED",
  productCollectionTabItems: initialProductCollectionTabItems,
  verticalBlogSection,
  horizontalBlogSection,
  slug,
}) => {
  const [sortOption, setSortOption] = useState(
    SORT_OPTIONS.find((option) => option.value === defaultCollectionSorting) ||
      SORT_OPTIONS[0],
  );
  const [horizontalCardWidth, setHorizontalCardWidth] = useState("100%");
  const [productCollectionTabItems, setProductCollectionTabItems] = useState(
    initialProductCollectionTabItems,
  );
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef(null);

  const reloadProducts = useCallback(
    async (newSortOption) => {
      setIsLoading(true);
      const activeTab = productCollectionTabItems[activeTabIndex];

      try {
        setProductCollectionTabItems((prevItems) =>
          prevItems.map((item) => ({
            ...item,
            products: { ...item.products, data: [] },
          })),
        );

        const response = await searchCMSCollectionProductsAPI({
          collectionSlug: slug[slug.length - 1],
          tabSelected: activeTab?.tab?.data?.id,
          defaultSorting: newSortOption.value,
          page: 1,
          limit: activeTab?.pagination?.pageSize ?? 10,
        });

        const newProducts = response?.items?.data ?? [];

        setProductCollectionTabItems((prevItems) => {
          const updatedItems = [...prevItems];
          if (updatedItems[activeTabIndex]) {
            updatedItems[activeTabIndex] = {
              ...updatedItems[activeTabIndex],
              products: {
                ...response?.items,
                data: newProducts,
              },
            };
          }
          return updatedItems;
        });

        setCurrentPage(1);
        const totalProducts = activeTab?.pagination?.totalData ?? 0;
        setHasMore(newProducts.length < totalProducts);
      } catch (error) {
        console.error("Error reloading products:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [activeTabIndex, productCollectionTabItems, slug],
  );

  const handleSortChange = useCallback(
    (option) => {
      setSortOption(option);
      reloadProducts(option);
    },
    [reloadProducts],
  );

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

  const loadMoreProducts = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    const nextPage = currentPage + 1;
    const activeTab = productCollectionTabItems[activeTabIndex];

    try {
      const response = await searchCMSCollectionProductsAPI({
        collectionSlug: slug[slug.length - 1],
        tabSelected: activeTab?.tab?.data?.id,
        defaultSorting: sortOption.value,
        page: nextPage,
        limit: activeTab?.pagination?.pageSize ?? 10,
      });

      const newProducts = response?.items?.data ?? [];

      if (newProducts.length > 0) {
        setProductCollectionTabItems((prevItems) => {
          const updatedItems = [...prevItems];
          if (updatedItems[activeTabIndex]) {
            updatedItems[activeTabIndex] = {
              ...updatedItems[activeTabIndex],
              products: {
                ...updatedItems[activeTabIndex].products,
                data: [
                  ...(updatedItems[activeTabIndex].products?.data ?? []),
                  ...newProducts,
                ],
              },
            };
          }
          return updatedItems;
        });
        setCurrentPage(nextPage);

        const totalProducts = activeTab?.pagination?.totalData ?? 0;
        const newTotalLoaded =
          (activeTab?.products?.data?.length ?? 0) + newProducts.length;
        setHasMore(newTotalLoaded < totalProducts);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error loading more products:", error);
    } finally {
      setIsLoading(false);
    }
  }, [
    isLoading,
    hasMore,
    currentPage,
    productCollectionTabItems,
    activeTabIndex,
    slug,
    sortOption,
  ]);

  const handleTabSelect = useCallback(
    (index) => {
      setActiveTabIndex(index);
      const selectedTab = productCollectionTabItems[index];

      if (selectedTab) {
        const productsInTab = selectedTab.products?.data?.length ?? 0;
        const totalProducts = selectedTab.pagination?.totalData ?? 0;
        const pageSize = selectedTab.pagination?.pageSize ?? 10;
        const calculatedPage = Math.ceil(productsInTab / pageSize);

        setCurrentPage(calculatedPage);
        setHasMore(productsInTab < totalProducts);
      }
    },
    [productCollectionTabItems],
  );

  const renderTabList = useMemo(() => {
    if (!productCollectionTabItems?.length) return null;

    return (
      <TabList className="flex w-max gap-2 sm:gap-3 md:gap-4 xl:gap-5">
        {productCollectionTabItems.map((category, index) => {
          const tabTitle = category?.tab?.data?.attributes?.title;
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

  const renderProductsAndSkeletons = useCallback(
    (category) => {
      const currentProducts = category.products?.data || [];
      const totalProducts = category.pagination?.totalData || 0;
      const pageSize = category.pagination?.pageSize || 10;
      const remainingProducts = Math.min(
        totalProducts - currentProducts.length,
        pageSize,
      );
      const skeletonCount = isLoading ? remainingProducts : 0;

      return [
        ...currentProducts.map((product, productIndex) => (
          <ProductCard
            className="h-auto bg-white-a700_01"
            key={`product-${productIndex}`}
            {...product.attributes}
          />
        )),
        ...Array.from({ length: skeletonCount }).map((_, index) => (
          <ProductCardSkeleton
            key={`skeleton-${currentProducts.length + index}`}
          />
        )),
      ];
    },
    [isLoading],
  );

  if (!productCollectionTabItems?.length) return null;

  return (
    <div className="container-main mb-main flex flex-col justify-center gap-8 sm:gap-10 lg:gap-12">
      <Tabs
        className="flex flex-col"
        selectedTabClassName="bg-blue-50 !border-blue-50 font-normal"
        selectedTabPanelClassName="relative tab-panel--selected"
        onSelect={handleTabSelect}
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
            value={sortOption}
            options={SORT_OPTIONS}
            onOptionChange={handleSortChange}
          />
          <div className="no-scrollbar col-span-full w-full overflow-x-auto max-lg:[text-align:-webkit-center] lg:order-2 lg:col-span-1">
            {renderTabList}
          </div>
        </div>

        {productCollectionTabItems.map((category, index) => (
          <TabPanel key={`tab-panel-${index}`}>
            <InfiniteScroll
              loadMore={loadMoreProducts}
              hasMore={hasMore}
              isLoading={isLoading}
              rootMargin="500px"
            >
              <div className="grid grid-cols-2 justify-center gap-x-1 gap-y-6 sm:grid-cols-2 sm:gap-x-2 md:grid-cols-3 md:gap-y-7 lg:gap-x-3 xl:grid-cols-[repeat(auto-fill,min(356px,calc(25vw-34px)))]">
                {renderProductsAndSkeletons(category)}
                {verticalBlogSection?.verticalBlogItem && (
                  <BlogCard
                    cardData={verticalBlogSection.verticalBlogItem}
                    isVertical={true}
                    className="col-start-[-2]"
                    row={verticalBlogSection.row}
                  />
                )}
                {horizontalBlogSection?.map((horizontalBlogs, index) => (
                  <HorizontalBlogSection
                    key={`horizontal-blog-${index}`}
                    horizontalBlogs={horizontalBlogs}
                    containerRef={containerRef}
                    horizontalCardWidth={horizontalCardWidth}
                  />
                ))}
              </div>
            </InfiniteScroll>
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
};

export default ProductCollectionByTab;
