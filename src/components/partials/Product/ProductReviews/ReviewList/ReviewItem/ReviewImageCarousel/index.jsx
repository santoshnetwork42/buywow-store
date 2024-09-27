"use client";

import { ArrowIconSVG } from "@/assets/svg/icons";
import { Button, Img } from "@/components/elements";
import useEmblaCarousel from "embla-carousel-react";
import React, { useCallback, useEffect, useState } from "react";

const CarouselImage = React.memo(({ src, alt }) => (
  <div className="relative flex aspect-[100/80] w-full flex-[0_0_100%] justify-center sm:aspect-[100/70] md:aspect-square">
    <Img
      src={src}
      alt={alt}
      width={400}
      height={400}
      addPrefix
      className="aspect-[100/80] h-auto w-full object-contain sm:aspect-[100/70] md:aspect-square"
      loading="lazy"
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
    <div className="relative flex h-full w-full items-center">
      <div className="h-full flex-1 overflow-hidden" ref={emblaRef}>
        <div className="flex h-full gap-3">
          {images.map((image, index) => (
            <CarouselImage
              key={`review-image-${index}`}
              src={image}
              alt={`Review image ${index + 1}`}
            />
          ))}
        </div>
      </div>
      <ArrowIconSVG
        className="absolute left-1.5 top-1/2 z-10 size-5 -translate-y-1/2 cursor-pointer rounded-full bg-white-a700/50 md:size-6 lg:size-7"
        side="left"
        onClick={scrollPrev}
      />
      <ArrowIconSVG
        className="absolute right-1 top-1/2 z-10 size-5 -translate-y-1/2 cursor-pointer rounded-full bg-white-a700/50 md:size-6 lg:size-7"
        onClick={scrollNext}
      />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 cursor-pointer">
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
