"use client";

import React, { useState } from "react";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import { Heading, Text } from "@/components/common";
import ProductCard from "@/components/features/Card/ProductCard";
import SortDropdown from "../../../common/partials/SortDropdown";

const ProductCollectionSection = ({ collectionData, className }) => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortOption, setSortOption] = useState(
    collectionData.sortOptions[0].value,
  );

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const sortProducts = (products) => {
    return [...products].sort((a, b) => {
      if (sortOption === "highest_rating") {
        return b.rating - a.rating;
      } else if (sortOption === "lowest_price") {
        return (
          parseFloat(a.pricing.current.replace("₹", "")) -
          parseFloat(b.pricing.current.replace("₹", ""))
        );
      } else if (sortOption === "highest_price") {
        return (
          parseFloat(b.pricing.current.replace("₹", "")) -
          parseFloat(a.pricing.current.replace("₹", ""))
        );
      }
      return 0;
    });
  };

  return (
    <Tabs
      className={`flex flex-col ${className}`}
      selectedTabClassName="bg-blue-50 border-blue-50 font-normal"
    >
      <div className="mb-5 grid grid-cols-[1fr_auto] items-center gap-4 sm:mb-6 sm:gap-5 lg:mb-7 lg:grid-cols-[auto_1fr_auto] xl:gap-8">
        <Heading as="h2" size="2xl" className="shrink-0 lg:order-1" responsive>
          {collectionData.title}
        </Heading>
        <SortDropdown
          className="shrink-0 lg:order-3"
          options={collectionData.sortOptions}
          onOptionChange={handleSortChange}
        />
        <div className="no-scrollbar col-span-full w-full overflow-x-auto max-lg:[text-align:-webkit-center] lg:order-2 lg:col-span-1">
          <TabList className="flex w-max gap-2 sm:gap-3 md:gap-4 xl:gap-5">
            {collectionData.categories.map((category, index) => (
              <Tab
                key={index}
                className="w-max rounded-full border-[0.5px] border-lime-100 px-2 py-1 text-sm font-light capitalize !leading-[1.25] md:border md:px-3 md:py-1.5 md:text-base"
                onClick={() => setActiveCategory(category)}
              >
                <Text
                  size="base"
                  as="p"
                  className="text-sm font-light capitalize"
                  responsive
                >
                  {category}
                </Text>
              </Tab>
            ))}
          </TabList>
        </div>
      </div>

      {collectionData.categories.map((category, index) => (
        <TabPanel key={index}>
          <div className="flex flex-wrap justify-center gap-x-1 gap-y-6 sm:gap-x-2 md:gap-y-7 lg:gap-x-3">
            {sortProducts(collectionData.products[category]).map((product) => (
              <ProductCard
                className="w-full max-w-[min(356px,calc(50%-2px))] basis-auto sm:max-w-[min(356px,calc(50%-4px))] md:max-w-[min(356px,calc(33%-4px))] lg:max-w-[min(356px,calc(33%-6px))] xl:max-w-[min(356px,calc(25%-10px))]"
                key={product.id}
                {...product}
              />
            ))}
          </div>
        </TabPanel>
      ))}
    </Tabs>
  );
};

export default ProductCollectionSection;
