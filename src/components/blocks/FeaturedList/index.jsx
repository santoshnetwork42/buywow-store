import { Img, Text } from "@/components/elements";
import { extractAttributes } from "@/utils/helpers";
import { twMerge } from "tailwind-merge";

const FeaturedItem = ({ image, text, isWebHorizontal, isInPDP }) => {
  const { url, alternativeText } = extractAttributes(image);

  return (
    <div
      className={`flex flex-col items-center justify-center gap-1 ${isWebHorizontal && "md:flex-row"} md:gap-2 lg:gap-3 xl:gap-4`}
    >
      <Img
        src={url}
        width={isInPDP ? 42 : 60}
        height={isInPDP ? 42 : 60}
        alt={alternativeText || "Feature Icon"}
        className={`aspect-square w-full rounded-full object-contain ${!isInPDP ? "max-w-10 sm:max-w-12 md:max-w-14 lg:max-w-16" : "max-w-12"}`}
      />
      <Text
        as="p"
        size="base"
        className={`line-clamp-2 shrink-0 text-center capitalize ${isWebHorizontal && "md:text-left"}`}
        dangerouslySetInnerHTML={{ __html: text }}
        responsive
      />
    </div>
  );
};

FeaturedItem.displayName = "FeaturedItem";

const FeaturedList = ({
  featuredListItems: features,
  isWebHorizontal = true,
  isInPDP = false,
}) => {
  if (!Array.isArray(features) || features.length === 0) return null;

  return (
    <div
      className={twMerge(
        `mx-auto flex w-full flex-wrap items-center justify-around gap-y-2 max-xl:!max-w-full md:justify-evenly`,
        isInPDP ? "" : "container-main mb-7 md:mb-8",
      )}
    >
      {features.map((feature, index) => (
        <FeaturedItem
          key={`feature-${index}`}
          image={feature?.image}
          text={feature?.text}
          isWebHorizontal={isWebHorizontal}
          isInPDP={isInPDP}
        />
      ))}
    </div>
  );
};

export default FeaturedList;
