import SectionHeading from "@/components/common/SectionHeading";
import { Img } from "@/components/elements";
import ProductEffectivenessChart from "@/components/partials/Product/ProductEffectivenessChart";
import { extractAttributes } from "@/utils/helpers";

const ProductEffectiveness = ({ title, images, EffectivenessChart }) => {
  if (!Array.isArray(images) || images.length === 0) return null;

  return (
    <div className="container-main mb-main flex flex-col items-center justify-center">
      <SectionHeading title={title} />
      <div className="flex w-full max-w-[1120px] flex-col items-center justify-center gap-9 sm:gap-10 md:mt-1 md:flex-row md:gap-12 lg:gap-16">
        {images.map((imageData, index) => {
          if (!imageData || !imageData.image) return null;
          const { url, alternativeText } = extractAttributes(imageData.image);
          return (
            <div
              key={`effectiveness-image-${index}`}
              className="aspect-[450/344] w-full overflow-hidden rounded-lg md:max-w-[48%]"
            >
              <Img
                src={url}
                alt={
                  alternativeText || `Product Effectiveness Image ${index + 1}`
                }
                width={600}
                height={376}
                isStatic
                className="aspect-[600/376] h-auto w-full object-contain"
              />
            </div>
          );
        })}
        <ProductEffectivenessChart EffectivenessChart={EffectivenessChart} />
      </div>
    </div>
  );
};

ProductEffectiveness.displayName = "ProductEffectiveness";

export default ProductEffectiveness;
