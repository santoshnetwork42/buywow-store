"use client";
import { Img, Text } from "@/components/common";
import { productData } from "@/data/productData";
import React from "react";

const HighLights = () => {
  const { highLights } = productData[0];
  return (
    <div className="flex justify-evenly">
      {highLights?.map((item) => {
        return (
          <div className="flex h-fit w-auto max-w-12 flex-col items-center justify-between gap-1">
            <Img
              src={item.image}
              width={30}
              height={30}
              className="h-12 w-16"
            />
            <Text
              as="p"
              className="line-clamp-2 text-center font-light"
              size="sm"
            >
              {item.title}
            </Text>
          </div>
        );
      })}
    </div>
  );
};
export default HighLights;
