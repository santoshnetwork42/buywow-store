"use client";

import Accordion from "@/components/features/Accordion";
import { extractAttributes } from "@/utils/helpers";
import dynamic from "next/dynamic";

const FaqItem = dynamic(
  () => import("@/components/blocks/Accordion/AccordionFaQs/FaqItem"),
  { ssr: false },
);

const AccordionFaQs = ({ accordionFAQsTitle, image, FAQs }) => {
  if (
    !accordionFAQsTitle ||
    !FAQs ||
    !Array.isArray(FAQs) ||
    FAQs.length === 0
  ) {
    return null;
  }

  const { url: accordionImageUrl, alternativeText: accordionImageAlt } =
    extractAttributes(image) || {};

  return (
    <Accordion
      title={accordionFAQsTitle}
      imgUrl={accordionImageUrl}
      alternativeText={accordionImageAlt}
    >
      <div className="flex flex-col gap-2 md:gap-2.5">
        {FAQs.map((faq, index) => (
          <FaqItem
            key={`faq-${index}`}
            question={faq?.question}
            answer={faq?.answer}
            showDivider={index !== FAQs.length - 1}
          />
        ))}
      </div>
    </Accordion>
  );
};

AccordionFaQs.displayName = "AccordionFaQs";

export default AccordionFaQs;
