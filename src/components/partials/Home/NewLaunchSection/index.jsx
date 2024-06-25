"use client";

import { Button, Heading, Img, Text, Slider } from "@/components/common";
import ProductCarousel from "@/components/features/Carousel/ProductCarousel";
import React, { Suspense } from "react";

const NewLaunchSection = ({ newLaunchData }) => {
  return (
    <div className="flex flex-col items-center gap-3 sm:gap-4 lg:gap-5">
      <Heading
        size="heading6xl"
        as="h1"
        className="capitalize">
        {newLaunchData.title}
      </Heading>
      <ProductCarousel
        products={newLaunchData.productsData}
        className={"w-full"}
      />
      <Button className="rounded-[24px] max-sm:mt-1 bg-yellow-900 text-center py-2 px-4 md:py-3 md:px-5">
        <Heading
          as="span"
          size="text5xl"
          className="text-white-a700_01 capitalize">
          view all
        </Heading>
      </Button>
    </div>
  );
};

export default NewLaunchSection;
