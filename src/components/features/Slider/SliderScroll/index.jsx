"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useDeviceWidth } from "@/utils/hooks/useDeviceWidth";
import { Img, Text } from "@/components/common";
import { twMerge } from "tailwind-merge";

const SliderComponent = React.memo(
  ({
    items,
    className,
    sliderClassName,
    renderItem,
    tag,
    showCounter = true,
    showControls = true,
    snapType = "snap-mandatory",
    snapAlign = "snap-center",
    snapAlways = true,
    ...props
  }) => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [currentItem, setCurrentItem] = useState(1);
    const [visibleItems, setVisibleItems] = useState(1);
    const containerRef = useRef(null);
    const itemRef = useRef(null);
    const width = useDeviceWidth();

    const calculateVisibleItems = useCallback(() => {
      if (containerRef.current && itemRef.current && width) {
        const containerWidth = containerRef.current.offsetWidth;
        const itemWidth = itemRef.current.offsetWidth;
        const calculatedVisibleItems = Math.floor(containerWidth / itemWidth);
        setVisibleItems(Math.max(1, calculatedVisibleItems));
      }
    }, [width]);

    const handleScroll = useCallback(() => {
      if (containerRef.current && itemRef.current && width) {
        const { scrollLeft, clientWidth } = containerRef.current;
        const itemWidth = itemRef.current.offsetWidth;
        const centerPosition = scrollLeft + clientWidth / 2;
        const currentGroupIndex = Math.floor(centerPosition / itemWidth);

        const totalGroups = Math.ceil(items.length / visibleItems);
        const lastGroupTotalItems = items.length % visibleItems || visibleItems;

        const isLastGroupVisible =
          scrollLeft + clientWidth >=
          (totalGroups - 1) * itemWidth +
            (itemWidth * lastGroupTotalItems) / visibleItems;

        setCurrentItem(
          isLastGroupVisible ? totalGroups : currentGroupIndex + 1,
        );

        const scrollWidth = containerRef.current.scrollWidth - clientWidth;
        const scrollPercentage = (scrollLeft / scrollWidth) * 100;
        setScrollPosition(scrollPercentage);
      }
    }, [items.length, visibleItems, width]);

    useEffect(() => {
      const container = containerRef.current;
      if (container) {
        container.addEventListener("scroll", handleScroll);
        return () => container.removeEventListener("scroll", handleScroll);
      }
    }, [handleScroll]);

    useEffect(() => {
      calculateVisibleItems();
      window.addEventListener("resize", calculateVisibleItems);
      return () => window.removeEventListener("resize", calculateVisibleItems);
    }, [calculateVisibleItems]);

    const chunks = useCallback((arr, size) => {
      return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
        arr.slice(i * size, i * size + size),
      );
    }, []);

    const groupedItems = useMemo(
      () => chunks(items, visibleItems),
      [items, visibleItems, chunks],
    );

    const scrollbarWidth = useMemo(
      () => (groupedItems.length > 0 ? (100 / items.length) * visibleItems : 0),
      [groupedItems.length, items.length, visibleItems],
    );

    const scrollbarPosition = useMemo(
      () => (scrollPosition * (100 - scrollbarWidth)) / 100,
      [scrollPosition, scrollbarWidth],
    );

    const scrollByItem = useCallback((direction) => {
      if (containerRef.current && itemRef.current) {
        const itemWidth = itemRef.current.offsetWidth;
        containerRef.current.scrollBy({
          left: direction * itemWidth,
          behavior: "smooth",
        });
      }
    }, []);

    return (
      <div className={`${className} w-full`} {...props}>
        <div
          ref={containerRef}
          className={`no-scrollbar w-full overflow-x-auto ${groupedItems.length > 1 && (showControls || showCounter) && "pb-3"} ${
            snapType !== "none" ? `snap-x ${snapType}` : ""
          }`}
          onScroll={handleScroll}
        >
          <div
            className={`relative m-auto flex w-max ${twMerge("gap-[5px] sm:gap-2 lg:gap-3", sliderClassName)}`}
          >
            {groupedItems.map((group, groupIndex) => (
              <div
                key={groupIndex}
                ref={groupIndex === 0 ? itemRef : null}
                className={`flex ${
                  snapType !== "none"
                    ? `${snapAlign} ${snapAlways ? "snap-always" : ""}`
                    : ""
                } ${sliderClassName || "gap-[5px] sm:gap-2 lg:gap-3"}`}
              >
                {group.map((item, itemIndex) =>
                  renderItem
                    ? renderItem(item, `${groupIndex}-${itemIndex}`)
                    : item,
                )}
              </div>
            ))}
          </div>
        </div>

        {groupedItems.length > 1 && (showControls || showCounter) && (
          <div className="mt-2 flex w-full items-center md:mt-3">
            <div className="relative h-[2px] flex-1 overflow-x-hidden rounded-xl bg-gray-300_01">
              <div
                className="absolute top-0 h-[2px] bg-black-900"
                style={{
                  width: `${scrollbarWidth}%`,
                  left: `${scrollbarPosition}%`,
                  transition: "left 0.1s ease-out",
                }}
              />
            </div>
            <div className="relative m-auto mx-4 flex sm:mx-8 md:mx-12 lg:mx-16 xl:mx-20">
              <div className="flex w-full items-center justify-center gap-2 sm:gap-3 lg:gap-4 xl:gap-5">
                {showCounter && (
                  <Text
                    size="base"
                    as="p"
                    className="text-sm !font-medium uppercase"
                    responsive
                  >
                    {`${currentItem} / ${groupedItems.length}`}
                  </Text>
                )}
                {showControls && (
                  <div className="flex flex-1 justify-center gap-2 sm:gap-3 lg:gap-4">
                    <Img
                      src="img_arrow_left.svg"
                      width={28}
                      height={28}
                      alt="Previous slide"
                      className="aspect-square w-5 cursor-pointer md:w-6 lg:w-7"
                      onClick={() => scrollByItem(-1)}
                    />
                    <Img
                      src="img_arrow_right_black_900.png"
                      width={28}
                      height={28}
                      alt="Next slide"
                      className="aspect-square w-5 cursor-pointer md:w-6 lg:w-7"
                      onClick={() => scrollByItem(1)}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  },
);

SliderComponent.displayName = "SliderComponent";

export default SliderComponent;
