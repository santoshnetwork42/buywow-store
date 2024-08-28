"use client";

import { Heading, Img } from "@/components/elements";
import ToggleArrow from "@/components/features/Accordion/AccordionToggle";
import { useCallback, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

const Accordion = ({
  title,
  imgUrl,
  alternativeText,
  children,
  header,
  className,
  accordionButtonClassName,
  toggleArrowClassName,
  accordionMainContainerClassName,
  variant,
  showToggleArrow = true,
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

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <div className={twMerge(`flex w-full flex-col border-b`, className)}>
      <button
        className={twMerge(
          "flex w-full cursor-pointer items-center justify-between",
          title && "py-3",
          accordionButtonClassName,
        )}
        onClick={toggleOpen}
        aria-expanded={isOpen}
      >
        <div className="flex w-full items-center gap-2 md:gap-2.5">
          {imgUrl && (
            <div className="aspect-square w-6 md:w-7">
              <Img
                src={imgUrl}
                width={26}
                height={26}
                alt={alternativeText || title}
                className="aspect-square h-auto w-full object-contain"
              />
            </div>
          )}
          {!!title && (
            <Heading as="h4" size="lg" className="text-base" responsive>
              {title}
            </Heading>
          )}
          {header}
        </div>
        {showToggleArrow && (
          <ToggleArrow
            open={isOpen}
            variant={variant}
            className={twMerge("mr-1", toggleArrowClassName)}
          />
        )}
      </button>
      <div
        className={twMerge(
          "overflow-hidden transition-all duration-300 ease-out sm:px-3 md:px-5 lg:px-7",
          isOpen ? "opacity-100" : "opacity-0",
          isOpen ? "visible" : "invisible",
          isOpen ? (variant === "small" ? "mb-2" : "mb-5") : "mb-0",
          isOpen ? "mt-2.5" : "mt-0",
          accordionMainContainerClassName,
        )}
        style={{ maxHeight: isOpen ? contentHeight : "0px" }}
      >
        <div ref={contentRef}>{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
