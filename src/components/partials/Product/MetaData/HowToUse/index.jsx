"use client";
import { Img, Text } from "@/components/common";
import ToggleArrow from "@/components/common/AccordianToggle";
import React, { useState } from "react";

const HowToUse = ({ howToUse }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex w-full flex-col">
      <div
        className="flex w-full cursor-pointer items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          <Img
            src={howToUse.image}
            width={26}
            height={26}
            alt="logo"
            className=""
          />
          <Text as="p" size="lg" className="font-medium">
            {howToUse.title}
          </Text>
        </div>
        <ToggleArrow open={isOpen} />
      </div>
      <ul
        className={`flex flex-col gap-1.5 overflow-hidden transition-all duration-300 ease-in-out sm:gap-2 lg:gap-2.5 ${
          isOpen ? "max-h-96 py-3" : "max-h-0"
        }`}
      >
        {!!howToUse.steps &&
          howToUse.steps.map((item, index) => {
            return (
              <div className="flex items-center gap-2 md:pl-9">
                <div className="flex items-center self-start">
                  <Text as="p" size="sm" className="min-w-max">
                    Step {index + 1} :
                  </Text>
                </div>
                <div>
                  <Text as="p" size="sm" className="line-clamp-3">
                    {item}
                  </Text>
                </div>
              </div>
            );
          })}
      </ul>
    </div>
  );
};

export default HowToUse;
