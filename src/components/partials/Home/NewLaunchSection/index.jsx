"use client";

import { Button, Heading, Img, Text, Slider } from "@/components/common";
import React, { Suspense } from "react";
import ProductCarousal from "@/components/features/Carousal/ProductCarousal";

const NewLaunchSection = ({ newLaunchData }) => {
  const [sliderState, setSliderState] = React.useState(0);
  const sliderRef = React.useRef(null);

  return (
    <div className="flex flex-col items-center gap-3 sm:gap-4 lg:gap-5">
      <Heading
        size="heading6xl"
        as="h1"
        className="capitalize">
        {newLaunchData.title}
      </Heading>
      <div className="mx-auto flex w-full max-w-[1324px] gap-3 md:mx-0 md:flex-col">
        <ProductCarousal
          products={newLaunchData.productsData}
          className={"w-full"}
        />
      </div>
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
