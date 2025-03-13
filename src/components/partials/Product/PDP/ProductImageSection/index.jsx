import VolumeMute from "@/assets/svg/volumeMute";
import VolumeUp from "@/assets/svg/volumeUp";
import { Button, Img, Text } from "@/components/elements";
import { extractAttributes } from "@/utils/helpers";
import { getPublicImageURL } from "@/utils/helpers/img-loader";
import { setImageZoomModal } from "@/store/slices/modal.slice";
import useEmblaCarousel from "embla-carousel-react";
import dynamic from "next/dynamic";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch } from "react-redux";

const VideoDotIcon = dynamic(() => import("@/assets/svg/videoDotIcon"));
const ImageZoomModal = dynamic(
  () => import("@/components/features/Modal/ImageZoomModal"),
);

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
          width={200}
          height={200}
          alt="Thumbnail"
          className="aspect-square w-full rounded-lg object-contain"
          addPrefix
          loading="lazy"
        />
      )}
    </button>
  </div>
));

const DotButton = React.memo(({ isSelected, onClick, isVideo }) => {
  const baseClassName = `
    mr-1.5 
    inline-block 
    size-3 
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
    className={`absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-black-900 bg-opacity-50 p-4 text-white-a700 transition-all duration-300 ease-in-out ${isPlaying ? "scale-95" : "scale-100"}`}
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
    videoRef,
    layout,
    imageList,
  }) => {
    const [muted, setMuted] = useState(true);
    const videoContainerRef = useRef(null);
    const dispatch = useDispatch();

    // Add this useEffect for intersection observer
    useEffect(() => {
      if (!image?.isVideo || !videoContainerRef?.current) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting && isPlaying) {
              // Video is out of view and playing - pause it
              togglePlayPause(index, layout);
            }
          });
        },
        {
          threshold: 0.5, // 50% of the video must be visible
        },
      );

      observer.observe(videoContainerRef.current);

      return () => {
        observer.disconnect();
      };
    }, [image.isVideo, isPlaying, index, layout, togglePlayPause]);

    const handleImageClick = (e) => {
      if (image.isVideo) {
        togglePlayPause(index, layout);
      } else {
        // Validate image data before opening modal
        const validImageList = imageList.map((img) => ({
          ...img,
          // Ensure imageKey is a string and not undefined
          imageKey: img.imageKey || "",
          isVideo: !!img.isVideo,
        }));

        // Open zoom modal for images
        dispatch(
          setImageZoomModal({
            isOpen: true,
            imageKey: image.imageKey || "",
            imageIndex: index,
            imageList: validImageList,
          }),
        );
      }
    };

    return (
      <div
        className={`main-image relative overflow-hidden ${
          layout === "grid" ? "w-full" : "flex-[0_0_100%]"
        }`}
        onClick={handleImageClick}
      >
        {image?.isVideo ? (
          // Add ref to the video container
          <div ref={videoContainerRef}>
            <video
              ref={videoRef}
              src={getPublicImageURL({
                key: image.imageKey,
                resize: 820,
                addPrefix: true,
              })}
              className="main-image m-auto aspect-square cursor-pointer rounded-lg border object-contain shadow-sm"
              loop
              muted={muted}
              playsInline
            />
            {(showPlayButton || !isPlaying) && (
              <PlayPauseButton
                isPlaying={isPlaying}
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlayPause(index, layout);
                }}
              />
            )}
            <div
              className="absolute bottom-1 right-1 flex cursor-pointer items-center justify-center rounded-lg bg-black-900 bg-opacity-50 p-1"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setMuted(!muted);
              }}
            >
              {muted && <VolumeMute className="size-6" />}
              {!muted && <VolumeUp className="size-6" />}
            </div>
          </div>
        ) : (
          // Image with zoom capability
          <div className="group aspect-square overflow-hidden rounded-lg border shadow-sm">
            <Img
              src={image?.imageKey}
              width={400}
              height={400}
              alt={`Product image ${index + 1}`}
              priority
              className="main-image m-auto aspect-square h-auto w-full cursor-zoom-in object-contain transition-transform duration-300 ease-in-out"
              addPrefix
            />
          </div>
        )}
        {/* Rest of your existing code for tags... */}
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
    );
  },
);

const ProductImageSection = ({
  imageList,
  promotionTag,
  productBenefitTags,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [playingStates, setPlayingStates] = useState({});
  const [showPlayButtons, setShowPlayButtons] = useState({});
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
  const carouselVideoRefs = useRef({});
  const gridVideoRefs = useRef({});
  const controlTimeoutRefs = useRef({});

  const onThumbClick = useCallback(
    (index) => {
      emblaMainApi?.scrollTo(index);
    },
    [emblaMainApi],
  );

  const togglePlayPause = useCallback((index, layout) => {
    const videoRefs = layout === "grid" ? gridVideoRefs : carouselVideoRefs;

    setPlayingStates((prev) => {
      const newState = {
        ...prev,
        [`${layout}-${index}`]: !prev[`${layout}-${index}`],
      };
      const video = videoRefs.current[index];
      if (video) {
        newState[`${layout}-${index}`] ? video.play() : video.pause();
      }
      return newState;
    });

    setShowPlayButtons((prev) => ({ ...prev, [`${layout}-${index}`]: true }));

    if (controlTimeoutRefs.current[`${layout}-${index}`]) {
      clearTimeout(controlTimeoutRefs.current[`${layout}-${index}`]);
    }

    controlTimeoutRefs.current[`${layout}-${index}`] = setTimeout(() => {
      setShowPlayButtons((prev) => ({
        ...prev,
        [`${layout}-${index}`]: false,
      }));
    }, 1000);
  }, []);

  const onSelect = useCallback(() => {
    if (!emblaMainApi) return;
    const newIndex = emblaMainApi.selectedScrollSnap();
    setSelectedIndex(newIndex);
    emblaThumbsApi?.scrollTo(newIndex);

    // Pause all carousel videos
    Object.entries(carouselVideoRefs.current).forEach(([key, video]) => {
      if (video) {
        video.pause();
        setPlayingStates((prev) => ({ ...prev, [`carousel-${key}`]: false }));
      }
    });

    const selectedVideo = carouselVideoRefs.current[newIndex];
    if (selectedVideo && imageList[newIndex]?.isVideo) {
      selectedVideo.play();
      setPlayingStates((prev) => ({ ...prev, [`carousel-${newIndex}`]: true }));
      setShowPlayButtons((prev) => ({
        ...prev,
        [`carousel-${newIndex}`]: true,
      }));

      controlTimeoutRefs.current[`carousel-${newIndex}`] = setTimeout(() => {
        setShowPlayButtons((prev) => ({
          ...prev,
          [`carousel-${newIndex}`]: false,
        }));
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

  const renderMainImages = useCallback(
    (layout) =>
      imageList?.map((image, index) => (
        <ProductImage
          key={image?.imageKey || index}
          image={image}
          index={index}
          imageList={imageList}
          isPlaying={playingStates[`${layout}-${index}`]}
          showPlayButton={showPlayButtons[`${layout}-${index}`]}
          togglePlayPause={togglePlayPause}
          promotionTag={promotionTag}
          productBenefitTags={productBenefitTags}
          videoRef={(el) => {
            if (layout === "grid") {
              gridVideoRefs.current[index] = el;
            } else {
              carouselVideoRefs.current[index] = el;
            }
          }}
          layout={layout}
        />
      )),
    [
      imageList,
      playingStates,
      showPlayButtons,
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
    <div ref={mainContainerRef} className="main-container">
      <div className="hidden md:grid md:grid-cols-2 md:gap-4">
        {renderMainImages("grid")}
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
              {renderMainImages("carousel")}
            </div>
            <div className="mt-4 flex justify-center">{renderDotButtons}</div>
          </div>
        </div>
      </div>

      {/* Image Zoom Modal */}
      <ImageZoomModal />
    </div>
  );
};

Thumb.displayName = "Thumb";
DotButton.displayName = "DotButton";
PlayPauseButton.displayName = "PlayPauseButton";
ProductImage.displayName = "ProductImage";
ProductImageSection.displayName = "ProductImageSection";

export default React.memo(ProductImageSection);
