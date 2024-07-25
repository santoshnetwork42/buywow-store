"use client";
import { Img, Text } from "@/components/common";
import ToggleArrow from "@/components/common/AccordionToggle";
import React, { useState } from "react";

const Ingredients = ({ ingredients }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex w-full flex-col">
      <div
        className="flex w-full cursor-pointer items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          <Img
            src={ingredients.image}
            width={26}
            height={26}
            alt="logo"
            className=""
          />
          <Text as="p" size="lg" className="font-medium">
            {ingredients.title}
          </Text>
        </div>
        <ToggleArrow open={isOpen} />
      </div>
      <ul
        className={`flex flex-col gap-1.5 overflow-hidden transition-all duration-300 ease-in-out sm:gap-2 lg:gap-2.5 ${
          isOpen ? "max-h-96 py-3" : "max-h-0"
        }`}
      >
        {!!ingredients.data &&
          ingredients.data.map((item, index) => {
            return (
              <IngredientsData
                key={`ingredient-${index}`}
                image={item.image}
                description={item.description}
              />
            );
          })}
      </ul>
    </div>
  );
};

const IngredientsData = ({ image = "", description = "" }) => {
  return (
    <div className="flex items-center gap-2 md:pl-9">
      <Img src={image} width={22} height={22} alt="logo" className="" />
      <div className="flex">
        <Text as="span" size="sm" className="">
          {description}
        </Text>
      </div>
    </div>
  );
};
export default Ingredients;
