"use client";

import { SearchIcon } from "@/assets/svg/icons";
import { Heading, Text } from "@/components/elements";
import { fetchSearchItems } from "@/utils/helpers";
import { setSoldOutLast } from "@/utils/helpers/products";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

const ProductCard = dynamic(
  () => import("@/components/partials/Card/ProductCard"),
  { ssr: false },
);
const ProductCardSkeleton = dynamic(
  () => import("@/components/partials/Card/ProductCard/ProductCardSkeleton"),
  { ssr: false },
);

const ProductGrid = React.memo(({ products, isInitialData }) => {
  const sortedProducts = setSoldOutLast(products, isInitialData);

  return (
    <div className="grid flex-1 grid-cols-2 justify-center gap-x-1 gap-y-4 sm:grid-cols-2 sm:gap-x-2 sm:gap-y-5 md:grid-cols-3 lg:gap-x-3 lg:gap-y-6 xl:grid-cols-[repeat(auto-fill,min(326px,calc(25vw-34px)))]">
      {sortedProducts.map((product, index) => (
        <ProductCard
          key={`product-${product?.id || index}`}
          className="w-[calc(50vw-16px)] max-w-[326px] sm:w-[calc(50vw-24px)] md:w-[calc(33vw-24.5px)] lg:w-[calc(33vw-30px)] xl:w-[calc(25vw-34px)]"
          {...product}
        />
      ))}
    </div>
  );
});

ProductGrid.displayName = "ProductGrid";

const SkeletonGrid = React.memo(() => (
  <div className="grid flex-1 grid-cols-2 justify-center gap-x-1 gap-y-4 sm:grid-cols-2 sm:gap-x-2 sm:gap-y-5 md:grid-cols-3 lg:gap-x-3 lg:gap-y-6 xl:grid-cols-[repeat(auto-fill,min(326px,calc(25vw-34px)))]">
    {Array(16)
      .fill(0)
      .map((_, index) => (
        <ProductCardSkeleton key={`skeleton-${index}`} />
      ))}
  </div>
));

SkeletonGrid.displayName = "SkeletonGrid";

const NoProductsFound = React.memo(({ query }) => (
  <div className="flex flex-1 flex-col items-center justify-center px-4 py-16">
    <div className="mb-4 rounded-full bg-gray-100 p-4 sm:mb-5 lg:mb-6">
      <SearchIcon className="size-8 text-gray-400 sm:size-9 lg:size-10" />
    </div>
    <Heading
      as="h2"
      size="3xl"
      className="mb-3 text-center text-2xl text-gray-800"
      responsive
    >
      No results found for &quot;{query}&quot;
    </Heading>
    <Text
      as="p"
      size="lg"
      className="mb-8 max-w-md text-center text-base text-gray-600/70"
      responsive
    >
      Please try a different term or explore our popular categories.
    </Text>
  </div>
));

NoProductsFound.displayName = "NoProductsFound";

const SearchResults = ({ initialProducts = [] }) => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState(initialProducts);
  const [isInitialData, setIsInitialData] = useState(true);

  const fetchProducts = useCallback(async (searchTerm) => {
    if (!searchTerm) return;

    setLoading(true);
    try {
      const items = await fetchSearchItems(searchTerm, 50);
      setProducts(items);
      setIsInitialData(false);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const trimmedQuery = query?.trim();
    if (trimmedQuery) {
      fetchProducts(trimmedQuery);
    } else {
      setProducts(initialProducts);
      setIsInitialData(true);
    }
  }, [query, initialProducts, fetchProducts]);

  if (loading) {
    return <SkeletonGrid />;
  }

  if (products.length === 0 && query) {
    return <NoProductsFound query={query} />;
  }

  return <ProductGrid products={products} isInitialData={isInitialData} />;
};

export default SearchResults;
