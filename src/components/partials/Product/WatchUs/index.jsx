"use client";

import { Heading } from "@/components/common";
import InstagramFeedItem from "@/components/features/Card/InstagramFeedCard";
import SliderComponent from "@/components/features/Slider";
import React from "react";

const WatchUs = ({ data, className, ...props }) => {
  const { title, images, playButtonIcon } = data;

  const watchUsItem = images.map((image, index) => (
    <InstagramFeedItem
      key={image.id}
      image={image}
      playButtonIcon={playButtonIcon}
      imgClassName="aspect-[167/268] sm:aspect-[270/395] object-cover"
      imgHeight={395}
      imgWidth={270}
      className="relative w-full max-w-[167px] overflow-hidden rounded-lg sm:w-[33vw] sm:max-w-[270px] md:w-[27vw] lg:w-[25vw]"
    />
  ));

  return (
    <div
      className={`container-main flex w-full flex-col items-center justify-center gap-4 bg-lime-50 pb-4 pt-3 md:gap-5 md:pb-5 md:pt-4 ${className}`}
      {...props}
    >
      <Heading size="heading" as="h1" responsive>
        {title}
      </Heading>
      <SliderComponent
        items={watchUsItem}
        renderItem={(item, index) => (
          <div key={index} className="p-2">
            {item}
          </div>
        )}
        showCounter
        showControls
        sliderClassName="gap-3 md:gap-4"
      />
    </div>
  );
};

export default WatchUs;
