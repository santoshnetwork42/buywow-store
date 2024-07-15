"use client";

import React, { useCallback, useMemo, useState, useEffect } from "react";
import { Button, Img } from "@/components/common";
import { extractAttributes } from "@/utils/helpers";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";

const CarouselImage = React.memo(({ webImage, mWebImage, link }) => {
  const {
    url: webImageUrl,
    alternativeText: webImageAlternativeText = "Carousel Banner",
  } = useMemo(() => extractAttributes(webImage), [webImage]);
  const {
    url: mWebImageUrl,
    alternativeText: mWebImageAlternativeText = "Carousel Banner",
  } = useMemo(() => extractAttributes(mWebImage), [mWebImage]);

  return (
    <Link
      href={link || "#"}
      className="relative aspect-[376/148] flex-[0_0_100%] sm:aspect-[1440/496]"
    >
      <Img
        src={webImageUrl}
        fill
        alt={webImageAlternativeText || "Carousel Banner"}
        priority
        sizes="100%"
        isStatic
        className="hidden h-auto w-full object-cover sm:block"
      />
      <Img
        src={mWebImageUrl || webImageUrl}
        fill
        alt={mWebImageAlternativeText || "Carousel Banner"}
        priority
        sizes="100%"
        isStatic
        className="block h-full w-full object-cover sm:hidden"
      />
    </Link>
  );
});

CarouselImage.displayName = "CarouselImage";

const DotButton = React.memo(({ selected, onClick }) => (
  <Button
    className={`mr-1.5 inline-block h-1 cursor-pointer rounded-full md:h-1.5 ${
      selected ? "w-3 bg-white-a700_01" : "w-1.5 bg-lime-50"
    }`}
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
    carousalBanners: banners,
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
      (index) => emblaApi && emblaApi.scrollTo(index),
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
        banners.map((banner, index) => (
          <CarouselImage key={index} {...banner} />
        )),
      [banners],
    );

    const dotButtons = useMemo(
      () =>
        banners.map((_, index) => (
          <DotButton
            key={index}
            selected={index === selectedIndex}
            onClick={() => scrollTo(index)}
          />
        )),
      [banners, selectedIndex, scrollTo],
    );

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
