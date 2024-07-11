// components/SearchBar.js
"use client";

import React, { useState, useCallback, memo } from "react";
import { Input, Img } from "@/components/common";
import { CloseSVG } from "@/assets/images";

const SearchIcon = memo(() => (
  <Img
    src="img_search.svg"
    width={24}
    height={24}
    alt="search"
    className="aspect-square w-[24px] cursor-pointer object-contain"
  />
));

SearchIcon.displayName = "SearchIcon";

const ClearIcon = memo(({ onClick }) => (
  <CloseSVG onClick={onClick} height={24} width={24} fillColor="#000000ff" />
));

ClearIcon.displayName = "ClearIcon";

const SearchBar = memo(({ className = "" }) => {
  const [searchBarValue, setSearchBarValue] = useState("");

  const handleChange = useCallback((e) => {
    setSearchBarValue(e.target.value);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchBarValue("");
  }, []);

  const suffix =
    searchBarValue.length > 0 ? (
      <ClearIcon onClick={clearSearch} />
    ) : (
      <SearchIcon />
    );

  return (
    <Input
      name="Search Field"
      placeholder="Search e.g. vitamin c face wash"
      value={searchBarValue}
      onChange={handleChange}
      suffix={suffix}
      className={`flex-grow items-center gap-3 rounded-[20px] border border-solid border-gray-300_01 bg-lime-50_01 px-4 py-2 text-sm font-light text-gray-700_02 ${className}`}
    />
  );
});

SearchBar.displayName = "SearchBar";

export default SearchBar;
