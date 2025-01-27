// src/components/VideoSection.jsx
"use client";

import { ArrowIconSVG, CloseIcon } from "@/assets/svg/icons";
import { ShareIcon } from "@/assets/svg/shareIcon";
import VolumeMute from "@/assets/svg/volumeMute";
import VolumeUp from "@/assets/svg/volumeUp";
import { Button, Heading, Img, Text } from "@/components/elements";
import Modal from "@/components/features/Modal";
import useWindowDimensions from "@/utils/helpers/getWindowDimension";
import { useProduct, useProductVariantGroups } from "@wow-star/utils-cms";
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import VariantSelector from "../../Product/PDP/VariantSelector";
import AddToCartSection from "./AddToCartSection";
import { useSelector } from "react-redux";

const Thumb = React.memo(({ image, onClick }) => (
  <>
    {!image.isVideo && (
      <div
        onClick={onClick}
        role="button"
        tabIndex={0}
        className="cursor-pointer"
      >
        <Img
          src={image?.imageKey}
          width={200}
          height={200}
          alt={`Product thumbnail ${image?.altText || ""}`}
          className="aspect-square w-full rounded-lg object-contain transition-transform hover:scale-105"
          addPrefix
          loading="lazy"
        />
      </div>
    )}
  </>
));
Thumb.displayName = "Thumb";

const ModalProductDetail = React.memo(({ fetchedProduct, slug, className }) => {
  const [selectedVariant, variantGroup, onVariantChange] =
    useProductVariantGroups(fetchedProduct);
  const packageProduct = useProduct(fetchedProduct, selectedVariant?.id);

  const { title, listingPrice, price, images, id } = packageProduct || {};

  const imageList = useMemo(
    () =>
      images?.items
        ? [...images.items].sort((a, b) => a.position - b.position)
        : [],
    [images?.items],
  );

  const onThumbClick = useCallback((index) => {
    // Implement thumb click handler if needed
  }, []);

  const renderThumb = useMemo(
    () =>
      imageList
        ?.slice(0, 1)
        ?.map((image, index) => (
          <Thumb
            key={image?.imageKey || index}
            onClick={() => onThumbClick(index)}
            image={image}
          />
        )),
    [imageList, onThumbClick],
  );

  const savings = useMemo(
    () => (listingPrice > price ? listingPrice - price : 0),
    [listingPrice, price],
  );

  if (!id) return null;
  if (!id) return null;

  return (
    <div className={className}>
      <div className="no-scrollbar flex h-full w-full flex-col gap-2 self-end overflow-hidden overflow-y-auto px-3">
        <div className="flex w-full justify-center">
          <div className="w-64">{renderThumb}</div>
        </div>
        {!variantGroup?.length && (
          <div className="my-2 flex max-w-[18rem] flex-col gap-2">
            <Text className="line-clamp-2">{title}</Text>
            <div className="flex items-center gap-1">
              <Text className="font-semibold">₹{price}</Text>
              {listingPrice > price && (
                <Text className="line-through" size="sm">
                  ₹{listingPrice}
                </Text>
              )}
            </div>
            {savings > 0 && (
              <Text size="xs" className="font-semibold">
                Save ₹{savings}
              </Text>
            )}
          </div>
        )}
        {!!variantGroup?.length && (
          <VariantSelector
            variantGroups={variantGroup}
            onVariantChange={onVariantChange}
            isShoppable
          />
        )}
      </div>
      <div className="flex w-full flex-col gap-2 self-end border border-t-gray-300 px-3">
        <AddToCartSection
          product={packageProduct}
          selectedVariant={selectedVariant}
        />
      </div>
    </div>
  );
});
ModalProductDetail.displayName = "ModalProductDetail";

