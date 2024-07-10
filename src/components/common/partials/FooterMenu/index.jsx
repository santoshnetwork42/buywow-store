// components/FooterMenu.js
import React from "react";
import Link from "next/link";
import { Heading, Text } from "@/components/common";
import { DownArrowIconSVG } from "@/assets/images/downArrow";

const FooterMenu = ({ item, isOpen, onToggle }) => {
  return (
    <div
      className={`flex flex-col ${isOpen ? "gap-2 sm:gap-3 md:gap-3 lg:gap-5" : "gap-0 lg:gap-5"} transition-gap duration-300`}
    >
      <div
        onClick={onToggle}
        className="flex w-full items-center justify-between lg:hidden"
      >
        <Heading
          as="h6"
          size="base"
          className="font-semibold capitalize text-white-a700_01"
        >
          {item?.title}
        </Heading>
        <DownArrowIconSVG
          className={`h-[14px] w-[14px] transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          fillColor="#ffffff"
        />
      </div>
      <Heading
        as="h6"
        size="base"
        className={`hidden capitalize text-white-a700_01 lg:block`}
      >
        {item.title}
      </Heading>
      {item.subMenu.length > 0 && (
        <ul
          className={`flex flex-col gap-1.5 overflow-hidden transition-all duration-300 ease-in-out sm:gap-2 lg:gap-2.5 ${
            isOpen ? "max-h-96" : "max-h-0 lg:max-h-96"
          }`}
        >
          {item?.subMenu.map((item, index) => (
            <li
              key={item?.id || index}
              className={
                item?.title ? "transition-all duration-300 ease-in-out" : ""
              }
            >
              <Link href={item?.slug}>
                <Text
                  as="p"
                  size="sm"
                  className="capitalize text-white-a700_01"
                >
                  {item?.title}
                </Text>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FooterMenu;
