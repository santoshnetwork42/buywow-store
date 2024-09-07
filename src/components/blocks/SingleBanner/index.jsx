import LinkClickTracker from "@/components/common/LinkClickTracker";
import { Img } from "@/components/elements";
import { extractAttributes } from "@/utils/helpers";

const SingleBanner = ({ banner, pageType }) => {
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

  if (!imageUrl) return null;

  return (
    <LinkClickTracker
      href={link || "#"}
      className={`block w-full ${
        pageType === "collections"
          ? "container-main mb-5 sm:mb-6 lg:mb-7"
          : "mb-main"
      }`}
      trackingType="BANNER_CLICKED"
      trackingEventPayload={{
        id: 1,
        moeText:
          banner?.moeText ||
          webImageAttrs?.alternativeText ||
          mWebImageAttrs?.alternativeText,
      }}
    >
      <picture className="block w-full">
        {!!webImageAttrs.url && (
          <source
            media="(min-width: 576px)"
            srcSet={`${webImageAttrs.url}?w=1920&q=75&f=webp`}
          />
        )}
        <Img
          src={imageUrl}
          alt={imageAlt}
          width={500}
          height={500}
          priority
          className="h-auto w-full object-contain"
        />
      </picture>
    </LinkClickTracker>
  );
};

SingleBanner.displayName = "SingleBanner";

export default SingleBanner;
