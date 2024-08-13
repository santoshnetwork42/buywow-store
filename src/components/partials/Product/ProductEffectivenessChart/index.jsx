import { Text } from "@/components/elements";
import CircularProgressBar from "./CircularProgress";

const EffectivenessSection = ({ number, text, isReversed }) => (
  <div
    className={`flex h-1/2 items-center gap-6 ${isReversed ? "flex-row-reverse" : ""}`}
  >
    <CircularProgressBar
      percentage={number}
      className="aspect-square h-auto min-w-[40%] md:min-w-[32%]"
    />
    <Text
      as="p"
      size="lg"
      className="border-t border-black-900 pt-2"
      responsive
    >
      {text}
    </Text>
  </div>
);

const ProductEffectivenessChart = ({ EffectivenessChart }) => (
  <div className="flex w-[80%] flex-1 flex-col items-center overflow-hidden rounded-lg md:max-w-[50%]">
    {EffectivenessChart.map((item, index) => (
      <EffectivenessSection
        key={index}
        number={item.number}
        text={item.text}
        isReversed={index % 2 !== 0}
      />
    ))}
  </div>
);

export default ProductEffectivenessChart;