const ShareButton = ({ slug }) => {
  const handleShare = async () => {
    const isWebShareSupported = navigator.share !== undefined;
    if (isWebShareSupported) {
      try {
        await navigator.share({
          title: document.title,
          text: document.title,
          url: `https://buywow.in/product/${slug}`,
        });
      } catch (err) {
        console.log("Share error:", err);
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 rounded-md bg-black-900 bg-opacity-50 p-3"
    >
      <ShareIcon className="size-6" />
    </button>
  );
};

const MobileVideoCarouselItem = ({ fetchedProduct, slug }) => {
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [selectedVariant] = useProductVariantGroups(fetchedProduct);
  const packageProduct = useProduct(fetchedProduct, selectedVariant?.id);
  const { title, listingPrice, price, images, id } = packageProduct || {};

  const imageList = images?.items
    ? [...images.items].sort((a, b) => a.position - b.position)
    : [];

  const renderThumb = useMemo(
    () =>
      imageList
        ?.slice(-imageList?.length, 1)
        ?.map((image, index) => (
          <Thumb
            key={image?.imageKey || index}
            onClick={() => onThumbClick(index)}
            image={image}
          />
        )),
    [imageList],
  );

  const onThumbClick = useCallback((index) => {
    // Implement thumb click handler if needed
  }, []);

  if (!id) return null;

  return (
    <div className="flex w-full items-center justify-between gap-2 rounded-md bg-white-a700 bg-opacity-75 p-2 shadow-[0_0_10px_0_rgba(255,255,255,0.7)] backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <div className="w-20">{renderThumb}</div>
        <div className="flex max-w-40 flex-col gap-1">
          <Text size="sm" className="line-clamp-2">
            {title}
          </Text>
          <div className="flex items-center gap-1">
            <Text className="font-semibold" size="sm">
              ₹{price}
            </Text>
            {listingPrice > price && (
              <Text className="line-through" size="xs">
                ₹{listingPrice}
              </Text>
            )}
          </div>
        </div>
      </div>
      <Button
        variant="primary"
        className="h-fit rounded-lg p-2 py-3 text-sm"
        onClick={() => setIsProductModalOpen(true)}
      >
        Shop Now
      </Button>
      <Modal
        isOpen={isProductModalOpen}
        modalContainerClassName="p-0"
        onClose={() => setIsProductModalOpen(false)}
      >
        <ModalProductDetail
          fetchedProduct={fetchedProduct}
          slug={slug}
          className="flex max-h-[32rem] w-full flex-col items-center"
        />
      </Modal>
    </div>
  );
};

const MobileVideoCarousel = ({
  videoItems,
  currentSelectedVideo,
  setCurrentSelectedVideo,
  muted,
  setMuted,
}) => {
  const scrollContainerRef = useRef(null);
  const currentVideoRef = useRef(null);
  const videoRefs = useRef({});

  // Setup Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries?.forEach((entry) => {
          const video = entry?.target;
          if (entry?.isIntersecting) {
            video?.play();
          } else {
            video?.pause();
          }
        });
      },
      { threshold: 0.5 }, // 50% visibility threshold
    );

    // Observe all video elements
    Object?.values(videoRefs.current)?.forEach((video) => {
      if (video) {
        observer?.observe(video);
      }
    });

    return () => {
      Object.values(videoRefs?.current)?.forEach((video) => {
        if (video) {
          observer?.unobserve(video);
        }
      });
    };
  }, [videoItems]);

  useEffect(() => {
    setTimeout(() => {
      if (currentVideoRef.current) {
        currentVideoRef.current.scrollIntoView({ behavior: "instant" });
      }
    }, 10);
  }, [currentSelectedVideo]);

  const { isCartOpen } = useSelector((state) => state.modal?.modal?.cart);

  useEffect(() => {
    if (isCartOpen) {
      setCurrentSelectedVideo(null);
    }
  }, [isCartOpen]);

  return (
    <>
      <div className="bg-black flex h-full w-full flex-col overflow-hidden">
        <div
          ref={scrollContainerRef}
          className="no-scrollbar flex h-full w-full snap-y snap-mandatory flex-col overflow-y-scroll"
          style={{
            scrollTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {videoItems?.map((item, index) => (
            <div
              key={index}
              ref={index === currentSelectedVideo ? currentVideoRef : null}
              className="relative h-full w-full flex-shrink-0 snap-start snap-always"
            >
              <div className="relative flex h-full w-full flex-col">
                <video
                  ref={(el) => {
                    videoRefs.current[index] = el;
                  }}
                  src={item?.video?.data?.attributes?.url}
                  className="h-full w-full object-cover"
                  loop
                  muted={muted}
                  playsInline
                  autoPlay
                />

                <div
                  className="absolute right-2 top-2 z-20 flex cursor-pointer items-center justify-center rounded-md bg-black-900 bg-opacity-50 py-1 pr-3"
                  onClick={() => setCurrentSelectedVideo(null)}
                >
                  <CloseIcon
                    color="white"
                    size={32}
                    className="translate-x-1.5"
                  />
                </div>

                <div className="absolute bottom-5 flex w-full flex-col items-end justify-center gap-4 px-2">
                  <div
                    className="flex cursor-pointer items-center justify-center rounded-lg bg-black-900 bg-opacity-50 p-3"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      setMuted(!muted);
                    }}
                  >
                    {muted && <VolumeMute className="size-6" />}
                    {!muted && <VolumeUp className="size-6" />}
                  </div>
                  <ShareButton slug={item?.product?.data?.attributes?.slug} />
                  <MobileVideoCarouselItem
                    fetchedProduct={
                      item?.product?.data?.attributes?.fetchedProduct
                    }
                    slug={item?.product?.data?.attributes?.slug}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

// Memoized Image component with loading state
const MemoizedImg = React.memo(
  ({ src, width, height, alt, className, onClick }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
      <div className="relative h-full w-full">
        {!isLoaded && (
          <div className="absolute inset-0 animate-pulse bg-gray-200" />
        )}
        <Img
          src={src}
          width={width}
          height={height}
          alt={alt}
          className={`${className} ${isLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
          onClick={onClick}
          onLoad={() => setIsLoaded(true)}
          onError={() => setIsLoaded(true)}
        />
      </div>
    );
  },
);
MemoizedImg.displayName = "MemoizedImg";

// Memoized Video component with loading state
const MemoizedVideo = React.memo(
  React.forwardRef(({ src, muted, className, onMuteToggle, autoPlay }, ref) => {
    const [isLoaded, setIsLoaded] = useState(false);
    return (
      <div className="relative h-full w-full">
        {!isLoaded && (
          <div className="absolute inset-0 animate-pulse bg-gray-200" />
        )}
        <video
          ref={ref}
          src={src}
          className={`${className} ${isLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
          loop
          autoPlay={autoPlay}
          muted={muted || !(!muted && autoPlay)}
          playsInline
          onLoadedData={() => setIsLoaded(true)}
          onError={() => setIsLoaded(true)}
        />
        {isLoaded && (
          <button
            className="absolute right-1 top-2 flex cursor-pointer items-center justify-center rounded-lg bg-black-900 bg-opacity-50 p-2 transition-opacity hover:bg-opacity-70"
            onClick={onMuteToggle}
          >
            {muted ? (
              <VolumeMute className="size-6" />
            ) : (
              <VolumeUp className="size-6" />
            )}
          </button>
        )}
      </div>
    );
  }),
  (prevProps, nextProps) =>
    prevProps.src === nextProps.src && prevProps.muted === nextProps.muted,
);

const DesktopVideoCarousel = ({
  videoItems,
  currentSelectedVideo,
  setCurrentSelectedVideo,
  muted,
  setMuted,
}) => {
  // const [muted, setMuted] = useState(true);
  const scrollContainerRef = useRef(null);
  const videoRefs = useRef({});
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (!videoRefs.current || !videoRefs.current[currentSelectedVideo]) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          const videoIndex = Number(video.dataset.index);

          if (entry.isIntersecting) {
            if (videoIndex === currentSelectedVideo) {
              video
                .play()
                .catch((err) => console.error("Error playing video:", err));
            }
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5 }, // Adjust the threshold as needed
    );

    // Attach observer to all video elements
    Object.values(videoRefs.current).forEach((video) => {
      if (video) observer?.observe(video);
    });

    return () => {
      Object.values(videoRefs.current).forEach((video) => {
        if (video) observer.unobserve(video);
      });
    };
  }, [currentSelectedVideo, videoRefs]);

  const getVideoStyles = (index) => {
    const position = index - currentSelectedVideo;
    let translateX = "100%";
    let opacity = 0;
    let zIndex = 0;
    let scale = 0.8;

    if (position === 0) {
      translateX = "0";
      opacity = 1;
      zIndex = 2;
      scale = 1;
    } else if (position === -1 || position === 1) {
      translateX = position < 0 ? "-100%" : "100%";
      opacity = 0;
      zIndex = 1;
      scale = 0.8;
    }

    return {
      transform: `translateX(${translateX}) scale(${scale})`,
      opacity,
      zIndex,
      transition: isTransitioning ? "none" : "all 0.3s ease-in-out",
    };
  };

  const visibleThumbnails = useMemo(() => {
    if (!videoItems || videoItems.length <= 1) return [];

    const thumbnails = [];
    const prevIndex =
      currentSelectedVideo > 0
        ? currentSelectedVideo - 1
        : videoItems.length - 1;
    const nextIndex =
      currentSelectedVideo < videoItems.length - 1
        ? currentSelectedVideo + 1
        : 0;

    thumbnails.push({ index: prevIndex, item: videoItems[prevIndex] });
    thumbnails.push({ index: nextIndex, item: videoItems[nextIndex] });

    return thumbnails;
  }, [currentSelectedVideo, videoItems]);

  const handleNavigation = useCallback(
    (direction) => {
      if (isTransitioning) return;

      setIsTransitioning(true);

      // Pause the current playing video
      const currentVideo = videoRefs.current[currentSelectedVideo];
      if (currentVideo) {
        currentVideo.pause();
      }

      const newIndex =
        direction === "next"
          ? currentSelectedVideo < videoItems.length - 1
            ? currentSelectedVideo + 1
            : 0
          : currentSelectedVideo > 0
            ? currentSelectedVideo - 1
            : videoItems.length - 1;

      setTimeout(() => {
        setCurrentSelectedVideo(newIndex);
        setTimeout(() => setIsTransitioning(false), 50);
      }, 50);
    },
    [
      currentSelectedVideo,
      setCurrentSelectedVideo,
      isTransitioning,
      videoItems.length,
    ],
  );
  useEffect(() => {
    Object.values(videoRefs.current).forEach((video, index) => {
      if (index === currentSelectedVideo) {
        video.play();
      } else {
        video.pause();
      }
    });
  }, [currentSelectedVideo]);

  const handleThumbnailClick = useCallback(
    (index) => {
      if (isTransitioning) return;

      // Pause the current playing video
      const currentVideo = videoRefs.current[currentSelectedVideo];
      if (currentVideo) {
        currentVideo.pause();
      }

      setCurrentSelectedVideo(index);
    },
    [currentSelectedVideo, setCurrentSelectedVideo, isTransitioning],
  );

  return (
    <div
      ref={scrollContainerRef}
      className="no-scrollbar relative flex h-full w-full items-center justify-center overflow-hidden"
    >
      <div className="relative flex w-full max-w-[80rem] items-center justify-center gap-8 space-x-4">
        {/* Left Thumbnails */}
        <div className="flex space-x-4">
          {currentSelectedVideo !== 0 &&
            visibleThumbnails
              .filter((_, index) => index < visibleThumbnails.length / 2)
              .map(({ index, item }) => (
                <div
                  key={index}
                  className={`w-[12rem] transform transition-all duration-300 ${
                    isTransitioning ? "opacity-0" : "opacity-100"
                  }`}
                  onClick={() => {
                    // handleThumbnailClick(index)
                  }}
                >
                  <MemoizedImg
                    src={item?.thumbnail?.data?.attributes?.url}
                    width={200}
                    height={200}
                    alt={
                      item?.thumbnail?.data?.attributes?.alternativeText ||
                      "Video thumbnail"
                    }
                    className="h-full w-full rounded-md object-cover transition-transform duration-300"
                  />
                </div>
              ))}
          {currentSelectedVideo === 0 && <div className="w-[12rem]" />}
        </div>

        {/* Video Container */}
        <div className="relative h-[35rem] w-[40rem] flex-shrink-0 overflow-hidden">
          {videoItems.map((item, index) => (
            <div
              key={index}
              className="absolute left-0 top-0 flex h-full w-full justify-center"
              style={getVideoStyles(index)}
            >
              <div className="relative flex w-1/2 items-center justify-center rounded-md bg-gray-100">
                <MemoizedVideo
                  ref={(el) => {
                    if (el) {
                      videoRefs.current[index] = el;
                    }
                  }}
                  data-index={index}
                  index={index}
                  src={item?.video?.data?.attributes?.url}
                  muted={muted}
                  autoPlay={currentSelectedVideo === index}
                  className="h-full w-full rounded-md rounded-br-none rounded-tr-none object-cover"
                  onMuteToggle={(e) => {
                    e.stopPropagation();
                    setMuted((muted) => !muted);
                  }}
                />
              </div>
              <ModalProductDetail
                fetchedProduct={item?.product?.data?.attributes?.fetchedProduct}
                slug={item?.product?.data?.attributes?.slug}
                className="flex max-h-[36rem] w-1/2 flex-col items-center rounded-md rounded-l-none bg-white-a700_01"
              />
            </div>
          ))}
        </div>

        {/* Right Thumbnails */}
        <div className="flex space-x-4">
          {currentSelectedVideo !== videoItems.length - 1 &&
            visibleThumbnails
              .filter(
                (_, index) => index >= Math.floor(visibleThumbnails.length / 2),
              )
              .map(({ index, item }) => (
                <div
                  key={index}
                  className={`w-[12rem] transform transition-all duration-300 ${
                    isTransitioning ? "opacity-0" : "opacity-100"
                  }`}
                  onClick={() => {
                    // handleThumbnailClick(index)
                  }}
                >
                  <MemoizedImg
                    src={item?.thumbnail?.data?.attributes?.url}
                    width={200}
                    height={200}
                    alt={
                      item?.thumbnail?.data?.attributes?.alternativeText ||
                      "Video thumbnail"
                    }
                    className="h-full w-full rounded-md object-cover transition-transform duration-300"
                  />
                </div>
              ))}
          {currentSelectedVideo === videoItems.length - 1 && (
            <div className="w-[12rem]" />
          )}
        </div>

        {/* Navigation Buttons */}
        {videoItems?.length > 1 && (
          <>
            <Button
              className="fixed left-4 z-20 rotate-180 rounded-full p-3 text-white-a700_01 hover:scale-125"
              variant="primary"
              onClick={(e) => {
                e.stopPropagation();
                handleNavigation("prev");
              }}
              aria-label="Previous video"
              enableRipple={false}
              disabled={isTransitioning || currentSelectedVideo === 0}
            >
              <ArrowIconSVG height={30} width={30} />
            </Button>
            <Button
              className="fixed right-4 z-20 rounded-full p-3 text-white-a700_01 hover:scale-125"
              variant="primary"
              onClick={(e) => {
                e.stopPropagation();
                handleNavigation("next");
              }}
              aria-label="Next video"
              enableRipple={false}
              disabled={
                isTransitioning ||
                currentSelectedVideo === videoItems.length - 1
              }
            >
              <ArrowIconSVG height={30} width={30} />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

const VideoItem = ({ thumbnail, setCurrentSelectedVideo, index, setMuted }) => {
  return (
    <div
      className="flex aspect-square h-60 w-44 items-center justify-center rounded-md bg-gray-100 sm:h-64"
      onClick={() => {
        setCurrentSelectedVideo(index);
        setMuted(false);
      }}
    >
      <Img
        src={thumbnail?.url}
        width={200}
        height={200}
        alt={thumbnail?.alternativeText || "Image"}
        className="h-full w-full rounded-md object-cover"
      />
    </div>
  );
};

const VideoCarousel = ({ videoItems, setCurrentSelectedVideo }) => {
  const [currentIndex, setCurrentIndex] = useState(
    videoItems?.length >= 2 ? 2 : 0,
  );
  const videoRefs = useRef([]);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    // Pause all videos
    videoRefs.current.forEach((videoRef, index) => {
      if (videoRef) {
        videoRef.pause();
      }
    });

    // Play the center video
    if (videoRefs.current[currentIndex]) {
      videoRefs.current[currentIndex].play();
    }
  }, [currentIndex]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : videoItems.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < videoItems.length - 1 ? prev + 1 : 0));
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchEndX.current - touchStartX.current;
    const minSwipeDistance = 50; // minimum distance for swipe to register

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        handlePrevious();
      } else {
        handleNext();
      }
    }

    // Reset touch positions
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  return (
    <div className="bg-black relative flex w-full items-center justify-center overflow-hidden">
      <div
        className="relative h-[280px] w-[148px] sm:h-[425px] sm:w-[240px]"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {videoItems.map((item, index) => {
          const position = index - currentIndex;
          const scale =
            position === 0
              ? 1
              : position === -1
                ? 0.9
                : position === 1
                  ? 0.9
                  : 0.8;
          const display = Math.abs(position) > 2 ? "none" : "block";
          const zIndex = 5 - Math.abs(position);

          return (
            <div
              key={index}
              className="absolute left-0 top-0 h-full w-full transition-all duration-300"
              style={{
                transform: `translateX(${position * 40}%) scale(${scale})`,
                display,
                zIndex,
              }}
            >
              <Img
                ref={(el) => (videoRefs.current[index] = el)}
                src={item?.thumbnail?.data?.attributes?.url}
                width={200}
                height={200}
                alt={
                  item?.thumbnail?.data?.attributes?.alternativeText || "Image"
                }
                className="h-full w-full rounded-md object-cover"
                onClick={() => {
                  setCurrentSelectedVideo(index);
                }}
              />
            </div>
          );
        })}
      </div>

      <ArrowIconSVG
        side="left"
        onClick={handlePrevious}
        className="absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-yellow-900 p-1 text-white-a700_01 transition-colors md:left-[5%] md:flex md:h-7 md:w-7 lg:left-[15%] xl:left-[20%]"
        aria-label="Previous video"
      />
      <ArrowIconSVG
        onClick={handleNext}
        className="absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-yellow-900 p-1 text-white-a700_01 transition-colors md:right-[5%] md:flex md:h-7 md:w-7 lg:right-[15%] xl:right-[20%]"
        aria-label="Next video"
      />
    </div>
  );
};

