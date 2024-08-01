import React from "react";
import dynamic from "next/dynamic";

// Dynamically import components
const UpsellProducts = dynamic(
  () =>
    import(
      "@/components/partials/Product/ProductDetailViewBlocks/PDVUpsellProducts"
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

const renderBlock = (block, index) => {
  switch (block?.__typename) {
    case "ComponentBlocksUpsellProducts":
      return <UpsellProducts key={index} {...block} isInPDP />;
    case "ComponentBlocksFeaturedList":
      return <FeaturedList key={index} {...block} isInPDP />;
    case "ComponentAccordionDescriptionSection":
      return <AccordionDescription key={index} {...block} />;
    case "ComponentAccordionIngredientsSection":
      return <AccordionIngredients key={index} {...block} />;
    case "ComponentAccordionUsageInstructionsSection":
      return <AccordionUsageInstructions key={index} {...block} />;
    case "ComponentAccordionFaQsSection":
      return <AccordionFaQs key={index} {...block} />;

    default:
      return null;
  }
};

const ProductDetailViewBlocks = ({ blocks }) => {
  if (!Array.isArray(blocks) || blocks.length === 0) return null;

  return <>{blocks.map((block, index) => renderBlock(block, index))}</>;
};

export default ProductDetailViewBlocks;
