import { Button, Heading, Img, Text, Slider } from "@/components/common";
import AutoHomepageWireframeKeywords from "@/components/common/partials/DeliveryInfoSection";
// import AutoHomepageWireframeUserprofile1 from "@/components/AutoHomepageWireframeUserprofile1";
import VideoSection from "@/components/partials/Home/VideoSection";
import React, { Suspense } from "react";

const BlogSection = () => {
  return (
    <div className="self-stretch">
      <div className="flex flex-col items-center justify-center gap-[18px]">
        <Heading
          size="heading6xl"
          as="h2"
          className="capitalize sm:text-[28px]">
          explore blogs
        </Heading>
        <div className="flex flex-col items-center gap-6 self-stretch">
          <div className="flex gap-2.5 self-stretch md:flex-col">
            <Suspense fallback={<div>Loading feed...</div>}>
              {[...Array(3)].map((d, index) => (
                <div key={"blogList" + index} />
              ))}
            </Suspense>
          </div>
          <Button className="flex h-[49px] min-w-[137px] flex-row items-center justify-center rounded-[24px] bg-yellow-900 px-5 text-center text-xl font-medium capitalize text-white-a700_01">
            read more
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlogSection;
