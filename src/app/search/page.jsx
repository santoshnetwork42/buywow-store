"use client";

import { fetchSearchItems } from "@/utils/helpers";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

const Search = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  console.log("Current pathname:", pathname);
  console.log("Search params:", searchParams.toString());

  const query = searchParams.get("q");
  console.log("Search query:", query);

  const getProducts = useCallback(async (query) => {
    try {
      const searchTerm = query?.trim();

      if (searchTerm) {
        fetchSearchItems(query, 30).then((fetchedItems) => {
          console.log("fetchedItems :>> ", fetchedItems);
        });
      }
    } catch (error) {}
  }, []);

  useEffect(() => {
    getProducts(query);
  }, [query]);

  return (
    <div>
      <h1>Search Page</h1>
      <p>Current path: {pathname}</p>
      {query && <p>Search query: {query}</p>}
    </div>
  );
};

export default Search;
