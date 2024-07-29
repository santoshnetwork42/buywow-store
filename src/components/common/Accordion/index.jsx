"use client";

import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from "react";
import ToggleArrow from "@/components/common/AccordionToggle";
import { Heading, Img } from "@/components/common";

const Accordion = ({ title, imgUrl, alternativeText, children }) => {
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

  const contentStyle = useMemo(
    () => ({
      maxHeight: isOpen ? contentHeight : "0px",
      opacity: isOpen ? 1 : 0,
      visibility: isOpen ? "visible" : "hidden",
      marginBottom: isOpen ? "20px" : "0px",
      marginTop: isOpen ? "10px" : "0px",
    }),
    [isOpen, contentHeight],
  );

  return (
    <div className="mb-2.5 mr-4 flex w-full flex-col border-b">
      <button
        className="flex w-full cursor-pointer items-center justify-between py-3"
        onClick={toggleOpen}
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2 md:gap-2.5">
          {imgUrl && (
            <div className="aspect-square w-6">
              <Img
                src={imgUrl}
                width={26}
                height={26}
                alt={alternativeText || title}
                isStatic
                className="aspect-square h-auto w-full object-contain"
              />
            </div>
          )}
          <Heading as="h4" size="lg" className="text-base" responsive>
            {title}
          </Heading>
        </div>
        <ToggleArrow open={isOpen} />
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-out sm:px-3 md:px-5 lg:px-7"
        style={contentStyle}
      >
        <div ref={contentRef}>{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
