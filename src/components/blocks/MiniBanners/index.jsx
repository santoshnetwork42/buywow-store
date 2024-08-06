import React from "react";
import Link from "next/link";
import Slider from "@/components/features/Slider";
import { extractAttributes } from "@/utils/helpers";
import { Img } from "@/components/elements";

const MiniBanners = ({ miniBannerItems: banners }) => {
  if (!Array.isArray(banners) || banners.length === 0) return null;

  return (
    <Slider
      showDotButtons={true}
      className="container-main mb-main"
      sliderClassName="gap-2 sm:gap-3 md:gap-4 lg:gap-5"
      dragFree={false}
    >
      {banners.map((banner, index) => {
        if (!banner) return null;

        const { webImage, mWebImage, link } = banner;
        const webImageAttrs = extractAttributes(webImage);
        const mWebImageAttrs = extractAttributes(mWebImage);

        if (!webImageAttrs.url && !mWebImageAttrs.url) return null;

        return (
          <Link href={link || "#"} key={`mini-banner-${index}`}>
            <picture className="relative block aspect-[298/120] w-[80vw] sm:w-[46vw] md:aspect-[650/166]">
              {webImageAttrs.url && (
                <source media="(min-width: 768px)" srcSet={webImageAttrs.url} />
              )}
              <Img
                src={mWebImageAttrs.url || webImageAttrs.url}
                alt={
                  mWebImageAttrs.alternativeText ||
                  webImageAttrs.alternativeText ||
                  `Promo Banner ${index + 1}`
                }
                fill
                sizes="(min-width: 768px) 650px, (min-width: 640px) 46vw, 80vw"
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
};

MiniBanners.displayName = "MiniBanners";

export default MiniBanners;
