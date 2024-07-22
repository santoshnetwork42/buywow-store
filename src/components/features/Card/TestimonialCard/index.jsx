import React from "react";
import { Button, Text, Heading, Img } from "@/components/common";
import { extractAttributes } from "@/utils/helpers";
import Link from "next/link";

const TestimonialCard = React.memo(
  ({
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
    const { slugId, imageBgColor } = productAttrs;

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
        className={`flex w-[82vw] max-w-[502px] flex-col gap-2 sm:w-[70vw] md:w-[58vw] md:gap-3 lg:w-[46vw] ${className}`}
        {...props}
      >
        <div className="overflow-hidden rounded sm:rounded-md lg:rounded-lg">
          <Img
            src={webImageUrl || mWebImageUrl}
            width={502}
            height={250}
            alt={webImageAlternativeText || "Testimonial Image"}
            isStatic
            className="aspect-[502/250] h-auto w-full object-contain max-sm:hidden"
          />
          <Img
            src={mWebImageUrl || webImageUrl}
            width={576}
            height={346}
            alt={mWebImageAlternativeText || "Testimonial Image"}
            isStatic
            className="aspect-[320/192] h-auto w-full object-contain sm:hidden"
          />
        </div>
        <div className="flex flex-1 flex-col gap-2 md:gap-3">
          {renderUserInfo()}
          {renderDescription()}
          <div className="flex items-center justify-between gap-5">
            {renderConcerns()}
            <Link
              href={`/products/${slugId}`}
              className="flex items-center justify-center gap-2 rounded bg-lime-100_01 p-2"
            >
              <div
                className="flex w-12 shrink-0 items-center justify-center overflow-hidden rounded"
                style={{ backgroundColor: imageBgColor || "#fff" }}
              >
                <Img
                  src={webImageAttrs.url}
                  width={48}
                  height={56}
                  alt={webImageAttrs.alternativeText}
                  isStatic
                  className="aspect-square h-auto w-full object-contain md:aspect-[48/56]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <Heading as="h5" size="sm" className="line-clamp-1">
                  Pure Aloe Vera Gel
                </Heading>
                <div className="flex items-center justify-between gap-4 md:gap-5 lg:gap-6">
                  <div className="flex items-center gap-1">
                    <Text
                      size="base"
                      as="p"
                      className="text-sm font-semibold capitalize"
                      responsive
                    >
                      ₹339
                    </Text>
                    <Text
                      size="sm"
                      as="p"
                      className="capitalize line-through"
                      responsive
                    >
                      ₹339
                    </Text>
                  </div>
                  <Button
                    variant="primary"
                    size="small"
                    className="text-xs capitalize md:text-sm"
                  >
                    add
                  </Button>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  },
);

TestimonialCard.displayName = "TestimonialCard";

export default TestimonialCard;
