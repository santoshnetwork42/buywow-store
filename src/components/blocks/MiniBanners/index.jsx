import LinkClickTracker from "@/components/common/LinkClickTracker";
import { Img } from "@/components/elements";
import Slider from "@/components/features/Slider";
import { extractAttributes } from "@/utils/helpers";
import { getPublicImageURL } from "@/utils/helpers/img-loader";

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
          <LinkClickTracker
            href={link || "#"}
            key={`mini-banner-${index}`}
            trackingType="BANNER_CLICKED"
            trackingEventPayload={{
              id: index + 1,
              moeText:
                banner?.moeText ||
                webImageAttrs?.alternativeText ||
                mWebImageAttrs?.alternativeText,
            }}
          >
            <picture className="relative block aspect-[298/120] w-[80vw] min-w-[298px] max-w-[352px] overflow-hidden rounded-lg sm:w-[46vw] sm:max-w-[662px] md:aspect-[650/166] md:w-[calc(50vw-36px)] lg:w-[calc(50vw-46px)] xl:w-[calc(50vw-58px)]">
              <source
                media="(min-width: 768px)"
                srcSet={getPublicImageURL({ key: webImageAttrs.url })}
              />
              <Img
                src={getPublicImageURL({ key: imageUrl })}
                alt={imageAlt}
                width={500}
                height={500}
                priority
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
