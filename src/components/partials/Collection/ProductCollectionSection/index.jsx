"use client";

import React, { useState } from "react";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import { Heading } from "@/components/common";
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
      className={`flex flex-col gap-5 sm:gap-6 lg:gap-7 ${className}`}
      selectedTabClassName="bg-blue-50 border-blue-50 font-normal"
    >
      <div className="grid grid-cols-[1fr_auto] gap-4 sm:gap-5 lg:grid-cols-[auto_1fr_auto] xl:gap-8">
        <Heading as="h2" size="heading4xl" className="shrink-0 lg:order-1">
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
                {category}
              </Tab>
            ))}
          </TabList>
        </div>
      </div>

      {collectionData.categories.map((category, index) => (
        <TabPanel key={index}>
          <div className="grid grid-cols-2 gap-x-1 gap-y-6 sm:gap-x-2 md:grid-cols-3 md:gap-y-7 lg:grid-cols-4 lg:gap-x-3">
            {sortProducts(collectionData.products[category]).map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </TabPanel>
      ))}
    </Tabs>
  );
};

export default ProductCollectionSection;
