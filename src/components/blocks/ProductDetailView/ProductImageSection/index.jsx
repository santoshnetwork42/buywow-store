"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
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

  const mainContainerRef = useRef(null);
  const mainImageContainerRef = useRef(null);
  const thumbsContainerRef = useRef(null);

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

  const setThumbsHeight = useCallback(() => {
    const mainContainer = mainContainerRef.current;
    const mainImageContainer = mainImageContainerRef.current;
    const thumbsContainer = thumbsContainerRef.current;
    const mainImages = mainImageContainer?.querySelectorAll(".main-image");

    if (
      mainContainer &&
      mainImageContainer &&
      mainImages?.length > 0 &&
      thumbsContainer
    ) {
      const gap = parseInt(window.getComputedStyle(mainContainer).gap);
      const mainImageWidth =
        mainContainer.offsetWidth - thumbsContainer.offsetWidth - gap;

      mainImages.forEach((image) => {
        image.style.width = `${mainImageWidth}px`;
      });

      thumbsContainer.style.height = `${mainImageContainer.offsetHeight}px`;
    }
  }, []);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on("select", onSelect);
    return () => emblaMainApi.off("select", onSelect);
  }, [emblaMainApi, onSelect]);

  useEffect(() => {
    setThumbsHeight();
    window.addEventListener("resize", setThumbsHeight);

    const images = document.querySelectorAll("img");
    images.forEach((img) => {
      if (img.complete) {
        setThumbsHeight();
      } else {
        img.addEventListener("load", setThumbsHeight);
      }
    });

    return () => {
      window.removeEventListener("resize", setThumbsHeight);
      images.forEach((img) => img.removeEventListener("load", setThumbsHeight));
    };
  }, [setThumbsHeight]);

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
            priority={index === 0}
            className="main-image m-auto aspect-square rounded-lg border object-contain shadow-sm"
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

  if (!imageList?.length) return null;

  return (
    <div
      ref={mainContainerRef}
      className="main-container flex flex-col-reverse gap-1 sm:flex-row sm:gap-2 md:gap-3 lg:gap-4"
    >
      <div ref={thumbsContainerRef} className="w-20 max-sm:hidden">
        <div
          ref={thumbViewportRef}
          className="no-scrollbar thumbs-container h-full overflow-y-scroll"
          role="tablist"
          aria-label="Product image thumbnails"
        >
          <div className="flex h-full flex-col gap-2">{renderThumbs}</div>
        </div>
      </div>

      <div
        className="flex flex-1 flex-col items-center justify-center overflow-hidden md:gap-1"
        ref={mainViewportRef}
      >
        <div
          ref={mainImageContainerRef}
          className="main-image-container flex gap-2"
          role="tabpanel"
          aria-label="Product image gallery"
        >
          {renderMainImages}
        </div>
        <div
          className="mt-4 flex justify-center"
          role="tablist"
          aria-label="Image navigation dots"
        >
          {renderDotButtons}
        </div>
      </div>
    </div>
  );
});

ProductImageSection.displayName = "ProductImageSection";

export default ProductImageSection;
