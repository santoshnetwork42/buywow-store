import React from "react";
import { Heading, Img, Text } from "@/components/elements";
import { extractAttributes } from "@/utils/helpers";
import TestimonialProductCard from "@/components/partials/Card/TestimonialProductCard";

const TestimonialCard = ({
  name,
  age,
  webImage,
  mWebImage,
  description,
  concerns,
  product,
  className,
  ...props
}) => {
  const { webImageAttrs, mWebImageAttrs, productAttrs } = {
    webImageAttrs: extractAttributes(webImage),
    mWebImageAttrs: extractAttributes(mWebImage),
    productAttrs: extractAttributes(product),
  };

  const { url: webImageUrl, alternativeText: webImageAlternativeText } =
    webImageAttrs;
  const { url: mWebImageUrl, alternativeText: mWebImageAlternativeText } =
    mWebImageAttrs;
  const { slug, fetchedProduct } = productAttrs;

  if (!webImageAttrs.url || !mWebImageAttrs.url) return null;

  const renderUserInfo = () => {
    if (!name && !age) return null;
    return (
      <Heading
        size="base"
        as="h4"
        className="line-clamp-1 text-sm capitalize"
        responsive
      >
        {name && age ? `${name}, ${age}` : name || age}
        {age && <span className="lowercase"> y/o</span>}
      </Heading>
    );
  };

  const renderDescription = () => {
    if (!description) return null;
    return (
      <Text
        size="base"
        as="p"
        className="line-clamp-3 w-full flex-1"
        responsive
      >
        {description}
      </Text>
    );
  };

  const renderConcerns = () => {
    if (!concerns?.length) return null;
    return (
      <div className="shrink">
        <Text size="sm" as="p" responsive>
          Concern:
        </Text>
        <Heading
          size="base"
          as="h5"
          className="line-clamp-2 text-sm"
          responsive
        >
          {concerns.map((concern) => concern.text).join(", ")}
        </Heading>
      </div>
    );
  };

  return (
    <div
      className={`aspect-[320/192 flex h-full w-[82vw] min-w-[324px] max-w-[502px] flex-col gap-2 sm:aspect-[502/250] sm:w-[70vw] md:w-[58vw] md:gap-3 lg:w-[46vw] ${className}`}
      {...props}
    >
      <div className="overflow-hidden rounded sm:rounded-md lg:rounded-lg">
        <picture>
          <source
            media="(min-width: 576px)"
            srcSet={webImageUrl}
            width={502}
            height={250}
          />
          <Img
            src={mWebImageUrl || webImageUrl}
            alt={
              mWebImageAlternativeText ||
              webImageAlternativeText ||
              "Testimonial Image"
            }
            height={284}
            width={472}
            priority
            isStatic
            className="h-auto w-full object-contain"
          />
        </picture>
      </div>
      <div className="flex flex-1 flex-col gap-2 md:gap-3">
        {renderUserInfo()}
        {renderDescription()}
        <div className="flex items-center justify-between gap-5">
          {renderConcerns()}
          <TestimonialProductCard fetchedProduct={fetchedProduct} />
        </div>
      </div>
    </div>
  );
};

TestimonialCard.displayName = "TestimonialCard";

export default TestimonialCard;
