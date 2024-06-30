// src/components/VideoSection.jsx
import { Button, Heading } from "@/components/common";
import InstagramFeedItem from "@/components/features/Card/InstagramFeedCard";
import React from "react";

const VideoSection = ({ sectionData, className, ...props }) => {
  const { title, buttonText, images, playButtonIcon } = sectionData;

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
        <div className="no-scrollbar w-full overflow-x-auto">
          <div className="m-auto flex w-max gap-3 md:gap-4">
            {images.map((image, index) => (
              <InstagramFeedItem
                key={image.id}
                image={image}
                playButtonIcon={playButtonIcon}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSection;
