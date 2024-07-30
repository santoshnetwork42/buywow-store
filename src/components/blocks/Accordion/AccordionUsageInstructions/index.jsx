import React, { memo } from "react";
import { Text } from "@/components/elements";
import Accordion from "@/components/features/Accordion";
import { extractAttributes } from "@/utils/helpers";

const InstructionStep = memo(({ index, text }) => (
  <div className="flex gap-2">
    <Text as="p" size="sm" className="shrink-0">
      Step {index + 1}:
    </Text>
    <Text as="p" size="sm">
      {text}
    </Text>
  </div>
));

InstructionStep.displayName = "InstructionStep";

const AccordionUsageInstructions = ({
  accordionUsageInstructionsTitle,
  image,
  usageInstructionItems,
}) => {
  if (!accordionUsageInstructionsTitle || !usageInstructionItems) {
    return null;
  }

  const { url: accordionImageUrl, alternativeText: accordionImageAlt } =
    extractAttributes(image) || {};

  if (
    !Array.isArray(usageInstructionItems) ||
    usageInstructionItems.length === 0
  ) {
    return null;
  }

  return (
    <Accordion
      title={accordionUsageInstructionsTitle}
      imgUrl={accordionImageUrl}
      alternativeText={accordionImageAlt}
    >
      <div className="flex flex-col gap-2 md:gap-2.5">
        {usageInstructionItems.map((item, index) => (
          <InstructionStep
            key={`instruction-step-${index}`}
            index={index}
            text={item?.text}
          />
        ))}
      </div>
    </Accordion>
  );
};

export default memo(AccordionUsageInstructions);
