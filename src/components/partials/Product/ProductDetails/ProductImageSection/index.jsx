import { Img } from "@/components/common";
import { useDeviceWidth } from "@/hooks/useDeviceWidth";
import React, { useState, useRef, useEffect } from "react";

const ProductImageSection = ({ imageList }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const thumbnailRefs = useRef([]);
  useEffect(() => {
    if (thumbnailRefs.current[currentIndex]) {
      thumbnailRefs.current[currentIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  }, [currentIndex]);

  const width = useDeviceWidth();
  if (!width) return;

  const isDesktop = width > 576;
  const dimensions = isDesktop
    ? { width: 620, height: 480 }
    : { width: 351, height: 303 };
  const aspectRatio = `${dimensions.width} / ${dimensions.height}`;

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  const items = imageList.map((data, index) => (
    <div
      key={index}
      className={`w-full flex-shrink-0 transform transition-transform duration-500 ${
        currentIndex === index ? "translate-x-0" : `translate-x-full`
      }`}
      style={{ display: currentIndex === index ? "block" : "none" }}
    >
      <Img
        src={data}
        width={dimensions.width}
        height={dimensions.height}
        alt={`hero image ${index}`}
        className="w-full object-contain"
        style={{ aspectRatio }}
      />
    </div>
  ));

  const thumbnailItems = imageList.map((data, index) => (
    <div
      key={index}
      className={`cursor-pointer border p-1 ${
        currentIndex === index ? "border-blue-500" : "border-transparent"
      }`}
      ref={(el) => (thumbnailRefs.current[index] = el)}
      onClick={() => handleDotClick(index)}
    >
      <Img
        src={data}
        width={351}
        height={303}
        alt={`thumbnail image ${index}`}
        style={{ aspectRatio: "351 / 303" }}
        className="aspect-square w-full object-contain"
      />
    </div>
  ));

  return (
    <div className="flex max-h-[34rem] items-center justify-center">
      <div className="hidden max-h-[34rem] flex-col gap-2 overflow-scroll py-2 sm:flex sm:w-[25%] md:w-[20%]">
        {thumbnailItems}
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="flex w-full gap-2 overflow-hidden py-2">{items}</div>
        <div className="mt-4 flex space-x-2">
          {imageList.map((_, index) => (
            <div
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-2 w-2 cursor-pointer rounded-full ${
                currentIndex === index ? "bg-gray-800" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductImageSection;
