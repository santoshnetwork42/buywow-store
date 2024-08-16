"use client";

import { Button, Img } from "@/components/elements";
import useEmblaCarousel from "embla-carousel-react";
import React, { useCallback, useEffect, useState } from "react";

const CarouselImage = React.memo(({ src, alt }) => (
  <div className="relative block aspect-square w-full flex-[0_0_100%]">
    <Img
      src={src}
      alt={alt}
      fill
      isStatic
      addPrefix
      className="h-auto w-full object-contain"
    />
  </div>
));

CarouselImage.displayName = "CarouselImage";

const DotButton = React.memo(({ selected, onClick }) => (
  <Button
    className={`mr-1.5 inline-block h-1.5 cursor-pointer rounded-full transition-all duration-300 ease-in-out ${
      selected ? "w-3 bg-gray-600" : "w-1.5 bg-gray-400 hover:bg-gray-500"
    }`}
    size="none"
    variant="none"
    onClick={onClick}
  />
));

DotButton.displayName = "DotButton";

const SliderButton = React.memo(({ src, alt, onClick, className }) => (
  <Button
    className={`absolute top-1/2 z-10 -translate-y-1/2 bg-white-a700/30 p-1 ${className}`}
    onClick={onClick}
    enableRipple={false}
  >
    <Img
      src={src}
      width={28}
      height={28}
      alt={alt}
      className="aspect-square w-5 cursor-pointer md:w-6 lg:w-7"
    />
  </Button>
));

SliderButton.displayName = "SliderButton";

const ReviewImageCarousel = ({ images, initialSlide = 0 }) => {
  const [selectedIndex, setSelectedIndex] = useState(initialSlide);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    startIndex: initialSlide,
    align: "center",
  });

  const scrollTo = useCallback(
    (index) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi],
  );

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi, onSelect]);

  if (!images || images.length === 0) return null;

  return (
    <div className="relative w-full">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-3">
          {images.map((image, index) => (
            <CarouselImage
              key={`review-image-${index}`}
              src={image}
              alt={`Review image ${index + 1}`}
            />
          ))}
        </div>
      </div>
      <SliderButton
        src="img_arrow_left.svg"
        alt="Previous slide"
        onClick={scrollPrev}
        className="left-0"
      />
      <SliderButton
        src="img_arrow_right_black_900.png"
        alt="Next slide"
        onClick={scrollNext}
        className="right-0"
      />
      <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 cursor-pointer">
        {images.map((_, index) => (
          <DotButton
            key={`dot-button-${index}`}
            selected={index === selectedIndex}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ReviewImageCarousel;
