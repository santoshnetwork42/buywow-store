import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Text, Heading } from "@/components/common";
import { DownArrowIconSVG } from "@/assets/images/downArrow";

const MobileMenuItem = ({ item, closeMenu, linkPrefix }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef?.current?.scrollHeight : 0);
    }
  }, [isOpen]);

  if (item?.subMenu?.length > 0) {
    return (
      <div className="">
        <div
          className="flex cursor-pointer items-center justify-between pb-3 pr-3 pt-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Heading size="base" as="h4" className="font-semibold">
            {item?.title}
          </Heading>
          <DownArrowIconSVG
            className={`mt-0.5 h-3 w-3 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
            strokeWidth={1.4}
          />
        </div>
        <div
          style={{ height: `${height}px` }}
          className="overflow-hidden transition-all duration-300 ease-in-out"
        >
          <ul ref={contentRef}>
            {item?.subMenu.map((subItem, index) => (
              <li
                key={subItem?.id || index}
                className={
                  index !== item?.subMenu?.length - 1
                    ? "border-b-[0.5px] border-b-gray-300"
                    : ""
                }
              >
                <Link
                  className={index === 0 ? "pb-2.5 pt-1.5" : "py-2.5"}
                  href={`/${linkPrefix ? linkPrefix + "/" : ""}${subItem?.slug}`}
                  onClick={closeMenu}
                >
                  <Text size="sm" as="p" className="capitalize">
                    {subItem?.title}
                  </Text>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <Link
      href={`/${linkPrefix ? linkPrefix + "/" : ""}${item?.slug}`}
      onClick={closeMenu}
      className="pb-3 pt-2"
    >
      <Heading size="base" as="h4" className="font-semibold">
        {item?.title}
      </Heading>
    </Link>
  );
};

export default MobileMenuItem;
