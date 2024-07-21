import { Img } from "@/components/common";
import Slider from "@/components/features/Slider";
import { extractAttributes } from "@/utils/helpers";
import Link from "next/link";
import React from "react";

const SingleBanner = React.memo(({ banner }) => {
  const { webImage, mWebImage, link } = banner;
  const { url: webImageUrl, alternativeText: webImageAlternativeText } =
    extractAttributes(webImage);
  const { url: mWebImageUrl, alternativeText: mWebImageAlternativeText } =
    extractAttributes(mWebImage);
  return (
    <Link href={link || "#"} className="relative w-full">
      <Img
        src={webImageUrl}
        alt={webImageAlternativeText || "Promo Banner"}
        width={1440}
        height={310}
        priority
        isStatic
        className="hidden h-auto w-full object-contain sm:block"
      />
      <Img
        src={mWebImageUrl || webImageUrl}
        alt={mWebImageAlternativeText || "Promo Banner"}
        priority
        width={576}
        height={576}
        isStatic
        test={true}
        className="block h-full w-full object-cover sm:hidden"
      />
    </Link>
  );
});

SingleBanner.displayName = "SingleBanner";

const MultiBanner = React.memo(({ banners }) => {
  return (
    <Slider
      showDotButtons={true}
      sliderClassName="slider-gap-2 sm:slider-gap-3 md:slider-gap-4 lg:slider-gap-5"
    >
      {banners?.map((banner, index) => {
        const { webImage, mWebImage, link } = banner;
        const { url: webImageUrl, alternativeText: webImageAlternativeText } =
          extractAttributes(webImage);
        const { url: mWebImageUrl, alternativeText: mWebImageAlternativeText } =
          extractAttributes(mWebImage);
        return (
          <Link href={link || "#"} key={`banner-${index}`}>
            <Img
              src={webImageUrl || mWebImageUrl}
              alt={webImageAlternativeText || "Promo Banner"}
              width={650}
              height={166}
              isStatic
              className={`hidden h-auto max-w-[46vw] object-contain md:block`}
            />
            <Img
              src={mWebImageUrl || webImageUrl}
              alt={mWebImageAlternativeText || "Promo Banner"}
              width={298}
              height={120}
              isStatic
              className={`block h-auto max-w-[80vw] object-contain md:hidden`}
            />
          </Link>
        );
      })}
    </Slider>
  );
});

MultiBanner.displayName = "MultiBanner";

const Banner = ({ bannerItems: banners, ...props }) => {
  if (!banners || banners?.length === 0) {
    return null;
  }

  return (
    <div
      className={`${banners?.length !== 1 && "container-main"} mb-main ${props?.className}`}
      {...props}
    >
      {banners?.length === 1 ? (
        <SingleBanner banner={banners[0]} />
      ) : (
        <MultiBanner banners={banners} />
      )}
    </div>
  );
};

export default Banner;
