"use client";

import { Button, Heading, Img, Text, Slider } from "@/components/common";
import React, { Suspense } from "react";
// import { TabPanel, TabList, Tab, Tabs } from "react-tabs";
import ProductCarousal from "@/components/features/Carousal/ProductCarousal";
// import AutoHomepageWireframeProductCard from "@/components/AutoHomepageWireframeProductCard";

const NewLaunchSection = () => {
  const [sliderState, setSliderState] = React.useState(0);
  const sliderRef = React.useRef(null);

  return (
    <div className="flex flex-col items-center gap-[19px] self-stretch">
      <Heading
        size="heading6xl"
        as="h3"
        className="capitalize sm:text-[28px]">
        Shop new launches
      </Heading>
      <div className="mx-auto flex w-full max-w-[1324px] gap-3 md:mx-0 md:flex-col">
        <Slider
          autoPlay
          autoPlayInterval={2000}
          responsive={{
            0: { items: 1 },
            551: { items: 1 },
            1051: { items: 4 },
          }}
          disableDotsControls
          activeIndex={sliderState}
          onSlideChanged={(e) => {
            setSliderState(e?.item);
          }}
          ref={sliderRef}
          items={[...Array(12)].map(() => (
            <React.Fragment key={Math.random()}>
              <div className="px-1.5">
                <div className="bg-white-a700_01" />
              </div>
            </React.Fragment>
          ))}
        />
      </div>
      <div className="flex items-center justify-between gap-5 self-stretch md:flex-col">
        <div className="flex w-[83%] rounded-[1px] bg-gray-300_01 md:w-full">
          <div className="h-[2px] w-[33%] rounded-[1px] bg-black-900" />
        </div>
        <div className="flex w-[9%] items-center justify-center gap-[15px] md:w-full">
          <Text
            size="text3xl"
            as="p"
            className="!text-[16.33px] !font-medium uppercase">
            1 / 3
          </Text>
          <div className="flex flex-1 justify-center gap-4">
            <Button
              onClick={() => {
                sliderRef?.current?.slidePrev();
              }}
              className="flex h-[28px] w-[28px] items-center justify-center">
              <Img
                src="img_arrow_left.svg"
                width={28}
                height={28}
              />
            </Button>
            <Button
              onClick={() => {
                sliderRef?.current?.slideNext();
              }}
              className="flex h-[28px] w-[27px] items-center justify-center">
              <Img
                src="img_arrow_right.svg"
                width={27}
                height={28}
              />
            </Button>
          </div>
        </div>
      </div>
      <Button className="flex h-[49px] min-w-[112px] flex-row items-center justify-center rounded-[24px] bg-yellow-900 px-5 text-center text-xl font-medium capitalize text-white-a700_01">
        view all
      </Button>
    </div>
  );
};

export default NewLaunchSection;
