"use client";

import { Button, Img } from "@/components/elements";
import { useEventsDispatch } from "@/store/sagas/dispatch/events.dispatch";
import { useIsInteractive } from "@/utils/context/navbar";
import { extractAttributes, getSource } from "@/utils/helpers";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const CarouselImage = React.memo(
  ({ webImage, mWebImage, link, index, moeText, isInteractive }) => {
    const webImageAttrs = extractAttributes(webImage);
    const mWebImageAttrs = extractAttributes(mWebImage);

    const imageUrl = mWebImageAttrs?.url || webImageAttrs?.url;
    const imageAlt =
      mWebImageAttrs?.alternativeText ||
      webImageAttrs?.alternativeText ||
      "Carousel Banner";

    const { bannerClicked } = useEventsDispatch();
    const source = getSource();

    if (!webImageAttrs.url && !mWebImageAttrs.url) return null;

    return (
      <Link
        prefetch={false}
        href={link || "#"}
        className="w-full flex-[0_0_100%]"
        onClick={() => {
          bannerClicked({
            Source: source,
            item_id: index,
            banner_name: moeText || link || "#",
            banner_link: link || "#",
          });
        }}
      >
        <picture className="relative block w-full">
          {!!webImageAttrs.url && (
            <source
              media="(min-width: 576px)"
              srcSet={`${webImageAttrs.url}?w=1920&q=75&f=webp`}
            />
          )}
          <Img
            src={imageUrl}
            alt={imageAlt}
            priority
            quality={55}
            width={300}
            height={300}
            className="h-auto w-full object-cover"
          />
        </picture>
      </Link>
    );
  },
);

CarouselImage.displayName = "CarouselImage";

const DotButton = React.memo(({ selected, onClick }) => (
  <Button
    className={`mr-1.5 inline-block h-1 cursor-pointer rounded-full transition-all duration-300 ease-in-out ${selected ? "w-2.5 bg-white-a700_01 md:w-3" : "w-1 bg-lime-50 hover:bg-lime-100 md:w-1.5"} `}
    size="none"
    variant="none"
    onClick={onClick}
  />
));

DotButton.displayName = "DotButton";

const Carousel = ({
  autoPlay = false,
  autoPlayInterval = 3000,
  stopOnInteraction = false,
  carousalItems: banners,
  isPersistLoading = false,
}) => {
  const pathname = usePathname();
  const isInteractive = useIsInteractive();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    autoPlay && isInteractive
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

  const carouselImages = useMemo(() => {
    const imagesToRender = isInteractive ? banners : [banners[0]];

    return imagesToRender.map((banner, index) => (
      <CarouselImage
        key={`carousel-image-${banner.id || index}`}
        {...banner}
        index={index}
        isInteractive={isInteractive}
      />
    ));
  }, [banners, isInteractive]);

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

  if (!banners?.length || (isPersistLoading && pathname !== "/")) return null;

  return (
    <div className="relative mb-5 w-full sm:mb-6 md:mb-7 lg:mb-8">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">{carouselImages}</div>
      </div>
      {(isInteractive || pathname !== "/") && (
        <div className="absolute bottom-1.5 left-1/2 flex -translate-x-1/2 cursor-pointer sm:bottom-2 md:bottom-2.5 lg:bottom-3">
          {dotButtons}
        </div>
      )}
    </div>
  );
};

export default Carousel;
