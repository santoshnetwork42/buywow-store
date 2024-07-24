import { ArrowIconSVG, LeftIconSVG } from "@/assets/svg/icons";
import { Heading } from "@/components/common";
import { getBgColor } from "@/utils/helpers";
import Link from "next/link";
import React from "react";

const CollectionLinks = ({
  collectionLinksBgColor: bgColor,
  collectionLinkItems,
}) => {
  if (!Array.isArray(collectionLinkItems) || collectionLinkItems.length === 0)
    return null;

  const bgColorClass = getBgColor(bgColor);

  return (
    <div className="container-main mb-main flex flex-col items-center justify-center">
      <div className="flex w-full flex-wrap items-center justify-center gap-7">
        {collectionLinkItems.map((link, index) => {
          const { text, slug } = link;
          return (
            <Link
              href={`/collections/${slug}`}
              key={`link-${index}`}
              className={`flex w-full max-w-[352px] items-center justify-between rounded px-3 py-3.5 ${bgColorClass}`}
            >
              <Heading as="h3" size="lg" className="text-base" responsive>
                {text}
              </Heading>
              <ArrowIconSVG height={22} width={22} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CollectionLinks;
