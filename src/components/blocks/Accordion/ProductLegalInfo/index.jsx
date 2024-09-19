"use client";

import { Heading, Text } from "@/components/elements";
import { getBgColor } from "@/utils/helpers";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const ToggleArrow = dynamic(
  () => import("@/components/features/Accordion/AccordionToggle"),
  { ssr: false },
);

const TableLikeStructure = ({ legalInfoItems }) => {
  return (
    <div className="mt-4 grid grid-cols-1 gap-4 pb-2">
      {/* Rows */}
      {legalInfoItems
        ?.filter((item) => item?.subText !== "N/A")
        ?.map((item) => (
          <div
            key={item?.id}
            className="grid grid-cols-2 gap-2 border-b border-gray-200 pb-2"
          >
            <div className="flex flex-row">
              <Text as="p" size="sm">
                {item?.text}
              </Text>
            </div>
            <div className="flex flex-row">
              <Text as="p" size="sm" className="line-clamp-5">
                {item?.subText}
              </Text>
            </div>
          </div>
        ))}
    </div>
  );
};

const ProductLegalInfo = ({
  legalInfoItems = [],
  productLegalInfoBgColor: bgColor,
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

  return (
    <div className={containerClasses}>
      <button
        className="flex w-full cursor-pointer items-center justify-center gap-3 sm:justify-center"
        onClick={toggleOpen}
        aria-expanded={isOpen}
      >
        <Heading size="2xl" as="h3" className="font-medium" responsive>
          Product Details
        </Heading>
        <ToggleArrow open={isOpen} />
      </button>
      <div
        className="w-full overflow-hidden transition-all duration-300 ease-in-out"
        style={contentStyle}
      >
        <div ref={contentRef}>
          <TableLikeStructure legalInfoItems={legalInfoItems} />
        </div>
      </div>
    </div>
  );
};

ProductLegalInfo.displayName = "ProductLegalInfo";

export default ProductLegalInfo;
