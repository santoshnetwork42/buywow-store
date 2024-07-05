"use client";

import { Button, Img } from "@/components/common";
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

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  const handlePrevClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNextClick = () => {
    if (currentIndex < imageList.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const items = imageList.map((data, index) => (
    <div
      key={index}
      className={`w-full transition-opacity duration-500`}
      style={{
        display: currentIndex === index ? "block" : "none",
      }}
    >
      <Img
        src={data}
        width={dimensions.width}
        height={dimensions.height}
        alt={`hero image ${index}`}
        className="aspect-square w-full object-contain"
      />
    </div>
  ));

  const thumbnailItems = imageList.map((data, index) => (
    <div
      key={index}
      className={`cursor-pointer border p-1 ${
        currentIndex === index
          ? "border-blue-500 transition-all duration-300"
          : "border-transparent"
      }`}
      ref={(el) => (thumbnailRefs.current[index] = el)}
      onClick={() => handleDotClick(index)}
    >
      <Img
        src={data}
        width={351}
        height={303}
        alt={`thumbnail image ${index}`}
        className="aspect-square w-full object-contain"
      />
    </div>
  ));

  return (
    <div className="flex max-h-[34rem] items-center justify-center gap-2">
      <div className="no-scrollbar hidden max-h-[32rem] shrink-0 flex-col gap-2 overflow-scroll py-2 sm:flex sm:w-[18%] md:w-[25%] lg:w-[18%]">
        {thumbnailItems}
      </div>
      <div className="relative flex flex-col items-center justify-center">
        <div className="flex w-full gap-2 overflow-hidden py-2">{items}</div>
        <div className="absolute left-0">
          <Button
            className="hidden border border-gray-500 bg-transparent px-4 text-gray-800 shadow shadow-stone-300 hover:bg-transparent sm:block"
            onClick={handlePrevClick}
            enableRipple={false}
          >
            L
          </Button>
        </div>
        <div className="absolute right-0">
          <Button
            className="hidden border border-gray-500 bg-transparent px-4 text-gray-800 shadow shadow-stone-300 hover:bg-transparent sm:block"
            onClick={handleNextClick}
            enableRipple={false}
          >
            R
          </Button>
        </div>
        <div className="mt-4 flex space-x-2 sm:hidden">
          {imageList.map((_, index) => (
            <div
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-2 w-2 cursor-pointer rounded-full ${
                currentIndex === index
                  ? "w-4 bg-gray-800 transition-all duration-300"
                  : "bg-gray-400 transition-all duration-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductImageSection;
