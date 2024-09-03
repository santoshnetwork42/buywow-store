"use client";

import { ArrowIconSVG } from "@/assets/svg/icons";
import { Button, Text } from "@/components/elements";
import { useIsInteractive } from "@/utils/context/navbar";
import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";

const ProgressBar = React.memo(({ style }) => (
  <div className="relative h-[2px] flex-1 overflow-x-hidden rounded-xl bg-gray-300_01">
    <div className="absolute top-0 h-[2px] bg-black-900" style={style} />
  </div>
));

const Counter = React.memo(({ text }) => (
  <Text
    size="base"
    as="p"
    className="text-sm !font-medium uppercase"
    responsive
  >
    {text}
  </Text>
));

const DotButton = React.memo(({ isSelected, onClick }) => (
  <Button
    className={`mr-1.5 inline-block h-1 cursor-pointer rounded-full transition-all duration-300 ease-in-out md:h-1.5 ${
      isSelected
        ? "w-2.5 bg-black-900 md:w-3"
        : "w-1.5 bg-gray-300_01 hover:bg-gray-400"
    } `}
    size="none"
    variant="none"
    onClick={onClick}
  />
));

const SliderControl = React.memo(
  ({
    showCounter,
    showControls,
    showDotButtons,
    progressBarStyle,
    counterText,
    onPrevClick,
    onNextClick,
    dotButtons,
    className,
    size,
  }) => (
    <div className={twMerge(`flex w-full items-center`, className)}>
      {showDotButtons ? (
        <div className="flex w-full justify-center">{dotButtons}</div>
      ) : (
        <>
          <ProgressBar style={progressBarStyle} />
          <div
            className={twMerge(
              "relative m-auto ml-4 flex sm:ml-8 md:ml-12 lg:ml-16 xl:ml-20",
              size === "small" && "sm:!ml-6",
            )}
          >
            <div
              className={twMerge(
                "flex w-full items-center justify-center gap-2 sm:gap-3 lg:gap-4 xl:gap-5",
                size === "small" && "md:!gap-3",
              )}
            >
              {showCounter && <Counter text={counterText} />}
              {showControls && (
                <div
                  className={twMerge(
                    "flex flex-1 justify-center gap-2 sm:gap-3 lg:gap-4",
                    size === "small" && "!gap-2",
                  )}
                >
                  <ArrowIconSVG
                    className="size-5 cursor-pointer md:size-6 lg:size-7"
                    side="left"
                    onClick={onPrevClick}
                  />
                  <ArrowIconSVG
                    className="size-5 cursor-pointer md:size-6 lg:size-7"
                    onClick={onNextClick}
                  />
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  ),
);

const Slider = ({
  children,
  className,
  sliderClassName,
  slideClassName,
  controlsContainerClassName,
  showCounter = true,
  showControls = true,
  showDotButtons = false,
  dragFree = true,
  isContainShadow,
  size,
  ...props
}) => {
  const isInteractive = useIsInteractive();
  const [emblaRef, emblaApi] = useEmblaCarousel(
    isInteractive
      ? {
          dragFree: dragFree,
          slidesToScroll: "auto",
          inViewThreshold: 1,
        }
      : false,
    isInteractive ? [WheelGesturesPlugin()] : [],
  );

  const [sliderState, setSliderState] = useState({
    currentSlideIndex: 0,
    scrollPercentage: 0,
    totalSlides: 0,
    isAllSlidesVisible: false,
    scrollbarWidth: 0,
  });

  const updateSliderState = useCallback((updates) => {
    setSliderState((prev) => ({ ...prev, ...updates }));
  }, []);

  const handleInit = useCallback(() => {
    if (!emblaApi) return;

    const { scrollWidth, clientWidth } = emblaApi.containerNode();
    const scrollbarWidth = (clientWidth * 100) / scrollWidth;
    const totalSlides = emblaApi.scrollSnapList().length;
    const isAllSlidesVisible = totalSlides <= 1;

    updateSliderState({
      scrollbarWidth,
      totalSlides,
      isAllSlidesVisible,
      currentSlideIndex: emblaApi.selectedScrollSnap(),
    });
  }, [emblaApi, updateSliderState]);

  const handleSelect = useCallback(() => {
    if (!emblaApi) return;
    updateSliderState({ currentSlideIndex: emblaApi.selectedScrollSnap() });
  }, [emblaApi, updateSliderState]);

  const handleScroll = useCallback(() => {
    if (!emblaApi) return;
    const progress = emblaApi.scrollProgress();
    const maxScroll = 100 - sliderState.scrollbarWidth;
    const scrollPercentage = progress * maxScroll;
    updateSliderState({ scrollPercentage });
  }, [emblaApi, sliderState.scrollbarWidth, updateSliderState]);

  useEffect(() => {
    if (!isInteractive || !emblaApi) return;

    handleInit();
    emblaApi.on("init", handleInit);
    emblaApi.on("reInit", handleInit);
    emblaApi.on("select", handleSelect);
    emblaApi.on("scroll", handleScroll);

    return () => {
      emblaApi.off("init", handleInit);
      emblaApi.off("reInit", handleInit);
      emblaApi.off("select", handleSelect);
      emblaApi.off("scroll", handleScroll);
    };
  }, [isInteractive, emblaApi, handleInit, handleSelect, handleScroll]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  const {
    currentSlideIndex,
    scrollPercentage,
    totalSlides,
    isAllSlidesVisible,
    scrollbarWidth,
  } = sliderState;

  const progressBarStyle = {
    left: `${scrollPercentage}%`,
    width: `${scrollbarWidth}%`,
  };

  const counterText = `${currentSlideIndex + 1} / ${totalSlides}`;

  const dotButtons = useMemo(
    () =>
      Array.from({ length: totalSlides }, (_, index) => (
        <DotButton
          key={`dot-button-${index}`}
          isSelected={index === currentSlideIndex}
          onClick={() => scrollTo(index)}
        />
      )),
    [totalSlides, currentSlideIndex, scrollTo],
  );

  const sliderContent = (
    <div
      className={twMerge(
        "mx-auto flex max-w-fit",
        (!isAllSlidesVisible || isContainShadow) &&
          (showDotButtons
            ? "mb-2.5 sm:mb-3 md:mb-4 lg:mb-5 xl:mb-6"
            : "mb-4 lg:mb-6"),
        sliderClassName,
      )}
    >
      {React.Children.map(children, (child, index) => (
        <div key={`carousel-slide-${index}`} className={slideClassName}>
          {child}
        </div>
      ))}
    </div>
  );

  return (
    <div className={`w-full ${className}`} {...props}>
      {isInteractive ? (
        <div className="overflow-hidden" ref={emblaRef}>
          {sliderContent}
        </div>
      ) : (
        <div className="overflow-hidden">{sliderContent}</div>
      )}

      {isInteractive &&
        !isAllSlidesVisible &&
        (!!showControls || !!showCounter || !!showDotButtons) && (
          <SliderControl
            showCounter={showCounter}
            showControls={showControls}
            showDotButtons={showDotButtons}
            progressBarStyle={progressBarStyle}
            counterText={counterText}
            onPrevClick={scrollPrev}
            onNextClick={scrollNext}
            dotButtons={dotButtons}
            className={controlsContainerClassName}
            size={size}
          />
        )}
    </div>
  );
};

Slider.displayName = "Slider";
SliderControl.displayName = "SliderControl";
ProgressBar.displayName = "ProgressBar";
Counter.displayName = "Counter";
DotButton.displayName = "DotButton";

export default Slider;
