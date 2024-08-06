import React from "react";
import Link from "next/link";
import { extractAttributes } from "@/utils/helpers";
import { Img } from "@/components/elements";

const SingleBanner = ({ banner, slug }) => {
  if (!banner) return null;

  const { webImage, mWebImage, link } = banner;
  const webImageAttrs = extractAttributes(webImage);
  const mWebImageAttrs = extractAttributes(mWebImage);

  if (!webImageAttrs.url && !mWebImageAttrs.url) return null;

  const imageUrl = mWebImageAttrs.url || webImageAttrs.url;
  const imageAlt =
    mWebImageAttrs.alternativeText ||
    webImageAttrs.alternativeText ||
    "Promo Banner";
  const imageWidth = mWebImageAttrs.width || webImageAttrs.width;
  const imageHeight = mWebImageAttrs.height || webImageAttrs.height;

  if (!imageUrl || !imageWidth || !imageHeight) return null;

  return (
    <Link
      href={link || "#"}
      className={`block w-full ${slug?.[slug?.length - 2] === "collections" ? "container-main mb-5 sm:mb-6 lg:mb-7" : "mb-main"}`}
    >
      <picture className="block w-full">
        {!!webImageAttrs.url && (
          <source
            media="(min-width: 576px)"
            srcSet={webImageAttrs.url}
            width={webImageAttrs.width}
            height={webImageAttrs.height}
          />
        )}
        <Img
          src={imageUrl}
          alt={imageAlt}
          width={imageWidth}
          height={imageHeight}
          priority
          className="h-auto w-full object-contain"
          isStatic
          sizes="100vw"
        />
      </picture>
    </Link>
  );
};

SingleBanner.displayName = "SingleBanner";

export default SingleBanner;
