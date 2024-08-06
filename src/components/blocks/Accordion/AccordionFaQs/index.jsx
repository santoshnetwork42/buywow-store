"use client";

import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { Text } from "@/components/elements";
import Accordion from "@/components/features/Accordion";
import PlusMinusToggle from "@/components/features/Accordion/PlusMinusToggle";
import { extractAttributes } from "@/utils/helpers";

const FaqItem = memo(({ question, answer, showDivider }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState("auto");

  useEffect(() => {
    if (contentRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          setContentHeight(`${entry.contentRect.height}px`);
        }
      });

      resizeObserver.observe(contentRef.current);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, []);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const contentStyle = {
    maxHeight: isOpen ? contentHeight : "0px",
    opacity: isOpen ? 1 : 0,
    visibility: isOpen ? "visible" : "hidden",
    marginBottom: isOpen ? "10px" : "0px",
    marginTop: isOpen ? "10px" : "0px",
  };

  return (
    <div
      className={`flex w-full flex-col border-black-900 pb-2 md:pb-2.5 ${
        showDivider ? "border-b-[0.5px]" : ""
      }`}
    >
      <div
        className="flex w-full cursor-pointer items-center justify-between"
        onClick={toggleOpen}
      >
        <Text as="p" size="sm">
          {question}
        </Text>
        <PlusMinusToggle open={isOpen} />
      </div>
      <div
        style={contentStyle}
        className="overflow-hidden transition-all duration-300 ease-in-out"
      >
        <div ref={contentRef}>
          <Text as="p" size="sm">
            {answer}
          </Text>
        </div>
      </div>
    </div>
  );
});

FaqItem.displayName = "FaqItem";

const AccordionFaQs = memo(({ accordionFAQsTitle, image, FAQs }) => {
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
});

AccordionFaQs.displayName = "AccordionFaQs";

export default AccordionFaQs;
