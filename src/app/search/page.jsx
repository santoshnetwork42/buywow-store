"use client";

import ProductCard from "@/components/partials/Card/ProductCard";
import { fetchSearchItems } from "@/utils/helpers";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const Search = () => {
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [fetchedItems, setFetchedItems] = useState([]);

  // If you need to access specific search parameters
  const query = searchParams.get("q");

  const getProducts = useCallback(async (search) => {
    try {
      setLoading(true);
      const searchTerm = search?.trim();

      if (searchTerm) {
        fetchSearchItems(search, 30).then((fetchedItems) => {
          setFetchedItems(fetchedItems);
        });
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getProducts(query);
  }, [query, getProducts]);

  return (
    <div className="">
      {!loading && !!fetchedItems?.length && (
        <div className="flex flex-wrap justify-center gap-5 py-4">
          {fetchedItems?.map((product, index) => (
            <div key={index}>
              <ProductCard
                key={`product-${index}`}
                className="w-[calc(50vw-16px)] max-w-[356px] bg-white-a700_01 sm:w-[calc(50vw-24px)] md:w-[calc(33vw-24.5px)] lg:w-[calc(33vw-30px)] xl:w-[calc(25vw-34px)]"
                {...product}
              />
            </div>
          ))}
        </div>
      )}
      {loading && <div>Loading</div>}
    </div>
  );
};

export default Search;
