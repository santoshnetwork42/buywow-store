// components/FooterSection.js
import React from "react";
import Link from "next/link";
import { Heading, Text, Img } from "@/components/common";
import { DownArrowIconSVG } from "@/assets/images/downArrow";

const FooterSection = ({ section, isOpen, onToggle, isDesktop }) => {
  return (
    <div
      className={`flex flex-col ${isOpen || isDesktop ? "gap-2 sm:gap-3 md:gap-3 lg:gap-5" : "gap-0"} transition-gap duration-300`}
    >
      {section.title ? (
        <>
          <div className={isDesktop ? "hidden" : ""}>
            <button
              onClick={onToggle}
              className="flex w-full items-center justify-between"
            >
              <Heading as="h6" className="capitalize !text-white-a700_01">
                {section.title}
              </Heading>
              <DownArrowIconSVG
                className={`h-[14px] w-[14px] transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
                fillColor="#ffffff"
              />
            </button>
          </div>
          <Heading
            as="h6"
            className={`capitalize !text-white-a700_01 ${isDesktop ? "block" : "hidden"}`}
          >
            {section.title}
          </Heading>
        </>
      ) : null}
      <ul
        className={`flex flex-col gap-1.5 overflow-hidden transition-all duration-300 ease-in-out sm:gap-1.5 lg:gap-2.5 ${
          isOpen || isDesktop ? "max-h-96" : "max-h-0"
        } }`}
      >
        {section.links.map((link, linkIndex) => (
          <li
            key={linkIndex}
            className={
              section.title ? "transition-all duration-300 ease-in-out" : ""
            }
          >
            <Link href={link.href} target={link.target} rel={link.rel}>
              <Text as="p" className="text-sm capitalize !text-white-a700_01">
                {link.text}
              </Text>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterSection;
