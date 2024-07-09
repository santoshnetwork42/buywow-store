"use client";

// components/Footer.js
import React, { useState } from "react";
import { Heading, Text, Img } from "@/components/common";
import { footerData } from "@/utils/data/footerData";
import FooterSection from "@/components/common/partials/FooterSection";
import Link from "next/link";

const Footer = ({ className }) => {
  const data = footerData;
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <footer
      className={`flex bg-blue_gray-300_01 px-5 py-6 sm:px-10 md:px-14 lg:px-16 xl:px-24 ${className}`}
    >
      <div className="flex w-full flex-col justify-between gap-5 sm:flex-row">
        <div className="flex flex-col gap-7">
          <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-7">
            <Img
              src={data.logo.src}
              width={data.logo.width}
              height={data.logo.height}
              alt={data.logo.alt}
              className="aspect-[2] h-auto max-w-[150px] object-contain md:max-w-[175px] xl:max-w-[200px]"
            />
            <Text as="p" size="sm" className="text-white-a700_01">
              {data.description}
            </Text>
          </div>
          <div className="hidden flex-col gap-12 sm:flex">
            <div className="flex gap-3 md:gap-4">
              {data.socialIcons.map((icon, index) => (
                <Link
                  key={index}
                  href={icon.href}
                  target={icon.target}
                  rel={icon.rel}
                >
                  <Img
                    src={icon.src}
                    width={icon.width}
                    height={icon.height}
                    alt={icon.alt}
                    className="aspect-square w-6 object-contain"
                  />
                </Link>
              ))}
            </div>
            <Text as="p" size="sm" className="text-white-a700_01" responsive>
              {data.copyright}
            </Text>
          </div>
        </div>
        <div className="mt-3 flex w-full flex-col gap-3 sm:mt-5 sm:max-w-[50%] md:max-w-[60%] md:flex-row md:justify-around lg:justify-between">
          <div className="flex flex-col gap-3 md:w-1/2 lg:flex-1 lg:flex-row lg:justify-evenly lg:gap-5">
            {data.sections.map((section, index) => (
              <FooterSection
                key={index}
                section={section}
                isOpen={openSections[index]}
                onToggle={() => toggleSection(index)}
              />
            ))}
          </div>
          <div className="flex flex-col gap-3">
            {data.otherLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                target={link.target}
                rel={link.rel}
              >
                <Heading
                  as="h6"
                  size="base"
                  className="font-semibold capitalize text-white-a700_01"
                >
                  {link.text}
                </Heading>
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-5 flex items-center justify-between sm:hidden">
          <div className="flex gap-3 md:gap-4">
            {data.socialIcons.map((icon, index) => (
              <Link
                key={index}
                href={icon.href}
                target={icon.target}
                rel={icon.rel}
              >
                <Img
                  key={index}
                  src={icon.src}
                  width={icon.width}
                  height={icon.height}
                  alt={icon.alt}
                  className="aspect-square w-6 object-contain"
                />
              </Link>
            ))}
          </div>
          <Text as="p" size="sm" className="text-white-a700_01" responsive>
            {data.copyright}
          </Text>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
