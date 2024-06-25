import { Button, Heading, Img, Text, Slider } from "@/components/common";
// import AutoHomepageWireframeProductcard2 from "@/components/AutoHomepageWireframeProductcard2";
import React, { Suspense } from "react";

const CustomerReviewSection = () => {
  return (
    <div className="flex flex-col items-center self-stretch rounded-[16px]">
      <div className="container-xs flex flex-col gap-12 md:p-5">
        <div className="flex flex-col items-center gap-[45px]">
          <Heading
            size="heading6xl"
            as="h2"
            className="sm:text-[28px]">
            Real Reviews From Real Customers
          </Heading>
          <div className="flex w-full gap-5 md:flex-col">
            <Suspense fallback={<div>Loading feed...</div>}>
              {[...Array(3)].map((d, index) => (
                <div key={"reviewList" + index} />
              ))}
            </Suspense>
          </div>
        </div>
        <div className="flex items-center justify-between gap-5 md:flex-col">
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
                className="h-[28px] w-[27px] object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerReviewSection;
