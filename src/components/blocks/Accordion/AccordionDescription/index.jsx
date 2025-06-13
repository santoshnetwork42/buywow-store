"use client";

import Accordion from "@/components/features/Accordion";
import { extractAttributes } from "@/utils/helpers";
import dynamic from "next/dynamic";

const ReadMore = dynamic(() => import("@/components/features/ReadMore"), {
  ssr: false,
});

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
      <ReadMore
        content={description}
        maxLength={200}
        isHtml
        isProductDescription
      />
    </Accordion>
  );
};

export default AccordionDescription;
