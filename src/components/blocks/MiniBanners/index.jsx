import LinkClickTracker from "@/components/common/LinkClickTracker";
import { Img } from "@/components/elements";
import Slider from "@/components/features/Slider";
import { extractAttributes } from "@/utils/helpers";

const MiniBanners = ({ miniBannerItems: banners, lazyBlock = true }) => {
  if (!Array.isArray(banners) || !banners.length) return null;

  return (
    <Slider
      showDotButtons={true}
      className="container-main mb-main"
      sliderClassName="gap-2 sm:gap-3 md:gap-4 lg:gap-5"
      dragFree={false}
    >
      {banners.filter(Boolean).map((banner, index) => {
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
          <LinkClickTracker
            href={link || "#"}
            key={`mini-banner-${index}`}
            trackingType="BANNER_CLICKED"
            trackingEventPayload={{
              id: index + 1,
              moeText:
                banner?.moeText ||
                webImageAttrs?.alternativeText ||
                mWebImageAttrs?.alternativeText ||
                link,
              url: link,
            }}
          >
            <picture className="relative block aspect-[298/120] w-[80vw] min-w-[298px] max-w-[352px] overflow-hidden rounded-lg sm:w-[46vw] sm:max-w-[662px] md:aspect-[650/166] md:w-[calc(50vw-36px)] lg:w-[calc(50vw-46px)] xl:w-[calc(50vw-58px)]">
              <source
                media="(min-width: 768px)"
                srcSet={`${webImageAttrs.url}?w=1500&q=75&f=webp`}
              />
              <Img
                src={imageUrl}
                alt={imageAlt}
                width={500}
                height={500}
                priority={!lazyBlock}
                className="aspect-[298/120] h-auto w-full object-cover md:aspect-[650/166]"
              />
            </picture>
          </LinkClickTracker>
        );
      })}
    </Slider>
  );
};

MiniBanners.displayName = "MiniBanners";

export default MiniBanners;
