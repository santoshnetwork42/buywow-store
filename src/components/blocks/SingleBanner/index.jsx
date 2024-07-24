// components/SingleBanner.js
import React from "react";
import Link from "next/link";
import { extractAttributes } from "@/utils/helpers";
import { Img } from "@/components/common";

const SingleBanner = React.memo(({ banner }) => {
  if (!banner) return null;

  const { webImage, mWebImage, link } = banner;
  const webImageAttrs = extractAttributes(webImage);
  const mWebImageAttrs = extractAttributes(mWebImage);

  if (!webImageAttrs.url && !mWebImageAttrs.url) return null;

  return (
    <Link href={link || "#"} className="mb-main w-full">
      <picture>
        {webImageAttrs.url && (
          <source
            media="(min-width: 576px)"
            srcSet={webImageAttrs.url}
            width={webImageAttrs.width}
            height={webImageAttrs.height}
          />
        )}
        <Img
          src={mWebImageAttrs.url || webImageAttrs.url}
          alt={
            mWebImageAttrs.alternativeText ||
            webImageAttrs.alternativeText ||
            "Promo Banner"
          }
          width={mWebImageAttrs.width || webImageAttrs.width}
          height={mWebImageAttrs.height || webImageAttrs.height}
          priority
          isStatic
          className="h-auto w-full object-contain"
        />
      </picture>
    </Link>
  );
});

SingleBanner.displayName = "SingleBanner";

export default SingleBanner;
