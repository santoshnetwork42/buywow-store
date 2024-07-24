import React from "react";
import { extractAttributes } from "@/utils/helpers";
import { Img } from "@/components/common";

const ProductHighlights = React.memo(({ images }) => {
  if (!Array.isArray(images) || images.length === 0) return null;

  return (
    <div className="container-main mb-main flex flex-col items-center justify-center">
      {images.map((image, index) => {
        if (!image) return null;

        const { webImage, mWebImage } = image;
        const webImageAttrs = extractAttributes(webImage);
        const mWebImageAttrs = extractAttributes(mWebImage);

        if (!webImageAttrs.url && !mWebImageAttrs.url) return null;

        return (
          <picture
            key={`product-highlight-${index}`}
            className="relative block aspect-[970/600] w-full max-w-[970px] sm:w-[90%] md:w-[80%]"
          >
            {webImageAttrs.url && (
              <source media="(min-width: 576px)" srcSet={webImageAttrs.url} />
            )}
            <Img
              src={mWebImageAttrs.url || webImageAttrs.url}
              alt={
                mWebImageAttrs.alternativeText ||
                webImageAttrs.alternativeText ||
                `Product Highlight ${index + 1}`
              }
              fill
              sizes="(min-width: 970px) 970px, (min-width: 768px) 80vw, (min-width: 576px) 90vw, 100vw"
              priority
              isStatic
              className="aspect-[970/600] h-auto w-full object-contain"
            />
          </picture>
        );
      })}
    </div>
  );
});

ProductHighlights.displayName = "ProductHighlights";

export default ProductHighlights;
