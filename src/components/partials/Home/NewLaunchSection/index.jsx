"use client";

import { Button, Heading } from "@/components/common";
import ProductCarousel from "@/components/features/Carousel/ProductCarousel";
import React from "react";

const NewLaunchSection = ({ newLaunchData }) => {
  return (
    <div className="flex flex-col items-center gap-3 sm:gap-4 lg:gap-5">
      <Heading size="heading" as="h1" responsive>
        {newLaunchData.title}
      </Heading>
      <ProductCarousel
        products={newLaunchData.productsData}
        className={"w-full"}
      />
      <Button className="rounded-[24px] bg-yellow-900 px-4 py-2 text-center max-sm:mt-1 md:px-5 md:py-3">
        <Heading as="h3" size="xl" className="text-white-a700_01" responsive>
          view all
        </Heading>
      </Button>
    </div>
  );
};

export default NewLaunchSection;
