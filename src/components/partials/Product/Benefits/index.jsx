"use client";
import { Heading, Img, Text } from "@/components/common";
import { productBenefits } from "@/data/productData";
import React from "react";

const Benefits = () => {
  return (
    <div className="container-main bg-lime-50 py-2">
      <div className="flex w-full justify-center">
        <Heading as="h4" size="2xl" className="font-semibold">
          Benefits
        </Heading>
      </div>

      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        {productBenefits?.map((item) => {
          return (
            <div className="flex h-fit w-auto max-w-72 flex-col items-center justify-between gap-1">
              <Img
                src={item.image}
                width={30}
                height={30}
                className="mt-px h-16 w-16 sm:h-20 sm:w-20"
              />
              <div className="flex flex-col items-center justify-center gap-2">
                <Text
                  as="p"
                  className="line-clamp-2 text-center font-medium"
                  size="base"
                >
                  {item.title}
                </Text>
                <Text as="p" className="line-clamp-3 text-center" size="sm">
                  {item.description}
                </Text>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Benefits;
