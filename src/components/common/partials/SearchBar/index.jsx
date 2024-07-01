// components/SearchBar.js
"use client";

import React, { useState } from "react";
import { Input, Img } from "@/components/common";
import { CloseSVG } from "@/assets/images";

const SearchBar = ({ className = "" }) => {
  const [searchBarValue, setSearchBarValue] = useState("");

  return (
    <Input
      name="Search Field"
      placeholder={`Search e.g. vitamin c face wash`}
      value={searchBarValue}
      onChange={(e) => setSearchBarValue(e.target.value)}
      suffix={
        searchBarValue?.length > 0 ? (
          <CloseSVG
            onClick={() => setSearchBarValue("")}
            height={24}
            width={24}
            fillColor="#000000ff"
          />
        ) : (
          <Img
            src="img_search.svg"
            width={24}
            height={24}
            alt="search"
            className="aspect-square w-[24px] cursor-pointer object-contain"
          />
        )
      }
      className={`flex-grow items-center gap-3 rounded-[20px] border border-solid border-gray-300_01 bg-lime-50_01 px-4 py-2 text-sm font-light text-gray-700_02 ${className}`}
    />
  );
};

export default SearchBar;
