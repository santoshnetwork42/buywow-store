"use client";

import React, { useState, useRef, useEffect } from "react";
import { Img, Text } from "@/components/common";

const SliderComponent = ({ items, className, ...props }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef(null);
  const itemRef = useRef(null);

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      const maxScroll = scrollWidth - clientWidth;
      const scrollPercentage = (scrollLeft / maxScroll) * 100;
      setScrollPosition(scrollPercentage);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const scrollbarWidth = 100 / items.length; // Width of the black scrollbar
  const scrollbarPosition = (scrollPosition * (100 - scrollbarWidth)) / 100; // Position of the black scrollbar

  const currentItem = Math.min(Math.ceil((scrollPosition / 100) * items.length) + 1, items.length);

  const scrollByItem = (direction) => {
    if (containerRef.current && itemRef.current) {
      const itemWidth =
        itemRef.current.clientWidth + parseInt(getComputedStyle(itemRef.current).marginRight);
      containerRef.current.scrollBy({
        left: direction * itemWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      className={`${className}`}
      {...props}>
      <div
        ref={containerRef}
        className="w-full overflow-x-auto no-scrollbar"
        onScroll={handleScroll}>
        <div className="w-max flex relative mb-3 gap-[5px] sm:gap-2 lg:gap-3">
          {items.map((item, index) => (
            <div
              key={index}
              ref={index === 0 ? itemRef : null}
              className="flex">
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="w-full flex items-center mt-2 md:mt-3">
        <div className="flex-1 h-[2px] rounded-xl bg-gray-300_01 relative">
          <div
            className="h-[2px] bg-black-900 absolute top-0"
            style={{
              width: `${scrollbarWidth}%`,
              left: `${scrollbarPosition}%`,
              transition: "left 0.1s ease-out",
            }}
          />
        </div>
        <div className="relative m-auto flex mx-4 sm:mx-8 md:mx-12 lg:mx-16 xl:mx-20">
          <div className="flex w-full items-center justify-center gap-[15px]">
            <Text
              size="text3xl"
              as="p"
              className="!font-medium uppercase">
              {`${currentItem} / ${items.length}`}
            </Text>
            <div className="hidden sm:flex flex-1 justify-center gap-4">
              <Img
                src="img_arrow_left.svg"
                width={28}
                height={28}
                alt="Previous slide"
                className="h-[20px] w-[20px] md:h-6 md:w-6 lg:h-7 lg:w-7 cursor-pointer"
                onClick={() => scrollByItem(-1)}
              />
              <Img
                src="img_arrow_right_black_900.png"
                width={27}
                height={28}
                alt="Next slide"
                className="h-[20px] w-[20px] md:h-6 md:w-6 lg:h-7 lg:w-7 object-contain cursor-pointer"
                onClick={() => scrollByItem(1)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderComponent;
