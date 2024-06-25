"use client";

import { Button, Heading, Img, Text, Slider } from "@/components/common";
import ProductCarousel from "@/components/features/Carousel/ProductCarousel";
import React, { Suspense } from "react";

const NewLaunchSection = ({ newLaunchData }) => {
  return (
    <div className="flex flex-col items-center gap-3 sm:gap-4 lg:gap-5">
      <Heading size="heading6xl" as="h1" className="capitalize">
        {newLaunchData.title}
      </Heading>
      <ProductCarousel
        products={newLaunchData.productsData}
        className={"w-full"}
      />
      <Button className="rounded-[24px] bg-yellow-900 px-4 py-2 text-center max-sm:mt-1 md:px-5 md:py-3">
        <Heading
          as="span"
          size="text5xl"
          className="capitalize text-white-a700_01"
        >
          view all
        </Heading>
      </Button>
    </div>
  );
};

export default NewLaunchSection;
