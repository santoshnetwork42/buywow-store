import React from "react";
import { Img, Button } from "@/components/elements";

const InstagramFeedItem = ({
  image,
  playButtonIcon,
  imgHeight,
  imgWidth,
  imgClassName,
  className,
  ...props
}) => {
  return (
    <div className={`overflow-hidden ${className}`} {...props}>
      <Img
        src={image.src}
        width={imgWidth}
        height={imgHeight}
        alt={image.alt}
        className={`h-auto w-full ${imgClassName}`}
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
