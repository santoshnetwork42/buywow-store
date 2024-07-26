import React, { useState, useRef, useEffect } from "react";
import { Button, Text } from "@/components/common";
import { extractAttributes } from "@/utils/helpers";
import Accordion from "@/components/common/Accordion";

const AccordionDescription = ({
  accordionDescriptionTitle: title,
  image,
  description,
}) => {
  const { url, alternativeText } = extractAttributes(image);
  const [isExpanded, setIsExpanded] = useState(true);
  const [showReadMore, setShowReadMore] = useState(false);
  const textRef = useRef(null);
  const buttonRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (textRef.current && containerRef.current) {
      const lineHeight = parseInt(
        window.getComputedStyle(textRef.current).lineHeight,
      );
      const height = textRef.current.clientHeight;
      const shouldShowReadMore = height > lineHeight * 3;
      setShowReadMore(shouldShowReadMore);
      setIsExpanded(!shouldShowReadMore);

      if (shouldShowReadMore && buttonRef.current) {
        const buttonWidth = buttonRef.current.offsetWidth;
        const textWidth = textRef.current.offsetWidth;
        const lastLineWidth = textWidth % lineHeight;
        const paddingRight = Math.max(buttonWidth - lastLineWidth, 0);

        textRef.current.style.setProperty(
          "--last-line-padding",
          `${paddingRight}px`,
        );
      }

      // Set the max-height for transition
      containerRef.current.style.setProperty("--max-height", `${height}px`);
    }
  }, [description]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
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
          className={`text-sm`}
          ref={textRef}
          dangerouslySetInnerHTML={{ __html: description }}
        />
        {showReadMore && (
          <Button
            ref={buttonRef}
            onClick={toggleExpand}
            className="absolute bottom-0 right-0 rounded-none bg-white-a700_01 pl-4 text-sm hover:underline"
          >
            {isExpanded ? "Read less" : "Read more"}
          </Button>
        )}
      </div>
    </Accordion>
  );
};

export default AccordionDescription;
