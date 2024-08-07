"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Button, Img, Text } from "@/components/elements";
import { extractAttributes } from "@/utils/helpers";

const Thumb = React.memo(({ isSelected, image, onClick }) => (
  <div
    className={`flex aspect-square cursor-pointer items-center justify-center ${isSelected ? "border border-black-900" : ""}`}
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

const ProductImageSection = ({
  imageList,
  promotionTag,
  productBenefitTags,
}) => {
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
      !mainContainer ||
      !mainImageContainer ||
      !mainImages?.length ||
      !thumbsContainer
    )
      return;

    const gap = parseInt(window.getComputedStyle(mainContainer).gap);
    const mainImageWidth =
      mainContainer.offsetWidth - thumbsContainer.offsetWidth - gap;

    mainImages.forEach((image) => {
      image.style.width = `${mainImageWidth}px`;
    });

    thumbsContainer.style.height = `${mainImageContainer.offsetHeight}px`;
  }, []);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.scrollTo(0);
    emblaMainApi.on("reInit", onSelect);
    emblaMainApi.on("select", onSelect);

    return () => {
      emblaMainApi.off("select", onSelect);
      emblaMainApi.off("reInit", onSelect);
    };
  }, [emblaMainApi, onSelect, imageList]);

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
          className="main-image flex-[0_0_100%] overflow-hidden"
        >
          <Img
            src={image?.imageKey}
            width={820}
            height={480}
            alt={`Product image ${index + 1}`}
            isStatic
            priority={index === 0}
            className="main-image m-auto aspect-square rounded-lg border object-contain shadow-sm"
            addPrefix
          />
          {promotionTag?.data &&
            index === 0 &&
            (() => {
              const { tag, bgColor } = extractAttributes(promotionTag);
              return (
                <Text
                  as="span"
                  size="base"
                  className="absolute left-2.5 top-2 z-10 rounded px-2 py-1 text-sm capitalize text-white-a700 md:top-2.5 md:px-3"
                  responsive
                  style={{ backgroundColor: bgColor || "#DD8434" }}
                >
                  {tag}
                </Text>
              );
            })()}
          {productBenefitTags?.data && (
            <div className="absolute right-2.5 top-2 z-10 flex flex-col items-end gap-2 capitalize md:top-2.5">
              {productBenefitTags.data.map((benefitTag, index) => {
                const { tag, bgColor } = benefitTag?.attributes || {};
                return (
                  <Text
                    key={index}
                    as="span"
                    size="sm"
                    className="w-fit rounded px-2 py-1 md:px-3"
                    responsive
                    style={{ backgroundColor: bgColor || "#DD8434" }}
                  >
                    {tag}
                  </Text>
                );
              })}
            </div>
          )}
        </div>
      )),
    [imageList, promotionTag, productBenefitTags],
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
      className="main-container sticky top-20 flex flex-col-reverse gap-1 sm:flex-row sm:gap-2 md:gap-3 lg:gap-4"
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
        <div ref={mainImageContainerRef} className="flex w-full gap-2">
          {renderMainImages}
        </div>
        <div className="mt-4 flex justify-center">{renderDotButtons}</div>
      </div>
    </div>
  );
};

Thumb.displayName = "Thumb";
DotButton.displayName = "DotButton";
ProductImageSection.displayName = "ProductImageSection";

export default React.memo(ProductImageSection);
