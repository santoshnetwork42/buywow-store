"use client";

import React, { useState, useCallback, useEffect, useMemo } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Img, Text } from "@/components/common";
import { twMerge } from "tailwind-merge";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";

const ProgressBar = React.memo(({ progressBarStyle }) => (
  <div className="relative h-[2px] flex-1 overflow-x-hidden rounded-xl bg-gray-300_01">
    <div
      className="absolute top-0 h-[2px] bg-black-900"
      style={progressBarStyle}
    />
  </div>
));

const Counter = React.memo(({ counterText }) => (
  <Text
    size="base"
    as="p"
    className="text-sm !font-medium uppercase"
    responsive
  >
    {counterText}
  </Text>
));

const SliderButton = React.memo(({ src, alt, onClick }) => (
  <Img
    src={src}
    width={28}
    height={28}
    alt={alt}
    className="aspect-square w-5 cursor-pointer md:w-6 lg:w-7"
    onClick={onClick}
  />
));

const SliderControl = React.memo(
  ({
    showCounter,
    showControls,
    progressBarStyle,
    counterText,
    scrollPrev,
    scrollNext,
  }) => (
    <div className="mt-4 flex w-full items-center lg:mt-6">
      <ProgressBar progressBarStyle={progressBarStyle} />
      <div className="relative m-auto mx-4 flex sm:mx-8 md:mx-12 lg:mx-16 xl:mx-20">
        <div className="flex w-full items-center justify-center gap-2 sm:gap-3 lg:gap-4 xl:gap-5">
          {showCounter && <Counter counterText={counterText} />}
          {showControls && (
            <div className="flex flex-1 justify-center gap-2 sm:gap-3 lg:gap-4">
              <SliderButton
                src="img_arrow_left.svg"
                alt="Previous slide"
                onClick={scrollPrev}
              />
              <SliderButton
                src="img_arrow_right_black_900.png"
                alt="Next slide"
                onClick={scrollNext}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  ),
);

const Slider = React.memo(
  ({
    children,
    className,
    sliderClassName,
    sliderItemClassName,
    showCounter = true,
    showControls = true,
    ...props
  }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel(
      {
        loop: false,
        slidesToScroll: "auto",
        align: "center",
      },
      [WheelGesturesPlugin()],
    );

    const [currentSlide, setCurrentSlide] = useState(0);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState([]);

    const scrollbarWidth = useMemo(() => {
      if (!emblaApi) return 0;
      const { scrollWidth, clientWidth } = emblaApi.containerNode();
      return (clientWidth * 100) / scrollWidth;
    }, [emblaApi]);

    const onSelect = useCallback(() => {
      if (!emblaApi) return;
      setCurrentSlide(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    const onScroll = useCallback(() => {
      if (!emblaApi) return;
      const scrollPercentage =
        emblaApi.scrollProgress() * (100 - scrollbarWidth);
      setScrollProgress(scrollPercentage);
    }, [emblaApi, scrollbarWidth]);

    useEffect(() => {
      if (!emblaApi) return;

      const handleReInit = () => setScrollSnaps(emblaApi.scrollSnapList());

      onSelect();
      onScroll();
      handleReInit();

      emblaApi.on("select", onSelect);
      emblaApi.on("scroll", onScroll);
      emblaApi.on("reInit", handleReInit);

      return () => {
        emblaApi.off("select", onSelect);
        emblaApi.off("scroll", onScroll);
        emblaApi.off("reInit", handleReInit);
      };
    }, [emblaApi, onSelect, onScroll]);

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    const progressBarStyle = useMemo(
      () => ({
        left: `${scrollProgress}%`,
        width: `${scrollbarWidth}%`,
      }),
      [scrollProgress, scrollbarWidth],
    );

    const counterText = useMemo(
      () => `${currentSlide + 1} / ${scrollSnaps.length}`,
      [currentSlide, scrollSnaps.length],
    );

    return (
      <div className={`${className} w-full`} {...props}>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className={twMerge("flex", sliderClassName)}>
            {React.Children.map(children, (child, index) => (
              <div
                key={index}
                className={twMerge("w-full", sliderItemClassName)}
              >
                {child}
              </div>
            ))}
          </div>
        </div>

        {(showControls || showCounter) && (
          <SliderControl
            showCounter={showCounter}
            showControls={showControls}
            progressBarStyle={progressBarStyle}
            counterText={counterText}
            scrollPrev={scrollPrev}
            scrollNext={scrollNext}
          />
        )}
      </div>
    );
  },
);

Slider.displayName = "Slider";
SliderControl.displayName = "SliderControl";
SliderButton.displayName = "SliderButton";
ProgressBar.displayName = "ProgressBar";
Counter.displayName = "Counter";

export default Slider;
