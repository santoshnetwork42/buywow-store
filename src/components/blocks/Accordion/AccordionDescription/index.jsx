"use client";

import Accordion from "@/components/features/Accordion";
import ReadMore from "@/components/features/ReadMore";
import { extractAttributes } from "@/utils/helpers";

const AccordionDescription = ({
  accordionDescriptionTitle: title,
  image,
  description,
  isAccordionOpen = false,
}) => {
  const { url, alternativeText } = extractAttributes(image) || {};

  return (
    <Accordion
      title={title}
      imgUrl={url}
      alternativeText={alternativeText}
      isAccordionOpen={isAccordionOpen}
    >
      <ReadMore content={description} maxLength={200} isHtml />
    </Accordion>
  );
};

export default AccordionDescription;
