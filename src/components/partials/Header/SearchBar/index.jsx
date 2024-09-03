"use client";

import { CloseSVG } from "@/assets/svg/icons";
import { Img, Input } from "@/components/elements";
import { useEventsDispatch } from "@/store/sagas/dispatch/events.dispatch";
import { useIsInteractive } from "@/utils/context/navbar";
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
  const isInteractive = useIsInteractive();
  const [search, setSearch] = useState("");
  const { search: searchEvent } = useEventsDispatch();
  const [placeholderState, setPlaceholderState] = useState({
    text: "Search for Ubtan",
    isDeleting: false,
    loopNum: 0,
    typingSpeed: TYPING_SPEED,
  });

  const handleType = useCallback(() => {
    setPlaceholderState((prevState) => {
      const { text, isDeleting, loopNum } = prevState;
      const i = loopNum % dataText.length;
      const fullText = dataText[i];

      if (!isDeleting && text === fullText) {
        return { ...prevState, isDeleting: true, typingSpeed: PAUSE_DURATION };
      }

      if (isDeleting && text === "") {
        return {
          ...prevState,
          isDeleting: false,
          loopNum: loopNum + 1,
          typingSpeed: TYPING_SPEED,
          text: fullText.charAt(0),
        };
      }

      return {
        ...prevState,
        text: isDeleting
          ? text.slice(0, -1)
          : fullText.slice(0, text.length + 1),
        typingSpeed: isDeleting ? DELETING_SPEED : TYPING_SPEED,
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placeholderState]);

  useEffect(() => {
    if (!isInteractive) return;
    const typingInterval = setTimeout(handleType, placeholderState.typingSpeed);
    return () => clearTimeout(typingInterval);
  }, [handleType, placeholderState.typingSpeed, isInteractive]);

  useEffect(() => {
    if (pathname !== "/search") {
      setSearch("");
    }
  }, [pathname]);

  useEffect(() => {
    if (search.length >= 3) {
      const debounceTimer = setTimeout(() => {
        const trimmedSearch = search.trim();
        if (trimmedSearch.length >= 3) {
          searchEvent(trimmedSearch);
          router.push(`/search?q=${encodeURIComponent(trimmedSearch)}`);
        }
      }, 300);

      return () => clearTimeout(debounceTimer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, router]);

  const handleClick = useCallback(() => {
    if (pathname !== "/search") {
      router.push("/search");
    }
  }, [pathname, router]);

  const suffix = search ? (
    <ClearIcon onClick={() => setSearch("")} />
  ) : (
    <SearchIcon />
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
        onChange={(e) => setSearch(e.target.value)}
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