const VideoSection = ({ className, ...props }) => {
  const { title, videoItems, showComponent, videoSectionBgColor, button } =
    props;
  const { link, text: buttonText } = button || {};

  const { isSmallSize: isMobile, isMidSize: isTablet } = useWindowDimensions();
  const [currentSelectedVideo, setCurrentSelectedVideo] = useState(null);
  const [muted, setMuted] = useState(true);

  if (!showComponent) {
    return null;
  }

  return (
    <div {...props} className={className}>
      <div className="mb-6 flex w-full flex-col gap-5 py-2 md:gap-6">
        <div className="flex flex-col items-center gap-1 sm:gap-2 md:gap-3 lg:gap-4">
          <Heading size="2xl" as="h3" responsive>
            {title}
          </Heading>
          {buttonText && (
            <Button
              className="rounded-full bg-yellow-900 px-4 py-2 text-center text-white-a700_01 max-sm:mt-1 md:px-5 md:py-3"
              variant="primary"
            >
              {buttonText}
            </Button>
          )}
        </div>
        <div className="relative w-full">
          <div className="no-scrollbar flex w-full items-center justify-start gap-4 overflow-x-auto scroll-smooth px-4 pb-4 md:justify-center">
            {videoItems?.map((item, index) => (
              <div className="flex-shrink-0" key={index}>
                <VideoItem
                  video={item?.video}
                  thumbnail={item?.thumbnail?.data?.attributes}
                  fetchedProduct={
                    item?.product?.data?.attributes?.fetchedProduct
                  }
                  slug={item?.product?.data?.attributes?.slug}
                  setCurrentSelectedVideo={(index) =>
                    setCurrentSelectedVideo(index)
                  }
                  setMuted={setMuted}
                  index={index}
                />
              </div>
            ))}
          </div>
        </div>
        {!(isMobile || isTablet) && (
          <Modal
            isOpen={currentSelectedVideo !== null}
            onClose={() => setCurrentSelectedVideo(null)}
            modalContainerClassName="p-0 h-[calc(100%-3.5rem)] bg-transparent md:w-full lg:w-full w-full md:h-[calc(100%-3.5rem)] lg:h-[calc(100%-3.5rem)]"
            modalClassName="z-30"
            enableOutsideClick={false}
            showCloseButtonOutOfBox
          >
            <DesktopVideoCarousel
              videoItems={videoItems}
              currentSelectedVideo={currentSelectedVideo}
              setCurrentSelectedVideo={setCurrentSelectedVideo}
              muted={muted}
              setMuted={setMuted}
            />
          </Modal>
        )}
        {!!(isMobile || isTablet) && (
          <Modal
            isOpen={currentSelectedVideo !== null}
            onClose={() => setCurrentSelectedVideo(null)}
            modalContainerClassName="p-0 h-full"
            modalClassName="z-30"
            enableOutsideClick={false}
          >
            <MobileVideoCarousel
              videoItems={videoItems}
              currentSelectedVideo={currentSelectedVideo}
              setCurrentSelectedVideo={setCurrentSelectedVideo}
              muted={muted}
              setMuted={setMuted}
            />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default VideoSection;
