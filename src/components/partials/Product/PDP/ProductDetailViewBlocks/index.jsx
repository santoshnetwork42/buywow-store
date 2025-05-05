import dynamic from "next/dynamic";
import React, { useMemo } from "react";

// Dynamically import components
const UpsellProducts = dynamic(
  () =>
    import(
      "@/components/partials/Product/PDP/ProductDetailViewBlocks/UpsellProducts"
    ),
);
const FeaturedList = dynamic(() => import("@/components/blocks/FeaturedList"));
const AccordionDescription = dynamic(
  () => import("@/components/blocks/Accordion/AccordionDescription"),
);
const AccordionIngredients = dynamic(
  () => import("@/components/blocks/Accordion/AccordionIngredients"),
);
const AccordionUsageInstructions = dynamic(
  () => import("@/components/blocks/Accordion/AccordionUsageInstructions"),
);
const AccordionFaQs = dynamic(
  () => import("@/components/blocks/Accordion/AccordionFaQs"),
);

const AccordionIngredientsSectionOpenAi = dynamic(
  () =>
    import("@/components/blocks/Accordion/AccordionIngredientsSectionOpenAi"),
);

const accordionTypes = [
  "ComponentAccordionDescriptionSection",
  "ComponentAccordionIngredientsSectionOpenAi",
  "ComponentAccordionIngredientsSection",
  "ComponentAccordionUsageInstructionsSection",
  "ComponentAccordionFaQsSection",
];

const AccordionComponent = ({
  block,
  index,
  isExistAccordionIngredientsSectionOpenAi,
}) => {
  switch (block.__typename) {
    case "ComponentAccordionDescriptionSection":
      return (
        <AccordionDescription key={index} {...block} isInPDP isAccordionOpen />
      );
    case "ComponentAccordionIngredientsSection":
      return isExistAccordionIngredientsSectionOpenAi ? (
        <></>
      ) : (
        <AccordionIngredients key={index} {...block} isInPDP />
      );
    case "ComponentAccordionIngredientsSectionOpenAi":
      return (
        <AccordionIngredientsSectionOpenAi key={index} {...block} isInPDP />
      );
    case "ComponentAccordionUsageInstructionsSection":
      return <AccordionUsageInstructions key={index} {...block} isInPDP />;
    case "ComponentAccordionFaQsSection":
      return <AccordionFaQs key={index} {...block} isInPDP />;
    default:
      return null;
  }
};

const ProductDetailViewBlocks = ({ blocks }) => {
  const { accordionBlocks, otherBlocks } = useMemo(() => {
    if (!Array.isArray(blocks) || blocks.length === 0)
      return { accordionBlocks: [], otherBlocks: [] };

    return blocks.reduce(
      (acc, block) => {
        if (accordionTypes.includes(block.__typename)) {
          acc.accordionBlocks.push(block);
        } else {
          acc.otherBlocks.push(block);
        }
        return acc;
      },
      { accordionBlocks: [], otherBlocks: [] },
    );
  }, [blocks]);

  const isExistAccordionIngredientsSectionOpenAi = accordionBlocks?.find(
    (i) => i.__typename === "ComponentAccordionIngredientsSectionOpenAi",
  );

  if (accordionBlocks.length === 0 && otherBlocks.length === 0) return null;

  return (
    <div className="flex flex-col gap-5">
      {otherBlocks
        ?.filter((block) => !!block?.showComponentInWeb)
        ?.map((block, index) => {
          switch (block.__typename) {
            case "ComponentBlocksUpsellProducts":
              return <UpsellProducts key={index} {...block} isInPDP />;
            case "ComponentBlocksFeaturedList":
              return <FeaturedList key={index} {...block} isInPDP />;
            default:
              return null;
          }
        })}
      {accordionBlocks.length > 0 && (
        <div className="flex flex-col items-center gap-2">
          {accordionBlocks.map((block, index) => (
            <AccordionComponent
              key={index}
              block={block}
              index={index}
              isExistAccordionIngredientsSectionOpenAi={
                !!isExistAccordionIngredientsSectionOpenAi
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(ProductDetailViewBlocks);
