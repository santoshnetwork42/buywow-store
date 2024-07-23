// components/SingleBanner.js
import React from "react";
import Link from "next/link";
import { Img } from "@/components/common";
import { extractAttributes } from "@/utils/helpers";

const SingleBanner = React.memo(({ banner }) => {
  if (!banner) return null;

  const { webImage, mWebImage, link } = banner;
  const {
    url: webImageUrl,
    width: webImageWidth,
    height: webImageHeight,
    alternativeText: webImageAlternativeText,
  } = extractAttributes(webImage);
  const {
    url: mWebImageUrl,
    width: mWebImageWidth,
    height: mWebImageHeight,
    alternativeText: mWebImageAlternativeText,
  } = extractAttributes(mWebImage);
  return (
    <Link href={link || "#"} className="mb-main w-full">
      <picture>
        <source
          media="(min-width: 576px)"
          srcSet={webImageUrl}
          width={webImageWidth}
          height={webImageHeight}
        />
        <Img
          src={mWebImageUrl || webImageUrl}
          alt={
            mWebImageAlternativeText ||
            webImageAlternativeText ||
            "Promo Banner"
          }
          height={mWebImageHeight}
          width={mWebImageWidth}
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
