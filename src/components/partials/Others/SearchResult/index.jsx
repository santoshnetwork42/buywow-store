"use client";

import ProductCard from "@/components/partials/Card/ProductCard";
import { fetchSearchItems } from "@/utils/helpers";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import ProductCardSkeleton from "../../Card/ProductCard/ProductCardSkeleton";

const ProductGrid = React.memo(({ products, isInitialData }) => (
  <div className="grid grid-cols-2 justify-center gap-x-1 gap-y-4 sm:grid-cols-2 sm:gap-x-2 sm:gap-y-5 md:grid-cols-3 lg:gap-x-3 lg:gap-y-6 xl:grid-cols-[repeat(auto-fill,min(356px,calc(25vw-34px)))]">
    {products.map((product, index) => (
      <ProductCard
        key={`product-${product?.id || index}`}
        className="w-[calc(50vw-16px)] max-w-[356px] sm:w-[calc(50vw-24px)] md:w-[calc(33vw-24.5px)] lg:w-[calc(33vw-30px)] xl:w-[calc(25vw-34px)]"
        {...(isInitialData ? product?.attributes : product)}
      />
    ))}
  </div>
));

ProductGrid.displayName = "ProductGrid";

const SkeletonGrid = React.memo(() => (
  <div className="grid grid-cols-2 justify-center gap-x-1 gap-y-4 sm:grid-cols-2 sm:gap-x-2 sm:gap-y-5 md:grid-cols-3 lg:gap-x-3 lg:gap-y-6 xl:grid-cols-[repeat(auto-fill,min(356px,calc(25vw-34px)))]">
    {Array(16)
      .fill(0)
      .map((_, index) => (
        <ProductCardSkeleton key={`skeleton-${index}`} />
      ))}
  </div>
));

SkeletonGrid.displayName = "SkeletonGrid";

const SearchResults = ({ initialProducts = [] }) => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState(initialProducts);
  const [isInitialData, setIsInitialData] = useState(true);

  const fetchProducts = useCallback(async (searchTerm) => {
    console.log("searchTerm :>> ", searchTerm);
    if (!searchTerm) return;

    setLoading(true);
    try {
      const items = await fetchSearchItems(searchTerm, 50);
      setProducts(items || []);
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

  return <ProductGrid products={products} isInitialData={isInitialData} />;
};

export default SearchResults;
