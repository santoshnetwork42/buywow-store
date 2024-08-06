"use client";

import React, { useCallback, useMemo, useState, useEffect } from "react";
import { Button, Img } from "@/components/elements";
import { extractAttributes } from "@/utils/helpers";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";

const CarouselImage = React.memo(({ webImage, mWebImage, link }) => {
  const webImageAttrs = extractAttributes(webImage);
  const mWebImageAttrs = extractAttributes(mWebImage);

  if (!webImageAttrs.url && !mWebImageAttrs.url) return null;

  const imageUrl = mWebImageAttrs.url || webImageAttrs.url;
  const imageAlt =
    mWebImageAttrs.alternativeText ||
    webImageAttrs.alternativeText ||
    "Carousel Banner";

  return (
    <Link href={link || "#"} className="flex-[0_0_100%]">
      <picture className="relative block aspect-[376/148] w-full sm:aspect-[1440/496]">
        {!!webImageAttrs.url && (
          <source media="(min-width: 576px)" srcSet={webImageAttrs.url} />
        )}
        <Img
          src={imageUrl}
          alt={imageAlt}
          priority
          sizes="100vw"
          fill
          isStatic
          className="h-auto w-full object-cover"
        />
      </picture>
    </Link>
  );
});

CarouselImage.displayName = "CarouselImage";

const DotButton = React.memo(({ selected, onClick }) => (
  <Button
    className={`mr-1.5 inline-block h-1 cursor-pointer rounded-full transition-all duration-300 ease-in-out md:h-1.5 ${selected ? "w-2.5 bg-white-a700_01 md:w-3" : "w-1.5 bg-lime-50 hover:bg-lime-100"} `}
    size="none"
    variant="none"
    onClick={onClick}
  />
));

DotButton.displayName = "DotButton";

const Carousel = React.memo(
  ({
    autoPlay = false,
    autoPlayInterval = 3000,
    stopOnInteraction = false,
    carousalItems: banners,
    ...props
  }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const [emblaRef, emblaApi] = useEmblaCarousel(
      { loop: true },
      autoPlay
        ? [Autoplay({ delay: autoPlayInterval, stopOnInteraction })]
        : [],
    );

    const scrollTo = useCallback(
      (index) => emblaApi?.scrollTo(index),
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

    const carouselImages = useMemo(
      () =>
        banners?.map((banner, index) => (
          <CarouselImage key={`carousel-image-${index}`} {...banner} />
        )),
      [banners],
    );

    const dotButtons = useMemo(
      () =>
        banners?.map((_, index) => (
          <DotButton
            key={`dot-button-${index}`}
            selected={index === selectedIndex}
            onClick={() => scrollTo(index)}
          />
        )),
      [banners, selectedIndex, scrollTo],
    );

    if (!banners?.length) return null;

    return (
      <div
        className={`relative mb-5 w-full sm:mb-6 md:mb-7 lg:mb-8 ${props.className}`}
        {...props}
      >
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">{carouselImages}</div>
        </div>
        <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 cursor-pointer sm:bottom-1 md:bottom-1.5 lg:bottom-2 xl:bottom-2.5">
          {dotButtons}
        </div>
      </div>
    );
  },
);

Carousel.displayName = "Carousel";

export default Carousel;
