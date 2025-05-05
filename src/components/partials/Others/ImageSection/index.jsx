"use client";

import SectionHeading from "@/components/common/SectionHeading";
import { Img } from "@/components/elements";
import Slider from "@/components/features/Slider";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

const ImageItem = ({ link, image, index }) => {
  return (
    <Link
      href={link || "#"}
      target="#"
      className="flex aspect-[4/5] h-80 items-center justify-center rounded-[8px] border-black-900 bg-gray-100 max-sm:h-60"
      onClick={() => {
        setCurrentSelectedVideo(index);
        setMuted(false);
      }}
    >
      <Img
        src={image?.url}
        width={image?.width || 200}
        height={image?.height || 200}
        alt={image?.alternativeText || "Image" + index}
        className="h-full w-full rounded-[8px]"
      />
    </Link>
  );
};

const ImageSection = ({ className, ...props }) => {
  const { title, imageItems, showImageComponentInWeb, button } = props;

  const { link, text: buttonText } = button || {};

  if (!showImageComponentInWeb) {
    return null;
  }

  return (
    <div {...props} className={twMerge(className, "container-main")}>
      <div className="mb-6 flex w-full flex-col gap-5 py-2 md:gap-6">
        <div className="flex flex-col items-center gap-1 sm:gap-2 md:gap-3 lg:gap-4">
          <SectionHeading title={title} className="sm:mb-1 lg:mb-2" />
          {buttonText && (
            <Link
              href={link}
              className="rounded-full bg-yellow-900 px-4 py-2 text-center text-white-a700_01 max-sm:mt-1 md:px-5 md:py-3"
              variant="primary"
            >
              {buttonText}
            </Link>
          )}
        </div>
        <div className="relative w-full">
          <div className="no-scrollbar flex w-full items-center justify-start gap-4 overflow-x-auto scroll-smooth px-4 pb-4">
            <Slider
              controlsContainerClassName="mb-2 md:mb-3"
              sliderClassName="gap-3 sm:gap-2 lg:gap-4"
              isContainShadow
            >
              {imageItems?.map((item, index) => (
                <div
                  className="relative flex-shrink-0 cursor-pointer overflow-hidden rounded-lg"
                  key={index}
                >
                  <ImageItem
                    link={item?.link}
                    image={item?.image?.data?.attributes}
                    index={index}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageSection;
