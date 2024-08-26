import { Img } from "@/components/elements";
import Slider from "@/components/features/Slider";
import { extractAttributes } from "@/utils/helpers";
import Link from "next/link";

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

        const imageUrl = mWebImageAttrs.url || webImageAttrs.url;
        const imageAlt =
          mWebImageAttrs.alternativeText ||
          webImageAttrs.alternativeText ||
          `Promo Banner ${index + 1}`;

        return (
          <Link href={link || "#"} key={`mini-banner-${index}`}>
            <picture className="relative block aspect-[298/120] w-[80vw] sm:w-[46vw] md:aspect-[650/166]">
              <source
                media="(min-width: 768px)"
                srcSet={`${webImageAttrs.url}?w=1100&q=75&f=webp`}
              />
              <Img
                src={imageUrl}
                alt={imageAlt}
                width={500}
                height={500}
                priority
                className="aspect-[298/120] h-auto w-full object-contain md:aspect-[650/166]"
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
