"use client";

import React, { useMemo, useCallback, useState, memo, useRef } from "react";
import { Img, Slider } from "@/components/common";
import { extractAttributes } from "@/utils/helpers";

const CarouselImage = memo(({ webImage, mWebImage, link, onMouseEvents }) => {
  const {
    url: webImageUrl,
    alternativeText: webImageAlternativeText = "Carousel Banner",
  } = extractAttributes(webImage);
  const {
    url: mWebImageUrl,
    alternativeText: mWebImageAlternativeText = "Carousel Banner",
  } = extractAttributes(mWebImage);

  return (
    <div
      className="relative aspect-[376/148] w-full sm:aspect-[1440/496]"
      {...onMouseEvents(link)}
      draggable={false}
    >
      <Img
        src={webImageUrl || mWebImageUrl}
        fill
        alt={webImageAlternativeText}
        priority
        sizes="100%"
        isStatic
        className="hidden h-auto w-full object-cover sm:block"
      />
      <Img
        src={mWebImageUrl || webImageUrl}
        fill
        alt={mWebImageAlternativeText}
        priority
        sizes="100%"
        isStatic
        className="block h-full w-full object-cover sm:hidden"
      />
    </div>
  );
});

CarouselImage.displayName = "CarouselImage";

const DotItem = memo(({ isActive }) => (
  <div
    className={`mr-1.5 inline-block h-1.5 cursor-pointer rounded-[3px] ${
      isActive ? "w-3 bg-white-a700_01" : "w-1.5 bg-lime-50"
    }`}
  />
));

DotItem.displayName = "DotItem";

const CarouselBanner = memo(
  ({
    autoPlay,
    autoPlayInterval = 3000,
    carousalBanners: banners,
    ...props
  }) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleMouseDown = useCallback(() => setIsDragging(false), []);
    const handleMouseMove = useCallback(() => setIsDragging(true), []);

    const handleMouseUp = useCallback(
      (link) => () => {
        if (!isDragging) {
          window.location.href = link;
        }
      },
      [isDragging],
    );

    const onMouseEvents = useCallback(
      (link) => ({
        onMouseDown: handleMouseDown,
        onMouseMove: handleMouseMove,
        onMouseUp: handleMouseUp(link),
      }),
      [handleMouseDown, handleMouseMove, handleMouseUp],
    );

    const items = useMemo(
      () =>
        banners.map((banner, index) => (
          <CarouselImage
            key={index}
            {...banner}
            onMouseEvents={onMouseEvents}
          />
        )),
      [banners, onMouseEvents],
    );

    const renderDotsItem = useCallback(
      ({ isActive }) => <DotItem isActive={isActive} />,
      [],
    );

    return (
      <div
        className={`intro-carousal-container relative w-full ${props.className}`}
        {...props}
      >
        <Slider
          items={items}
          autoPlay={autoPlay}
          autoPlayInterval={autoPlayInterval}
          infinite={true}
          renderDotsItem={renderDotsItem}
          // animationDuration={600}
          disableDotsControls={false}
          disableButtonsControls={true}
          touchTracking={true}
          mouseTracking={true}
        />
      </div>
    );
  },
);

CarouselBanner.displayName = "CarouselBanner";

export default CarouselBanner;
