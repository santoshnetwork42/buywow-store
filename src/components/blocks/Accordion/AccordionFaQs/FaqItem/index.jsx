"use client";

import { Heading, Text } from "@/components/elements";
import dynamic from "next/dynamic";
import { memo, useEffect, useRef, useState } from "react";

const PlusMinusToggle = dynamic(
  () => import("@/components/features/Accordion/PlusMinusToggle"),
  { ssr: false },
);

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

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

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
        className="flex w-full cursor-pointer items-center justify-between gap-5"
        onClick={toggleOpen}
      >
        <Heading
          as="h5"
          size="sm"
          dangerouslySetInnerHTML={{ __html: question }}
        />
        <PlusMinusToggle open={isOpen} />
      </div>
      <div
        style={contentStyle}
        className="overflow-hidden transition-all duration-300 ease-in-out"
      >
        <div ref={contentRef}>
          <Text as="p" size="sm" dangerouslySetInnerHTML={{ __html: answer }} />
        </div>
      </div>
    </div>
  );
});

FaqItem.displayName = "FaqItem";

export default FaqItem;
