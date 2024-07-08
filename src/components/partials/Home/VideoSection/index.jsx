// src/components/VideoSection.jsx
"use client";

import React from "react";
import { Button, Heading } from "@/components/common";
import InstagramFeedItem from "@/components/features/Card/InstagramFeedCard";
import SliderComponent from "@/components/features/Slider/SliderScroll";

const VideoSection = ({ sectionData, className, ...props }) => {
  const { title, buttonText, images, playButtonIcon } = sectionData;

  const renderInstagramFeedItem = (image) => (
    <InstagramFeedItem
      key={image.id}
      image={image}
      playButtonIcon={playButtonIcon}
      imgClassName="aspect-[334/320]"
      imgHeight={320}
      imgWidth={334}
      className="relative w-[70vw] max-w-[250px] overflow-hidden rounded-lg sm:w-[42vw] sm:max-w-[334px] md:w-[36vw] lg:w-[30vw]"
    />
  );

  return (
    <div {...props} className={className}>
      <div className="flex w-full flex-col items-center gap-5 md:gap-6">
        <div className="flex flex-col items-center gap-1 sm:gap-2 md:gap-3 lg:gap-4">
          <Heading size="heading" as="h1" responsive>
            {title}
          </Heading>
          <Button className="rounded-full bg-yellow-900 px-4 py-2 text-center max-sm:mt-1 md:px-5 md:py-3">
            {buttonText}
          </Button>
        </div>
        <SliderComponent
          items={images}
          renderItem={renderInstagramFeedItem}
          sliderClassName="gap-3 md:gap-4"
          showCounter={false}
          showControls={false}
        />
      </div>
    </div>
  );
};

export default VideoSection;
