"use client";

import Accordion from "@/components/features/Accordion";
import ReadMore from "@/components/features/ReadMore";
import { extractAttributes } from "@/utils/helpers";

const AccordionDescription = ({
  accordionDescriptionTitle: title,
  image,
  description,
}) => {
  const { url, alternativeText } = extractAttributes(image) || {};

  return (
    <Accordion
      title={title}
      imgUrl={url}
      alternativeText={alternativeText}
      className="lg:w-[90%]"
    >
      <ReadMore content={description} maxLength={100} isHtml />
    </Accordion>
  );
};

export default AccordionDescription;
