"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Button, Img } from "@/components/common";

const Thumb = React.memo(({ isSelected, image, onClick }) => (
  <div
    className={`cursor-pointer ${isSelected ? "border border-black-900" : ""}`}
  >
    <button onClick={onClick} type="button" className="w-full p-0">
      <Img
        src={image?.imageKey}
        width={300}
        height={300}
        alt="Thumbnail"
        className="aspect-square w-full rounded-lg object-cover"
        isStatic
        addPrefix
      />
    </button>
  </div>
));

Thumb.displayName = "Thumb";

const DotButton = React.memo(({ isSelected, onClick }) => (
  <Button
    className={`mr-1.5 inline-block h-1.5 cursor-pointer rounded-full transition-all duration-300 ease-in-out ${
      isSelected ? "w-3 bg-black-900" : "w-1.5 bg-gray-300_01 hover:bg-gray-400"
    }`}
    size="none"
    variant="none"
    onClick={onClick}
  />
));

DotButton.displayName = "DotButton";

const ProductImageSection = React.memo(({ imageList }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mainViewportRef, emblaMainApi] = useEmblaCarousel({
    skipSnaps: false,
  });
  const [thumbViewportRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
    axis: "y",
  });

  const onThumbClick = useCallback(
    (index) => {
      emblaMainApi?.scrollTo(index);
    },
    [emblaMainApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi) return;
    const newIndex = emblaMainApi.selectedScrollSnap();
    setSelectedIndex(newIndex);
    emblaThumbsApi?.scrollTo(newIndex);
  }, [emblaMainApi, emblaThumbsApi]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on("select", onSelect);
    return () => emblaMainApi.off("select", onSelect);
  }, [emblaMainApi, onSelect]);

  useEffect(() => {
    const setThumbsHeight = () => {
      const mainImage = document.querySelector(".main-image-container");
      const thumbsContainer = document.querySelector(".thumbs-container");
      if (mainImage && thumbsContainer) {
        thumbsContainer.style.height = `${mainImage.offsetHeight}px`;
      }
    };

    setThumbsHeight();
    window.addEventListener("resize", setThumbsHeight);

    const images = document.querySelectorAll("img");
    const imageLoadHandler = () => setThumbsHeight();
    images.forEach((img) => {
      if (img.complete) {
        setThumbsHeight();
      } else {
        img.addEventListener("load", imageLoadHandler);
      }
    });

    return () => {
      window.removeEventListener("resize", setThumbsHeight);
      images.forEach((img) =>
        img.removeEventListener("load", imageLoadHandler),
      );
    };
  }, []);

  const renderThumbs = useMemo(
    () =>
      imageList?.map((image, index) => (
        <Thumb
          key={image?.imageKey || index}
          onClick={() => onThumbClick(index)}
          isSelected={index === selectedIndex}
          image={image}
        />
      )),
    [imageList, selectedIndex, onThumbClick],
  );

  const renderMainImages = useMemo(
    () =>
      imageList?.map((image, index) => (
        <div
          key={image?.imageKey || index}
          className="flex-[0_0_100%] overflow-hidden"
        >
          <Img
            src={image?.imageKey}
            width={620}
            height={480}
            alt={`Product image ${index + 1}`}
            isStatic
            className="m-auto aspect-square w-[calc(100%-0.5rem)] rounded-lg border object-contain shadow-sm"
            addPrefix
          />
        </div>
      )),
    [imageList],
  );

  const renderDotButtons = useMemo(
    () =>
      imageList?.map((_, index) => (
        <DotButton
          key={index}
          onClick={() => onThumbClick(index)}
          isSelected={index === selectedIndex}
        />
      )),
    [imageList, selectedIndex, onThumbClick],
  );

  if (!imageList || imageList.length === 0) {
    return null;
  }

  return (
    <div className="flex gap-4">
      <div
        className="no-scrollbar min-h-96 w-28 overflow-y-scroll max-sm:hidden"
        ref={thumbViewportRef}
      >
        <div className="thumbs-container flex flex-col gap-2">
          {renderThumbs}
        </div>
      </div>

      <div
        className="flex flex-1 flex-col items-center justify-center overflow-hidden md:gap-1"
        ref={mainViewportRef}
      >
        <div className="main-image-container flex gap-2">
          {renderMainImages}
        </div>
        <div className="mt-4 flex justify-center">{renderDotButtons}</div>
      </div>
    </div>
  );
});

ProductImageSection.displayName = "ProductImageSection";

export default ProductImageSection;
