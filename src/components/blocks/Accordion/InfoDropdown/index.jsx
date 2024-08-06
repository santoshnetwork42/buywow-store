"use client";

import React, { useState, useRef, useEffect } from "react";
import { Heading, Text } from "@/components/elements";
import ToggleArrow from "@/components/features/Accordion/AccordionToggle";
import { getBgColor } from "@/utils/helpers";

const InfoDropdown = ({
  accordionInfoDropdownTitle: title,
  accordionInfoDropdownBgColor: bgColor,
  information,
}) => {
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

  const bgColorClass = getBgColor(bgColor);
  const isPaddedColor = bgColor === "LIME" || bgColor === "BLUE";

  const containerClasses = `container-main mb-main flex flex-col items-center justify-center ${bgColorClass} ${
    isPaddedColor ? "py-5" : ""
  }`;

  const contentStyle = {
    maxHeight: isOpen ? contentHeight : "0px",
    opacity: isOpen ? 1 : 0,
    visibility: isOpen ? "visible" : "hidden",
  };

  if (!information && !title) return null;

  return (
    <div className={containerClasses}>
      <button
        className="flex w-full cursor-pointer items-center justify-center gap-3 sm:justify-center"
        onClick={toggleOpen}
        aria-expanded={isOpen}
      >
        <Heading size="2xl" as="h3" className="font-medium" responsive>
          {title}
        </Heading>
        <ToggleArrow open={isOpen} />
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={contentStyle}
      >
        <div ref={contentRef}>
          {information && (
            <Text
              size="base"
              as="p"
              className="pt-3 sm:pt-4 sm:text-center lg:pt-5"
              responsive
              dangerouslySetInnerHTML={{ __html: information }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

InfoDropdown.displayName = "InfoDropdown";

export default InfoDropdown;
