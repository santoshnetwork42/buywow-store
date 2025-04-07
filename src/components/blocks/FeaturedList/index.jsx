"use client";

import { ShareNow } from "@/assets/svg/shareNowIcon";
import { Img, Text } from "@/components/elements";
import { extractAttributes } from "@/utils/helpers";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { twMerge } from "tailwind-merge";

const hasLinkTag = (htmlString) => {
  try {
    const linkRegex = /<a\b[^>]*>/i;
    return linkRegex.test(htmlString);
  } catch (e) {
    return "";
  }
};

const extractLink = (htmlString) => {
  try {
    const linkRegex = /<a\s+(?:[^>]*?\s+)?href="([^"]*)"/i;
    const match = htmlString.match(linkRegex);
    return match ? match[1] : null;
  } catch (e) {
    return "";
  }
};

const FeaturedItem = ({
  image,
  text,
  isWebHorizontal,
  isInPDP,
  isPersistLoading,
  lazyBlock = true,
}) => {
  const { url, alternativeText } = extractAttributes(image);
  const isMarketPlaceLink = hasLinkTag(text);

  const createMarkup = (html) => {
    // Remove all HTML tags except <br>
    const withoutTags = html.replace(/<(?!br\s*\/?)[^>]+>/gi, "");

    return withoutTags.split(/<br\s*\/?>/i).map((text, index, array) => (
      <React.Fragment key={index}>
        {text.replace(/&nbsp;/g, "\u00A0")}
        {index !== array.length - 1 && <br />}
      </React.Fragment>
    ));
  };

  if (isMarketPlaceLink) {
    const extractUrl = extractLink(text) || "";

    return (
      <Link
        href={extractUrl}
        target="_blank"
        // className={`flex max-w-72 items-center justify-center gap-4 rounded-full bg-lime-50_01`}
        className="flex max-w-40 items-center justify-between gap-4 rounded-full bg-lime-50 px-4 py-1 md:max-w-[8rem] lg:max-w-[11rem]"
      >
        <div className="max-w-30">
          <Img
            src={url}
            width={100}
            height={100}
            alt={alternativeText || "Additional Ingredient"}
            className="aspect-[4/2] object-contain"
            priority={lazyBlock}
          />
        </div>
        <div>
          <ShareNow size={28} />
        </div>
      </Link>
    );
  }

  return (
    <div
      className={`flex flex-col items-center justify-center gap-1 ${isWebHorizontal && "md:flex-row"} md:gap-2 lg:gap-3 xl:gap-5`}
    >
      <Img
        src={url}
        width={isInPDP ? 42 : 60}
        height={isInPDP ? 42 : 60}
        alt={alternativeText || "Feature Icon"}
        className={`aspect-square w-full rounded-full object-contain ${!isInPDP ? "max-w-10 sm:max-w-12 md:max-w-14 lg:max-w-16" : "max-w-12"}`}
        priority={!lazyBlock && !isInPDP}
      />
      {isPersistLoading ? (
        <Text
          as="p"
          size="base"
          className={`line-clamp-2 shrink-0 text-center capitalize ${isWebHorizontal && "md:text-left"}`}
          responsive
        >
          {createMarkup(text)}
        </Text>
      ) : (
        <Text
          as="div"
          size="base"
          className={`line-clamp-2 shrink-0 text-center capitalize ${isWebHorizontal && "md:text-left"}`}
          dangerouslySetInnerHTML={{ __html: text }}
          responsive
        />
      )}
    </div>
  );
};

FeaturedItem.displayName = "FeaturedItem";

const FeaturedList = ({
  featuredListItems: features,
  isWebHorizontal = true,
  isInPDP = false,
  isPersistLoading = false,
  lazyBlock,
}) => {
  const pathname = usePathname();

  if (
    !Array.isArray(features) ||
    features.length === 0 ||
    (isPersistLoading && pathname !== "/")
  )
    return null;

  return (
    <div
      className={twMerge(
        `mx-auto flex w-full flex-wrap items-center justify-around gap-x-2 gap-y-2 max-xl:!max-w-full md:justify-evenly`,
        isInPDP ? "" : "container-main mb-7 md:mb-8",
      )}
    >
      {features.map((feature, index) => (
        <FeaturedItem
          key={`feature-${index}`}
          image={feature?.image}
          text={feature?.text}
          isWebHorizontal={isWebHorizontal}
          isInPDP={isInPDP}
          isPersistLoading={isPersistLoading}
          lazyBlock={lazyBlock}
        />
      ))}
    </div>
  );
};

export default FeaturedList;
