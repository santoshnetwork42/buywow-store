"use client";
import { Heading, Img, Text } from "@/components/common";
import { productBenefits } from "@/data/productData";
import React from "react";

const Benefits = ({ className, ...props }) => {
  return (
    <div
      className={`container-main flex flex-col items-center gap-4 bg-lime-50 pb-5 pt-4 sm:pb-6 md:pb-7 lg:pb-8 ${className}`}
      {...props}
    >
      <Heading as="h1" size="heading" responsive>
        Benefits
      </Heading>
      <div className="grid grid-cols-2 gap-x-4 gap-y-6 py-2 sm:gap-x-6 md:grid-cols-4 md:gap-x-7 lg:gap-x-8 xl:gap-x-9">
        {productBenefits?.map((item, index) => {
          return (
            <div
              key={`benefit-${index}`}
              className="flex max-w-72 flex-col items-center"
            >
              <Img
                src={item.image}
                width={100}
                height={96}
                className="aspect-[100/96] w-20 sm:w-[84px] md:w-[88px] lg:w-[92px] xl:w-24"
              />
              <div className="flex flex-col items-center justify-center gap-1 md:gap-2">
                <Heading
                  as="h5"
                  className="line-clamp-2 text-center text-sm"
                  size="base"
                  responsive
                >
                  {item.title}
                </Heading>
                <Text
                  as="p"
                  className="line-clamp-3 text-center"
                  size="sm"
                  responsive
                >
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
