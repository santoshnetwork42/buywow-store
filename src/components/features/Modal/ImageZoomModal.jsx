"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Modal from "./index";
import { Img } from "@/components/elements";
import { useDispatch, useSelector } from "react-redux";
import { setImageZoomModal } from "@/store/slices/modal.slice";
import { getPublicImageURL } from "@/utils/helpers/img-loader";
import {
  ZoomInIcon,
  ZoomOutIcon,
  ResetZoomIcon,
  CloseIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlayIcon,
} from "@/assets/svg/ZoomIcons";

const ImageZoomModal = () => {
  const dispatch = useDispatch();
  const {
    isOpen,
    imageKey,
    imageIndex,
    imageList = [],
  } = useSelector((state) => state.modal.modal.imageZoom);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastTouch, setLastTouch] = useState({ x: 0, y: 0 });
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchStartTime, setTouchStartTime] = useState(0);
  const [isSwipeInProgress, setIsSwipeInProgress] = useState(false);
  const [initialTouchDistance, setInitialTouchDistance] = useState(null);
  const [initialScale, setInitialScale] = useState(1);
  const [touchMidpoint, setTouchMidpoint] = useState({ x: 0, y: 0 });
  const [lastTapTime, setLastTapTime] = useState(0);

  const containerRef = useRef(null);
  const thumbnailsRef = useRef(null);
  const thumbnailItemsRef = useRef([]);
  const swipeThreshold = 50; // Minimum distance to trigger a swipe
  const swipeTimeThreshold = 300; // Maximum time for a swipe in milliseconds
  const doubleTapThreshold = 300; // Maximum time between taps to be considered a double tap

  useEffect(() => {
    if (isOpen && imageIndex !== undefined) {
      setCurrentIndex(imageIndex);
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  }, [isOpen, imageIndex]);

  // Center the active thumbnail when currentIndex changes
  useEffect(() => {
    if (thumbnailsRef.current && thumbnailItemsRef.current[currentIndex]) {
      const container = thumbnailsRef.current;
      const item = thumbnailItemsRef.current[currentIndex];

      // Calculate the scroll position to center the item
      const containerWidth = container.offsetWidth;
      const itemWidth = item.offsetWidth;
      const itemLeft = item.offsetLeft;

      const centerPosition = itemLeft - containerWidth / 2 + itemWidth / 2;

      // Smooth scroll to the position
      container.scrollTo({
        left: centerPosition,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  const handleClose = () => {
    dispatch(
      setImageZoomModal({
        isOpen: false,
        imageKey: null,
        imageIndex: 0,
        imageList: [],
      }),
    );
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  useEffect(() => {
    return () => {
      handleClose();
    };
  }, []);

  // Calculate bounded position to prevent dragging outside image boundaries
  const calculateBoundedPosition = useCallback(
    (x, y) => {
      if (!containerRef.current) return { x, y };

      const containerRect = containerRef.current.getBoundingClientRect();
      const maxX = ((scale - 1) * containerRect.width) / 2;
      const maxY = ((scale - 1) * containerRect.height) / 2;

      return {
        x: Math.max(-maxX, Math.min(maxX, x)),
        y: Math.max(-maxY, Math.min(maxY, y)),
      };
    },
    [scale],
  );

  // Zoom function that maintains position relative to a specific point
  const zoomRelativeToPoint = useCallback(
    (newScale, pointX, pointY) => {
      if (!containerRef.current) return;

      const prevScale = scale;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate relative position of the point from the center (in %)
      const relX = (pointX - centerX) / (rect.width / 2);
      const relY = (pointY - centerY) / (rect.height / 2);

      // Calculate how much the point will move when we scale
      const scaleRatio = newScale / prevScale;
      const moveX = (scaleRatio - 1) * relX * (rect.width / 2);
      const moveY = (scaleRatio - 1) * relY * (rect.height / 2);

      // Adjust position to keep the point under the finger/cursor
      const newPosition = calculateBoundedPosition(
        position.x - moveX,
        position.y - moveY,
      );

      setScale(newScale);
      setPosition(newPosition);
    },
    [scale, position, calculateBoundedPosition],
  );

  const handleZoomIn = (e) => {
    const newScale = Math.min(scale + 0.5, 5);

    if (e) {
      const pointX =
        e.clientX ||
        (e.touches && e.touches[0].clientX) ||
        window.innerWidth / 2;
      const pointY =
        e.clientY ||
        (e.touches && e.touches[0].clientY) ||
        window.innerHeight / 2;
      zoomRelativeToPoint(newScale, pointX, pointY);
    } else {
      // Default to center of screen if no point provided
      zoomRelativeToPoint(
        newScale,
        window.innerWidth / 2,
        window.innerHeight / 2,
      );
    }
  };

  const handleZoomOut = (e) => {
    const newScale = Math.max(scale - 0.5, 1);

    if (newScale === 1) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
      return;
    }

    if (e) {
      const pointX =
        e.clientX ||
        (e.touches && e.touches[0].clientX) ||
        window.innerWidth / 2;
      const pointY =
        e.clientY ||
        (e.touches && e.touches[0].clientY) ||
        window.innerHeight / 2;
      zoomRelativeToPoint(newScale, pointX, pointY);
    } else {
      // Default to center of screen if no point provided
      zoomRelativeToPoint(
        newScale,
        window.innerWidth / 2,
        window.innerHeight / 2,
      );
    }
  };

  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  // Handle mouse down and touch start
  const handleMouseDown = useCallback(
    (e) => {
      // Handle double-tap detection
      const now = Date.now();
      if (e.touches && e.touches.length === 1) {
        if (now - lastTapTime < doubleTapThreshold) {
          handleDoubleTap(e);
          e.preventDefault();
          return;
        }
        setLastTapTime(now);
      }

      // Regular pinch-to-zoom detection
      if (e.touches && e.touches.length === 2) {
        e.preventDefault();

        // Get the distance between the two touch points
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const dx = touch1.clientX - touch2.clientX;
        const dy = touch1.clientY - touch2.clientY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Calculate midpoint between touches (center point for zoom)
        const midX = (touch1.clientX + touch2.clientX) / 2;
        const midY = (touch1.clientY + touch2.clientY) / 2;

        setInitialTouchDistance(distance);
        setInitialScale(scale);
        setTouchMidpoint({ x: midX, y: midY });
        return;
      }

      // Regular drag behavior
      if (scale > 1) {
        e.preventDefault();
        setIsDragging(true);

        // Handle both mouse and touch events
        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        const clientY = e.clientY || (e.touches && e.touches[0].clientY);

        setDragStart({
          x: clientX - position.x,
          y: clientY - position.y,
        });

        if (e.touches) {
          setLastTouch({
            x: clientX,
            y: clientY,
          });
        }
      }
    },
    [scale, position, lastTapTime],
  );

  // Handle mouse/touch move
  const handleMouseMove = useCallback(
    (e) => {
      // Handle pinch-to-zoom
      if (
        e.touches &&
        e.touches.length === 2 &&
        initialTouchDistance !== null
      ) {
        e.preventDefault();

        // Get the new distance
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const dx = touch1.clientX - touch2.clientX;
        const dy = touch1.clientY - touch2.clientY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Calculate the new scale based on the change in distance
        const scaleFactor = distance / initialTouchDistance;
        const newScale = Math.max(1, Math.min(5, initialScale * scaleFactor));

        // Apply zoom centered on the midpoint between the two touches
        zoomRelativeToPoint(newScale, touchMidpoint.x, touchMidpoint.y);
        return;
      }

      // Regular dragging
      if (isDragging && scale > 1) {
        e.preventDefault();

        // Handle both mouse and touch events
        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        const clientY = e.clientY || (e.touches && e.touches[0].clientY);

        if (e.touches) {
          // For touch events, calculate movement from last position
          const deltaX = clientX - lastTouch.x;
          const deltaY = clientY - lastTouch.y;

          // Amplify the movement for more immediate response on mobile
          const amplifier = 1.2;

          const newPosition = calculateBoundedPosition(
            position.x + deltaX * amplifier,
            position.y + deltaY * amplifier,
          );

          setPosition(newPosition);
          setLastTouch({ x: clientX, y: clientY });
        } else {
          // For mouse, use the traditional drag approach
          const newPosition = calculateBoundedPosition(
            clientX - dragStart.x,
            clientY - dragStart.y,
          );

          setPosition(newPosition);
        }
      }
    },
    [
      isDragging,
      dragStart,
      scale,
      calculateBoundedPosition,
      lastTouch,
      position,
      initialTouchDistance,
      initialScale,
      touchMidpoint,
      zoomRelativeToPoint,
    ],
  );

  // Handle mouse/touch up
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setInitialTouchDistance(null);
  }, []);

  // Handle wheel for desktop zoom
  const handleWheel = useCallback(
    (e) => {
      e.preventDefault();

      // Get position of mouse for zoom center
      const rect = e.currentTarget.getBoundingClientRect();
      const pointX = e.clientX;
      const pointY = e.clientY;

      // Determine zoom in or out
      if (e.deltaY < 0) {
        const newScale = Math.min(scale + 0.2, 5);
        zoomRelativeToPoint(newScale, pointX, pointY);
      } else {
        const newScale = Math.max(scale - 0.2, 1);
        if (newScale === 1) {
          setScale(1);
          setPosition({ x: 0, y: 0 });
        } else {
          zoomRelativeToPoint(newScale, pointX, pointY);
        }
      }
    },
    [scale, zoomRelativeToPoint],
  );

  const handlePrev = () => {
    if (imageList && imageList.length > 0) {
      setCurrentIndex((prev) => (prev === 0 ? imageList.length - 1 : prev - 1));
      handleReset();
    }
  };

  const handleNext = () => {
    if (imageList && imageList.length > 0) {
      setCurrentIndex((prev) => (prev === imageList.length - 1 ? 0 : prev + 1));
      handleReset();
    }
  };

  // Handle touch start for swipe detection
  const handleTouchStart = useCallback(
    (e) => {
      // Handle pinch or double-tap first
      if (e.touches && e.touches.length === 2) {
        handleMouseDown(e);
        return;
      }

      if (scale === 1 && imageList && imageList.length > 1) {
        // Only enable swipe when not zoomed in and there are multiple images
        const touch = e.touches[0];
        setTouchStartX(touch.clientX);
        setTouchStartTime(Date.now());
        setIsSwipeInProgress(true);
      } else if (scale > 1) {
        // Regular drag behavior when zoomed in
        handleMouseDown(e);
      } else {
        // Check for double tap
        handleMouseDown(e);
      }
    },
    [scale, imageList, handleMouseDown],
  );

  // Handle touch move for swipe and drag
  const handleTouchMove = useCallback(
    (e) => {
      // Handle pinch zoom first
      if (
        e.touches &&
        e.touches.length === 2 &&
        initialTouchDistance !== null
      ) {
        handleMouseMove(e);
        return;
      }

      if (
        isSwipeInProgress &&
        scale === 1 &&
        imageList &&
        imageList.length > 1
      ) {
        // For horizontal swipe navigation between images
        const touch = e.touches[0];
        const touchDeltaX = touch.clientX - touchStartX;

        // Prevent page scrolling when swiping
        if (Math.abs(touchDeltaX) > 10) {
          e.preventDefault();
        }
      } else if (isDragging && scale > 1) {
        // Regular image drag when zoomed in
        handleMouseMove(e);
      }
    },
    [
      isSwipeInProgress,
      scale,
      imageList,
      touchStartX,
      isDragging,
      handleMouseMove,
      initialTouchDistance,
    ],
  );

  // Handle touch end for swipe completion
  const handleTouchEnd = useCallback(
    (e) => {
      // Reset pinch zoom tracking
      if (initialTouchDistance !== null) {
        setInitialTouchDistance(null);
      }

      if (
        isSwipeInProgress &&
        scale === 1 &&
        imageList &&
        imageList.length > 1
      ) {
        const touchEndX = e.changedTouches[0].clientX;
        const touchDeltaX = touchEndX - touchStartX;
        const touchTime = Date.now() - touchStartTime;

        // Check if the swipe meets the threshold criteria
        if (
          Math.abs(touchDeltaX) > swipeThreshold ||
          (Math.abs(touchDeltaX) > 20 && touchTime < swipeTimeThreshold)
        ) {
          if (touchDeltaX > 0) {
            // Swipe right - go to previous image
            handlePrev();
          } else {
            // Swipe left - go to next image
            handleNext();
          }
        }

        setIsSwipeInProgress(false);
      }

      // Handle regular mouse up behavior for dragging
      handleMouseUp();
    },
    [
      isSwipeInProgress,
      scale,
      imageList,
      touchStartX,
      touchStartTime,
      handlePrev,
      handleNext,
      handleMouseUp,
      swipeThreshold,
      swipeTimeThreshold,
      initialTouchDistance,
    ],
  );

  // Handle double tap for zoom
  const handleDoubleTap = useCallback(
    (e) => {
      // Prevent default to avoid browser zooming
      e.preventDefault();

      if (scale === 1) {
        // Get touch coordinates
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        // Zoom in to 2.5x centered on tap position
        zoomRelativeToPoint(2.5, clientX, clientY);
      } else {
        // If already zoomed, reset
        handleReset();
      }
    },
    [scale, zoomRelativeToPoint],
  );

  // Prevent default zoom behavior on gesturestart (Safari)
  const handleGestureStart = useCallback((e) => {
    e.preventDefault();
  }, []);

  useEffect(() => {
    // Add event listeners
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("touchend", handleTouchEnd);
    document.addEventListener("touchcancel", handleMouseUp);
    document.addEventListener("touchmove", handleTouchMove, { passive: false });

    // Safari-specific gesture events
    if (typeof document.addEventListener === "function") {
      document.addEventListener("gesturestart", handleGestureStart, {
        passive: false,
      });
      document.addEventListener("gesturechange", handleGestureStart, {
        passive: false,
      });
      document.addEventListener("gestureend", handleGestureStart, {
        passive: false,
      });
    }

    return () => {
      // Clean up all event listeners
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchend", handleTouchEnd);
      document.removeEventListener("touchcancel", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);

      // Clean up Safari-specific listeners
      if (typeof document.removeEventListener === "function") {
        document.removeEventListener("gesturestart", handleGestureStart);
        document.removeEventListener("gesturechange", handleGestureStart);
        document.removeEventListener("gestureend", handleGestureStart);
      }
    };
  }, [
    handleMouseUp,
    handleMouseMove,
    handleTouchEnd,
    handleTouchMove,
    handleGestureStart,
  ]);

  const currentImage = imageList && imageList[currentIndex];

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      showCloseButtonOutOfBox={false}
      enableCloseButton={true}
      bgOpacity="darkest"
      modalClassName="z-[999999]"
      modalContainerClassName="w-full h-full md:w-[90%] md:h-[95%] p-0 flex flex-col bg-gray-50 relative"
    >
      {/* Custom close button that works on all screen sizes */}
      <button
        onClick={handleClose}
        className="absolute right-2 top-2 z-50 flex h-8 w-8 items-center justify-center rounded-full bg-black-900 bg-opacity-70 text-white-a700 hover:bg-opacity-100 sm:right-4 sm:top-4"
        aria-label="Close zoom view"
      >
        <CloseIcon size={20} />
      </button>
      <div
        className="relative flex flex-1 touch-none items-center justify-center overflow-hidden"
        ref={containerRef}
        onWheel={handleWheel}
      >
        {imageList && imageList.length > 0 && !currentImage?.isVideo && (
          <div
            className="relative h-full w-full sm:mt-10"
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            style={{
              cursor:
                scale > 1 ? (isDragging ? "grabbing" : "grab") : "default",
              touchAction: "none", // Prevent browser pinch zoom
            }}
          >
            <div
              className="absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 transform justify-center"
              style={{
                transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px)) scale(${scale})`,
                transformOrigin: "center",
                willChange: "transform",
                transition: isDragging ? "none" : "transform 0.05s ease-out",
              }}
            >
              <Img
                src={currentImage?.imageKey}
                width={1200}
                height={1200}
                alt={`Product image ${currentIndex + 1}`}
                className="max-h-[80vh] max-w-full object-contain"
                addPrefix
                priority
              />
            </div>
          </div>
        )}

        {imageList && imageList.length > 0 && currentImage?.isVideo && (
          <div className="flex h-full w-full items-center justify-center">
            <video
              src={getPublicImageURL({
                key: currentImage.imageKey,
                resize: 1200,
                addPrefix: true,
              })}
              className="max-h-[80vh] max-w-full object-contain"
              controls
              autoPlay
              loop
            />
          </div>
        )}

        {/* Control buttons */}
        {!currentImage?.isVideo && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 text-white-a700 max-sm:hidden">
            <button
              onClick={(e) => handleZoomOut(e)}
              className="rounded-full bg-black-900 bg-opacity-50 p-2 hover:bg-opacity-70"
              disabled={scale === 1}
            >
              <ZoomOutIcon size={24} />
            </button>
            <button
              onClick={handleReset}
              className="rounded-full bg-black-900 bg-opacity-50 p-2 hover:bg-opacity-70"
            >
              <ResetZoomIcon size={24} />
            </button>
            <button
              onClick={(e) => handleZoomIn(e)}
              className="rounded-full bg-black-900 bg-opacity-50 p-2 hover:bg-opacity-70"
              disabled={scale === 5}
            >
              <ZoomInIcon size={24} />
            </button>
          </div>
        )}

        {/* Navigation arrows - desktop only */}
        {imageList && imageList.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black-900 bg-opacity-50 p-3 text-white-a700 hover:bg-opacity-70 max-sm:hidden"
            >
              <ChevronLeftIcon size={24} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black-900 bg-opacity-50 p-3 text-white-a700 hover:bg-opacity-70 max-sm:hidden"
            >
              <ChevronRightIcon size={24} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails with auto-centering */}
      {imageList && imageList.length > 1 && (
        <div className="flex h-24 w-full items-center justify-center px-4 py-2">
          <div
            ref={thumbnailsRef}
            className="scrollbar-hide flex items-center gap-3 overflow-x-auto"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {imageList.map((img, idx) => (
              <div
                key={idx}
                ref={(el) => {
                  thumbnailItemsRef.current[idx] = el;
                }}
                className={`relative flex aspect-square h-16 w-16 flex-shrink-0 cursor-pointer items-center justify-center rounded-md border ${
                  currentIndex === idx
                    ? "border-2 border-gray-600"
                    : "border border-gray-300"
                }`}
                onClick={() => {
                  setCurrentIndex(idx);
                  handleReset();
                }}
              >
                {img.isVideo ? (
                  <div className="relative h-full w-full overflow-hidden rounded-md">
                    <video
                      src={getPublicImageURL({
                        key: img.imageKey,
                        resize: 100,
                        addPrefix: true,
                      })}
                      className="h-full w-full object-cover"
                      muted
                    />
                    <div className="bg-black absolute inset-0 flex items-center justify-center bg-opacity-30">
                      <PlayIcon size={20} className="text-white" />
                    </div>
                  </div>
                ) : (
                  <div className="h-full w-full overflow-hidden rounded-md">
                    <Img
                      src={img.imageKey}
                      width={100}
                      height={100}
                      alt={`Thumbnail ${idx + 1}`}
                      className="h-full w-full object-cover"
                      addPrefix
                      loading="lazy"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ImageZoomModal;
