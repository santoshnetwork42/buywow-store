import SectionHeading from "@/components/common/SectionHeading";
import { Img } from "@/components/elements";
import ProductEffectivenessChart from "@/components/partials/Product/ProductEffectivenessChart";
import { extractAttributes } from "@/utils/helpers";

const ProductEffectiveness = ({ title, image, EffectivenessChart }) => {
  if (!image && !EffectivenessChart?.length) return null;

  return (
    <div className="container-main mb-main flex flex-col items-center justify-center">
      <SectionHeading title={title} />
      <div className="flex w-full max-w-[1120px] flex-col items-center justify-center gap-5 sm:gap-8 md:mt-1 md:flex-row md:gap-10 lg:gap-12 xl:gap-14">
        {image &&
          (() => {
            const { url, alternativeText } = extractAttributes(image);
            return (
              <div
                key="product-effectiveness-image"
                className="aspect-[600/346] w-full max-w-[500px] overflow-hidden rounded-lg md:max-w-[48%]"
              >
                <Img
                  src={url}
                  alt={alternativeText || `Product Effectiveness Image`}
                  width={600}
                  height={376}
                  isStatic
                  className="aspect-[600/346] h-auto w-full object-contain"
                />
              </div>
            );
          })()}
        <ProductEffectivenessChart effectivenessChart={EffectivenessChart} />
      </div>
    </div>
  );
};

ProductEffectiveness.displayName = "ProductEffectiveness";

export default ProductEffectiveness;
