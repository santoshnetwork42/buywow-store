"use client";

import { CloseSVG } from "@/assets/images";
import { Img, Input } from "@/components/elements";
import { useEventsDispatch } from "@/store/sagas/dispatch/events.dispatch";
import { usePathname, useRouter } from "next/navigation";
import { memo, useCallback, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

const TYPING_SPEED = 100;
const DELETING_SPEED = 30;
const PAUSE_DURATION = 500;

const dataText = [
  "Search for Ubtan",
  "Search for Face Serum",
  "Search for Vitamin C",
  "Search for Face Wash",
  "Search for Face Mask",
];

const SearchIcon = memo(() => (
  <Img
    src="img_search.svg"
    width={24}
    height={24}
    alt="search"
    className="aspect-square w-6 cursor-pointer object-contain"
    isStatic
  />
));

SearchIcon.displayName = "SearchIcon";

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
  const { search: searchEvent } = useEventsDispatch();
  const [placeholderState, setPlaceholderState] = useState({
    text: "",
    isDeleting: false,
    loopNum: 0,
    typingSpeed: TYPING_SPEED,
  });

  const handleType = useCallback(() => {
    const { text, isDeleting, loopNum } = placeholderState;
    const i = loopNum % dataText.length;
    const fullText = dataText[i];

    setPlaceholderState((prevState) => ({
      ...prevState,
      text: isDeleting
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1),
      typingSpeed: isDeleting ? DELETING_SPEED : TYPING_SPEED,
    }));

    if (!isDeleting && text === fullText) {
      setTimeout(
        () => setPlaceholderState((prev) => ({ ...prev, isDeleting: true })),
        PAUSE_DURATION,
      );
    } else if (isDeleting && text === "") {
      setPlaceholderState((prev) => ({
        ...prev,
        isDeleting: false,
        loopNum: prev.loopNum + 1,
      }));
    }
  }, [placeholderState]);

  useEffect(() => {
    const typingInterval = setTimeout(handleType, placeholderState.typingSpeed);
    return () => clearTimeout(typingInterval);
  }, [handleType, placeholderState.typingSpeed]);

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

  useEffect(() => {
    if (search.length >= 2) {
      const debounceTimer = setTimeout(() => {
        handleSubmit();
      }, 300); // 300ms debounce

      return () => clearTimeout(debounceTimer);
    }
  }, [search, handleSubmit]);

  const handleChange = useCallback(
    (e) => {
      const newValue = e.target.value;
      searchEvent(newValue); // search event passed
      setSearch(newValue);
    },
    [searchEvent],
  );

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
        placeholder={placeholderState.text}
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
