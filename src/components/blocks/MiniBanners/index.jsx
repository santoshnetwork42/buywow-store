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
          <Link href={link || "#"} key={`banner-${index}`}>
            <picture className="relative block aspect-[298/120] w-[80vw] sm:w-[46vw] md:aspect-[650/166]">
              <source media="(min-width: 768px)" srcSet={webImageUrl} />
              <Img
                src={mWebImageUrl || webImageUrl}
                alt={
                  mWebImageAlternativeText ||
                  webImageAlternativeText ||
                  "Promo Banner"
                }
                fill
                size="650px"
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
