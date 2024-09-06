import React from "react";
import Link from "next/link";
import { ArrowIconSVG } from "@/assets/svg/icons";
import { Heading } from "@/components/elements";
import { getBgColor } from "@/utils/helpers";

const CollectionLink = ({ text, slug, bgColorClass }) => (
  <Link
    prefetch
    href={`/collections/${slug}`}
    className={`flex w-full max-w-[352px] items-center justify-between rounded px-3 py-3.5 ${bgColorClass}`}
  >
    <Heading as="h3" size="lg" className="text-base" responsive>
      {text}
    </Heading>
    <ArrowIconSVG height={22} width={22} />
  </Link>
);

CollectionLink.displayName = "CollectionLink";

const CollectionLinks = ({ collectionLinksBgColor, collectionLinkItems }) => {
  if (!Array.isArray(collectionLinkItems) || collectionLinkItems.length === 0) {
    return null;
  }

  const bgColorClass = getBgColor(collectionLinksBgColor);

  return (
    <div className="container-main mb-main flex flex-col items-center justify-center">
      <div className="flex w-full flex-wrap items-center justify-center gap-7">
        {collectionLinkItems.map((link, index) => {
          const { text, slug } = link || {};
          if (!text || !slug) return null;

          return (
            <CollectionLink
              key={`link-${slug}-${index}`}
              text={text}
              slug={slug}
              bgColorClass={bgColorClass}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CollectionLinks;
