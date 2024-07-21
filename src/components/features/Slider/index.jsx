"use client";

import React, { useState, useCallback, useEffect, useMemo } from "react";
import { Button, Img, Text } from "@/components/common";
import { twMerge } from "tailwind-merge";
import Flickity from "react-flickity-component";

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

DotButton.displayName = "DotButton";
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
  }) => (
    <div
      className={twMerge(
        `flex w-full items-center lg:mt-6`,
        showDotButtons ? "mt-2.5 md:hidden" : "mt-4",
        className,
      )}
    >
      {showDotButtons ? (
        <div className="flex w-full justify-center">{dotButtons}</div>
      ) : (
        <>
          <ProgressBar style={progressBarStyle} />
          <div className="relative m-auto mx-4 flex sm:mx-8 md:mx-12 lg:mx-16 xl:mx-20">
            <div className="flex w-full items-center justify-center gap-2 sm:gap-3 lg:gap-4 xl:gap-5">
              {showCounter && <Counter text={counterText} />}
              {showControls && (
                <div className="flex flex-1 justify-center gap-2 sm:gap-3 lg:gap-4">
                  <SliderButton
                    src="img_arrow_left.svg"
                    alt="Previous slide"
                    onClick={onPrevClick}
                  />
                  <SliderButton
                    src="img_arrow_right_black_900.png"
                    alt="Next slide"
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

const Slider = React.memo(
  ({
    children,
    className,
    sliderClassName,
    slideClassName,
    controlsContainerClassName,
    slideAlign = "center",
    showCounter = true,
    showControls = true,
    showDotButtons = false,
    enableDragOnSingleSlide = false,
    ...props
  }) => {
    const [flickityInstance, setFlickityInstance] = useState(null);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [scrollPercentage, setScrollPercentage] = useState(0);
    const [totalSlides, setTotalSlides] = useState(0);
    const [isAllSlidesVisible, setIsAllSlidesVisible] = useState(false);
    const [scrollbarWidth, setScrollbarWidth] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    const flickityOptions = useMemo(
      () => ({
        cellAlign: slideAlign,
        contain: true,
        wrapAround: false,
        pageDots: false,
        groupCells: true,
        prevNextButtons: false,
        draggable: enableDragOnSingleSlide ? true : ">1",
      }),
      [slideAlign, enableDragOnSingleSlide],
    );

    const handleSelect = useCallback(() => {
      if (!flickityInstance) return;
      const width =
        (flickityInstance.size.width * 100) / flickityInstance.slideableWidth;
      setScrollbarWidth(width);
      setCurrentSlideIndex(flickityInstance.selectedIndex);
      setTotalSlides(flickityInstance.slides.length);
      setIsAllSlidesVisible(flickityInstance.slides.length <= 1);
    }, [flickityInstance]);

    const handleScroll = useCallback(
      (progress) => {
        if (!flickityInstance) return;
        const maxScroll = 100 - scrollbarWidth;
        setScrollPercentage(progress * maxScroll);
      },
      [flickityInstance, scrollbarWidth],
    );

    const handleDragStart = useCallback(() => {
      setIsDragging(true);
    }, []);

    const handleDragEnd = useCallback(() => {
      setTimeout(() => setIsDragging(false), 100);
    }, []);

    useEffect(() => {
      if (!flickityInstance) return;

      flickityInstance.on("select", handleSelect);
      flickityInstance.on("scroll", handleScroll);
      flickityInstance.on("dragStart", handleDragStart);
      flickityInstance.on("dragEnd", handleDragEnd);

      return () => {
        flickityInstance.off("select", handleSelect);
        flickityInstance.off("scroll", handleScroll);
        flickityInstance.off("dragStart", handleDragStart);
        flickityInstance.off("dragEnd", handleDragEnd);
      };
    }, [
      flickityInstance,
      handleSelect,
      handleScroll,
      handleDragStart,
      handleDragEnd,
    ]);

    const preventClickDuringDrag = useCallback(
      (event) => {
        if (isDragging) {
          event.preventDefault();
        }
      },
      [isDragging],
    );

    const scrollPrev = useCallback(
      () => flickityInstance?.previous(),
      [flickityInstance],
    );
    const scrollNext = useCallback(
      () => flickityInstance?.next(),
      [flickityInstance],
    );

    const progressBarStyle = useMemo(() => {
      return {
        left: `${scrollPercentage}%`,
        width: `${scrollbarWidth}%`,
      };
    }, [scrollPercentage, scrollbarWidth]);

    const counterText = useMemo(
      () => `${currentSlideIndex + 1} / ${totalSlides}`,
      [currentSlideIndex, totalSlides],
    );

    const scrollTo = useCallback(
      (index) => flickityInstance?.select(index),
      [flickityInstance],
    );

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

    return (
      <div className={`w-full ${className}`} {...props}>
        <Flickity
          elementType="div"
          options={flickityOptions}
          flickityRef={setFlickityInstance}
          className={sliderClassName}
          static
        >
          {React.Children.map(children, (child, index) => (
            <div
              key={`carousel-slide-${index}`}
              className={slideClassName}
              style={{ pointerEvents: isDragging ? "none" : "auto" }}
              onClick={preventClickDuringDrag}
            >
              {child}
            </div>
          ))}
        </Flickity>

        {!isAllSlidesVisible &&
          (showControls || showCounter || showDotButtons) && (
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
DotButton.displayName = "DotButton";

export default Slider;
