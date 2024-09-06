import SectionHeading from "@/components/common/SectionHeading";
import { Img } from "@/components/elements";
import { extractAttributes } from "@/utils/helpers";

const ProductHighlights = ({ title, images }) => {
  if (!Array.isArray(images) || images.length === 0) return null;

  return (
    <div className="container-main mb-main flex flex-col items-center justify-center">
      <SectionHeading title={title} />
      {images.map((image, index) => {
        if (!image) return null;

        const { webImage, mWebImage } = image;
        const webImageAttrs = extractAttributes(webImage);
        const mWebImageAttrs = extractAttributes(mWebImage);

        const imageUrl = mWebImageAttrs.url || webImageAttrs.url;
        const imageAlt =
          mWebImageAttrs.alternativeText ||
          webImageAttrs.alternativeText ||
          `Product Highlight ${index + 1}`;

        if (!imageUrl) return null;

        return (
          <picture
            key={`product-highlight-${index}`}
            className="relative block w-full max-w-[970px] sm:w-[90%] md:w-[80%]"
          >
            <source
              media="(min-width: 768px)"
              srcSet={`${webImageAttrs.url}?w=1200&q=75&f=webp`}
            />
            <Img
              src={imageUrl}
              alt={imageAlt}
              width={500}
              height={500}
              priority
              className="h-auto w-full object-contain"
            />
          </picture>
        );
      })}
    </div>
  );
};

ProductHighlights.displayName = "ProductHighlights";

export default ProductHighlights;
