import { Text } from "@/components/elements";
import CircularProgressBar from "@/components/partials/Product/ProductEffectivenessChart/CircularProgress";

const EffectivenessSection = ({ number, text, isReversed }) => (
  <div
    className={`flex h-1/2 w-full items-center gap-6 ${isReversed ? "flex-row-reverse" : ""}`}
  >
    <CircularProgressBar
      percentage={number}
      className="aspect-square h-auto min-w-[40%] md:min-w-[32%]"
    />
    <Text
      as="p"
      size="lg"
      className="line-clamp-5 border-t border-black-900 pt-2"
      dangerouslySetInnerHTML={{ __html: text }}
      responsive
    />
  </div>
);

const ProductEffectivenessChart = ({ effectivenessChart }) => {
  if (!Array.isArray(effectivenessChart) || effectivenessChart.length === 0)
    return null;

  return (
    <div className="flex w-[90%] max-w-[420px] flex-1 flex-col items-center overflow-hidden rounded-lg sm:w-[80%] md:max-w-[50%]">
      {effectivenessChart.map((item, index) => (
        <EffectivenessSection
          key={index}
          number={item.number}
          text={item.text}
          isReversed={index % 2 !== 0}
        />
      ))}
    </div>
  );
};

export default ProductEffectivenessChart;
