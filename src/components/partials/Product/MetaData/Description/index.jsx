"use client";
import { Img, Text } from "@/components/common";
import ToggleArrow from "@/components/common/AccordionToggle";
import React, { useState } from "react";

const Description = ({ productDescription }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex w-full flex-col">
      <div
        className="flex w-full cursor-pointer items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          <Img
            src={productDescription.image}
            width={26}
            height={26}
            alt="logo"
            className=""
          />
          <Text as="p" size="lg" className="font-medium">
            {productDescription.title}
          </Text>
        </div>
        <ToggleArrow open={isOpen} />
      </div>
      <ul
        className={`flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 py-3" : "max-h-0"
        }`}
      >
        <li
          className={
            "line-clamp-3 transition-all duration-300 ease-in-out md:pl-9"
          }
        >
          <Text as="p" size="sm" className="capitalize">
            {productDescription.description}
          </Text>
        </li>
      </ul>
    </div>
  );
};
export default Description;
