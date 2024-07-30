"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button, Text } from "@/components/elements";
import { extractAttributes } from "@/utils/helpers";
import Accordion from "@/components/features/Accordion";

const AccordionDescription = ({
  accordionDescriptionTitle: title,
  image,
  description,
}) => {
  const { url, alternativeText } = extractAttributes(image) || {};
  const [isExpanded, setIsExpanded] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const textRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (textRef.current && containerRef.current) {
      const lineHeight = parseInt(
        window.getComputedStyle(textRef.current).lineHeight,
      );
      const height = textRef.current.scrollHeight;
      const shouldShowReadMore = height > lineHeight * 3;
      setShowReadMore(shouldShowReadMore);
      setIsExpanded(!shouldShowReadMore);

      containerRef.current.style.setProperty("--max-height", `${height}px`);
    }
  }, [description]);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <Accordion title={title} imgUrl={url} alternativeText={alternativeText}>
      <div
        ref={containerRef}
        className={`relative overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? "max-h-[var(--max-height)]" : "max-h-[4.5em]"
        }`}
      >
        <p
          className="text-sm"
          ref={textRef}
          dangerouslySetInnerHTML={{ __html: description }}
        />
        {showReadMore && (
          <Button
            onClick={toggleExpand}
            className="absolute bottom-0 right-0 bg-white-a700_01 pl-4 text-sm hover:underline"
          >
            {isExpanded ? "Read less" : "Read more"}
          </Button>
        )}
      </div>
    </Accordion>
  );
};

export default AccordionDescription;
