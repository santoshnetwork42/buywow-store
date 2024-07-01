// src/components/InstagramFeedItem.jsx
import React from "react";
import { Img, Button } from "@/components/common";

const InstagramFeedItem = ({ image, playButtonIcon }) => {
  return (
    <div className="relative w-[70vw] max-w-[250px] overflow-hidden rounded-lg sm:w-[42vw] sm:max-w-[334px] md:w-[36vw] lg:w-[30vw]">
      <Img
        src={image.src}
        width={image.width}
        height={image.height}
        alt={image.alt}
        className="aspect-[334/320] h-auto w-full rounded-lg"
      />
      <Button className="absolute inset-0 m-auto flex h-10 w-10 items-center justify-center rounded-full border border-solid border-black-900 bg-transparent p-2 sm:h-12 sm:w-12 sm:p-2.5 md:h-14 md:w-14 md:p-3 lg:h-16 lg:w-16 lg:p-4">
        <Img
          src={playButtonIcon}
          width={38}
          height={38}
          alt="play button"
          className={"ml-1 aspect-square w-full rounded-sm"}
        />
      </Button>
    </div>
  );
};

export default InstagramFeedItem;
