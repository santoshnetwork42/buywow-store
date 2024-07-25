"use client";
import { Img, Text } from "@/components/common";
import ToggleArrow from "@/components/common/AccordionToggle";
import Divider from "@/components/common/Divider";
import PlusMinusToggle from "@/components/common/PlusMinusToggle";
import React, { useState } from "react";

const Faqs = ({ faqs }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex w-full flex-col">
      <div
        className="flex w-full cursor-pointer items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          <Img
            src={faqs.image}
            width={26}
            height={26}
            alt="logo"
            className=""
          />
          <Text as="p" size="lg" className="font-medium">
            {faqs.title}
          </Text>
        </div>
        <ToggleArrow open={isOpen} />
      </div>
      <ul
        className={`flex flex-col gap-1.5 overflow-hidden transition-all duration-300 ease-in-out sm:gap-2 lg:gap-2.5 ${
          isOpen ? "max-h-96 py-3" : "max-h-0"
        }`}
      >
        {!!faqs.data &&
          faqs.data.map((faq, index) => {
            const showDivider =
              faqs.data.length > 1 && index !== faqs.data.length - 1;
            return (
              <div className="flex flex-col gap-3 md:pl-9" key={index}>
                <FaqData question={faq.question} answer={faq.answer} />
                {showDivider && (
                  <Divider className="h-[0.05rem] w-full bg-gray-300" />
                )}
              </div>
            );
          })}
      </ul>
    </div>
  );
};

const FaqData = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex w-full flex-col">
      <div
        className="flex w-full items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Text as="p" size="sm">
          {question}
        </Text>
        <PlusMinusToggle open={isOpen} />
      </div>
      <ul
        className={`flex flex-col gap-1.5 overflow-hidden transition-all duration-300 ease-in-out sm:gap-2 lg:gap-2.5 ${
          isOpen ? "max-h-96 py-3" : "max-h-0"
        }`}
      >
        <Text as="p" size="sm">
          {answer}
        </Text>
      </ul>
    </div>
  );
};
export default Faqs;
