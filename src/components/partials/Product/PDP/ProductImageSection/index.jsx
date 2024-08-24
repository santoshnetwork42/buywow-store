import { VideoDotIcon } from "@/assets/svg/icons";
import { Button, Img, Text } from "@/components/elements";
import { extractAttributes } from "@/utils/helpers";
import { getPublicImageURL } from "@/utils/helpers/img-loader";
import useEmblaCarousel from "embla-carousel-react";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const Thumb = React.memo(({ isSelected, image, onClick }) => (
  <div
    className={`relative flex aspect-square cursor-pointer items-center justify-center rounded-lg ${isSelected ? "border border-black-900" : ""}`}
  >
    <button onClick={onClick} type="button" className="w-full p-0">
      {image.isVideo ? (
        <>
          <video
            src={getPublicImageURL({
              key: image.imageKey,
              resize: 300,
              addPrefix: true,
            })}
            className="aspect-square w-full rounded-lg object-cover"
            muted
          />
          <div className="absolute left-1/2 top-1/2 size-8 -translate-x-1/2 -translate-y-1/2">
            <VideoDotIcon className="h-full w-full" />
          </div>
        </>
      ) : (
        <Img
          src={image?.imageKey}
          width={300}
          height={300}
          alt="Thumbnail"
          className="aspect-square w-full rounded-lg object-cover"
          isStatic
          addPrefix
        />
      )}
    </button>
  </div>
));

const DotButton = React.memo(({ isSelected, onClick, isVideo }) => {
  const baseClassName = `
    mr-1.5 
    inline-block 
    size-2.5 
    cursor-pointer 
    rounded-full 
    transition-all 
    duration-300 
    ease-in-out
    ${isSelected ? "bg-black-900" : "bg-gray-300_01 hover:bg-gray-400"}
  `;

  return (
    <Button
      className={baseClassName}
      size="none"
      variant="none"
      onClick={onClick}
    >
      {isVideo && <VideoDotIcon color={isSelected ? "black" : undefined} />}
    </Button>
  );
});

const PlayPauseButton = React.memo(({ isPlaying, onClick }) => (
  <div
    className={`absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-black-900 bg-opacity-50 p-4 text-white-a700 transition-all duration-300 ease-in-out ${isPlaying ? "scale-95" : "scale-100"}`}
    onClick={onClick}
  >
    {isPlaying ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <rect x="6" y="4" width="4" height="16" />
        <rect x="14" y="4" width="4" height="16" />
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M8 5v14l11-7z" />
      </svg>
    )}
  </div>
));

const ProductImage = React.memo(
  ({
    image,
    index,
    isPlaying,
    showPlayButton,
    togglePlayPause,
    promotionTag,
    productBenefitTags,
    videoRefs,
  }) => (
    <div
      className="main-image relative flex-[0_0_100%] overflow-hidden"
      onClick={() => image.isVideo && togglePlayPause(index)}
    >
      {image.isVideo ? (
        <>
          <video
            ref={(el) => {
              videoRefs.current[index] = el;
            }}
            src={getPublicImageURL({
              key: image.imageKey,
              resize: 820,
              addPrefix: true,
            })}
            className="main-image m-auto aspect-square cursor-pointer rounded-lg border object-contain shadow-sm"
            loop
            muted
            playsInline
          />
          {(showPlayButton[index] || !isPlaying[index]) && (
            <PlayPauseButton
              isPlaying={isPlaying[index]}
              onClick={(e) => {
                e.stopPropagation();
                togglePlayPause(index);
              }}
            />
          )}
        </>
      ) : (
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
      )}
      {promotionTag?.data && index === 0 && (
        <Text
          as="span"
          size="xs"
          className="absolute left-2.5 top-2 z-10 rounded px-2 py-1 capitalize text-white-a700 md:top-2.5 md:px-2.5"
          style={{
            backgroundColor:
              extractAttributes(promotionTag).bgColor || "#DD8434",
          }}
        >
          {extractAttributes(promotionTag).tag}
        </Text>
      )}
      {productBenefitTags?.data && index === 0 && (
        <div className="absolute right-2.5 top-2 z-10 flex flex-col items-end gap-2 capitalize md:top-2.5">
          {productBenefitTags.data.map((benefitTag, idx) => {
            const { tag, bgColor } = benefitTag?.attributes || {};
            return (
              <Text
                key={idx}
                as="span"
                size="xs"
                className="w-fit rounded px-2 py-1 md:px-2.5"
                style={{ backgroundColor: bgColor || "#DD8434" }}
              >
                {tag}
              </Text>
            );
          })}
        </div>
      )}
    </div>
  ),
);

