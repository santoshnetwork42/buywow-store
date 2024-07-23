// components/MultiBanner.js
import React from "react";
import Link from "next/link";
import { Img } from "@/components/common";
import Slider from "@/components/features/Slider";
import { extractAttributes } from "@/utils/helpers";

const MiniBanners = React.memo(({ miniBannerItems: banners }) => {
  if (!banners?.length) return null;

  return (
    <Slider
      showDotButtons={true}
      className="container-main mb-main"
      sliderClassName="gap-2 sm:gap-3 md:gap-4 lg:gap-5"
    >
      {banners?.map((banner, index) => {
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
          <Link
            href={link || "#"}
            key={`banner-${index}`}
            className="w-[80vw] sm:w-[46vw]"
          >
            <picture>
              <source
                media="(min-width: 768px)"
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
      })}
    </Slider>
  );
});

MiniBanners.displayName = "MiniBanners";

export default MiniBanners;
