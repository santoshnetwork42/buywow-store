import { Button, Heading, Img, Text, Slider } from "@/components/common";
// import AutoHomepageWireframeUserprofile from "@/components/AutoHomepageWireframeUserprofile";
import React, { Suspense } from "react";

const ConcernSection = () => {
  return (
    <div className="self-stretch">
      <div className="flex flex-col items-center justify-center gap-[21px]">
        <Heading
          size="heading6xl"
          as="h2"
          className="capitalize sm:text-[28px]">
          shop by concern
        </Heading>
        <div className="flex w-full gap-2.5 md:flex-col">
          <Suspense fallback={<div>Loading feed...</div>}>
            {[...Array(5)].map((d, index) => (
              <div key={"frame1400005608" + index} />
            ))}
          </Suspense>
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
              <Img
                src="img_arrow_left.svg"
                width={28}
                height={28}
                alt="left arrow"
                className="h-[28px] w-[28px]"
              />
              <Img
                src="img_arrow_right_black_900.png"
                width={27}
                height={28}
                alt="right arrow"
                className="h-[28px] w-[27px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConcernSection;