const ProductImageSection = ({
  imageList,
  promotionTag,
  productBenefitTags,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState({});
  const [showPlayButton, setShowPlayButton] = useState({});
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
  const videoRefs = useRef({});
  const controlTimeoutRefs = useRef({});

  const onThumbClick = useCallback(
    (index) => {
      emblaMainApi?.scrollTo(index);
    },
    [emblaMainApi],
  );

  const togglePlayPause = useCallback(
    (index) => {
      setIsPlaying((prev) => {
        const newState = { ...prev, [index]: !prev[index] };
        const video = videoRefs.current[index];
        if (video) {
          console.log(video);

          newState[index] ? video.play() : video.pause();
        }
        return newState;
      });

      setShowPlayButton((prev) => ({ ...prev, [index]: true }));

      if (controlTimeoutRefs.current[index]) {
        clearTimeout(controlTimeoutRefs.current[index]);
      }

      if (!isPlaying[index]) {
        controlTimeoutRefs.current[index] = setTimeout(() => {
          setShowPlayButton((prev) => ({ ...prev, [index]: false }));
        }, 1000);
      }
    },
    [isPlaying],
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi) return;
    const newIndex = emblaMainApi.selectedScrollSnap();
    setSelectedIndex(newIndex);
    emblaThumbsApi?.scrollTo(newIndex);

    // Pause all videos and update playing state
    Object.keys(videoRefs.current).forEach((key) => {
      const video = videoRefs.current[key];
      if (video) {
        video.pause();
      }
    });

    setIsPlaying((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        newState[key] = false;
      });
      return newState;
    });

    // Play the selected video if it exists
    const selectedVideo = videoRefs.current[newIndex];
    if (selectedVideo && imageList[newIndex]?.isVideo) {
      selectedVideo.play();
      setIsPlaying((prev) => ({ ...prev, [newIndex]: true }));
      setShowPlayButton((prev) => ({ ...prev, [newIndex]: true }));

      controlTimeoutRefs.current[newIndex] = setTimeout(() => {
        setShowPlayButton((prev) => ({ ...prev, [newIndex]: false }));
      }, 1000);
    }
  }, [emblaMainApi, emblaThumbsApi, imageList]);

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
        <ProductImage
          key={image?.imageKey || index}
          image={image}
          index={index}
          isPlaying={isPlaying}
          showPlayButton={showPlayButton}
          togglePlayPause={togglePlayPause}
          promotionTag={promotionTag}
          productBenefitTags={productBenefitTags}
          videoRefs={videoRefs}
        />
      )),
    [
      imageList,
      isPlaying,
      showPlayButton,
      togglePlayPause,
      promotionTag,
      productBenefitTags,
    ],
  );

  const renderDotButtons = useMemo(
    () =>
      imageList?.map((_, index) => (
        <DotButton
          key={index}
          onClick={() => onThumbClick(index)}
          isVideo={imageList[index]?.isVideo}
          isSelected={index === selectedIndex}
        />
      )),
    [imageList, selectedIndex, onThumbClick],
  );

  if (!imageList?.length) return null;

  return (
    <div ref={mainContainerRef} className="main-container sticky top-20">
      <div className="hidden md:grid md:grid-cols-2 md:gap-4">
        {renderMainImages}
      </div>
      <div className="md:hidden">
        <div className="flex flex-col-reverse gap-1 sm:flex-row sm:gap-2">
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
      </div>
    </div>
  );
};

Thumb.displayName = "Thumb";
DotButton.displayName = "DotButton";
PlayPauseButton.displayName = "PlayPauseButton";
ProductImage.displayName = "ProductImage";
ProductImageSection.displayName = "ProductImageSection";

export default React.memo(ProductImageSection);
