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
        className={`flex grow items-center justify-center gap-x-4 rounded-full bg-lime-50_01 px-4 py-1.5 ${isWebHorizontal && "md:flex-row"} max-w-52 md:max-w-64 md:gap-2 lg:gap-3 xl:gap-5`}
      >
        <Img
          src={url}
          width={80}
          height={20}
          objectFit="contain"
          alt={alternativeText || "Feature Icon"}
          className={`aspect-[10/4] w-full rounded-full max-sm:hidden sm:aspect-[4/2] md:aspect-[4/1.4]`}
        />
        <Img
          src={url}
          width={40}
          height={10}
          objectFit="contain"
          alt={alternativeText || "Feature Icon"}
          className={`aspect-[10/4] w-full rounded-full sm:hidden sm:aspect-[4/2] md:aspect-[4/1]`}
        />

        <ShareNow size={32} />
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
          as="p"
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
        />
      ))}
    </div>
  );
};

export default FeaturedList;
