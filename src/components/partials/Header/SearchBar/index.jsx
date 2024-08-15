"use client";

import { CloseSVG } from "@/assets/images";
import { Img, Input } from "@/components/elements";
import { usePathname, useRouter } from "next/navigation";
import { memo, useCallback, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

const SearchIcon = memo(() => (
  <Img
    src="img_search.svg"
    width={24}
    height={24}
    alt="search"
    className="aspect-square w-6 cursor-pointer object-contain"
  />
));

const ClearIcon = memo(({ onClick }) => (
  <CloseSVG
    onClick={onClick}
    height={24}
    width={24}
    fillColor="#000000ff"
    className="cursor-pointer"
  />
));

const SearchBar = memo(({ className }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (pathname !== "/search") {
      setSearch("");
    }
  }, [pathname]);

  const handleSubmit = useCallback(() => {
    const trimmedSearch = search.trim();
    if (trimmedSearch) {
      router.push(`/search?q=${encodeURIComponent(trimmedSearch)}`);
    }
  }, [router, search]);

  const handleChange = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  const clearSearch = useCallback(() => {
    setSearch("");
  }, []);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") {
        handleSubmit();
      }
    },
    [handleSubmit],
  );

  const handleClick = useCallback(() => {
    if (pathname !== "/search") {
      router.push("/search");
    }
  }, [pathname, router]);

  const suffix = search ? (
    <ClearIcon onClick={clearSearch} />
  ) : (
    <SearchIcon onClick={pathname === "/search" ? handleSubmit : undefined} />
  );

  return (
    <div
      className={twMerge(
        "flex-grow",
        pathname !== "/search" && "cursor-pointer",
        className,
      )}
      onClick={handleClick}
    >
      <Input
        name="searchField"
        placeholder="Search e.g. vitamin c face wash"
        autoComplete="off"
        value={search}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        suffix={suffix}
        autoFocus={pathname === "/search"}
        className={twMerge(
          "flex w-full items-center gap-3 rounded-[20px] border border-solid border-gray-300_01 bg-lime-50_01 px-4 py-2 text-sm font-light text-gray-700_02",
        )}
      />
    </div>
  );
});

SearchIcon.displayName = "SearchIcon";
ClearIcon.displayName = "ClearIcon";
SearchBar.displayName = "SearchBar";

export default SearchBar;
