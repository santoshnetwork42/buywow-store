"use client";

import DownArrowIcon from "@/assets/svg/downArrow";
import useWindowDimensions from "@/utils/helpers/getWindowDimension";
import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";

export default function VideoHeroBanner({
  webVideo,
  webVideoThumbnail,
  mWebVideo,
  mWebVideoThumbnail,
  title,
  titleColor = "#FFFFFF",
  ctaText,
  ctaLink,
}) {
  const webVideoUrl = webVideo?.data?.attributes?.url || "";
  const webVideoThumbnailUrl = webVideoThumbnail?.data?.attributes?.url || "";
  const mWebVideoUrl = mWebVideo?.data?.attributes?.url || "";
  const mWebVideoThumbnailUrl = mWebVideoThumbnail?.data?.attributes?.url || "";

  const { isSmallSize: isMobile } = useWindowDimensions();
  const videoRef = useRef(null);
  const titleRef = useRef(null);
  const scrollTimerRef = useRef(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const [scale, setScale] = useState(isMobile ? 5 : 10);
  const [height, setHeight] = useState(0);
  const [isTop, setIsTop] = useState(true);
  const [opacity, setOpacity] = useState(0);

  // Determine the correct video source and poster based on screen size
  const videoSrc = isMobile ? mWebVideoUrl : webVideoUrl;
  const posterSrc = isMobile ? mWebVideoThumbnailUrl : webVideoThumbnailUrl;

  // Handle video loading with error handling
  const handleVideoLoaded = useCallback(() => {
    setIsLoaded(true);
    if (videoRef?.current) {
      videoRef.current.play().catch((error) => {
        console.error("Autoplay was prevented:", error);
      });
    }
  }, []);

  // Update video source when screen size changes
  useEffect(() => {
    if (!videoRef?.current) return;

    // Pause the current video
    videoRef.current.pause();

    // Set new source and poster
    videoRef.current.src = videoSrc;
    videoRef.current.poster = posterSrc;

    // Reset loaded state
    setIsLoaded(false);

    // Load and play the new video
    videoRef.current.load();

    const videoElement = videoRef.current;
    videoElement.addEventListener("loadeddata", handleVideoLoaded, {
      once: true,
    });

    return () => {
      videoElement?.removeEventListener("loadeddata", handleVideoLoaded);
    };
  }, [isMobile, videoSrc, posterSrc, handleVideoLoaded]);

  // Initialize video playback with intersection observer
  useEffect(() => {
    if (!videoRef?.current || isLoaded) return;

    let observer;

    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && videoRef?.current && !isLoaded) {
              videoRef.current.load();
              videoRef.current.addEventListener(
                "loadeddata",
                handleVideoLoaded,
                { once: true },
              );
            }
          });
        },
        { threshold: 0.1 },
      );

      observer.observe(videoRef.current);
    } else {
      // Fallback for browsers without Intersection Observer
      if (videoRef?.current) {
        videoRef.current.load();
        videoRef.current.addEventListener("loadeddata", handleVideoLoaded, {
          once: true,
        });
      }
    }

    return () => {
      if (observer && videoRef?.current) {
        observer.disconnect();
      }

      if (videoRef?.current) {
        videoRef.current.removeEventListener("loadeddata", handleVideoLoaded);
      }
    };
  }, [isLoaded, handleVideoLoaded]);

  // Optimized scroll handler with throttling
  const handleScroll = useCallback(() => {
    if (scrollTimerRef?.current) return;

    scrollTimerRef.current = setTimeout(() => {
      scrollTimerRef.current = null;

      const section = videoRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight && rect.bottom > 0) {
        const top = Math.max(0, rect.top);
        const bottom = Math.max(0, Math.min(rect.bottom, windowHeight));
        const newHeight = Math.max(0, bottom - top);

        setHeight(newHeight);
        setIsTop(rect.bottom > windowHeight);
        const newScale =
          ((Math.max(0, rect.bottom) - Math.max(0, rect.top)) *
            (isMobile ? 5 : 10)) /
          (rect.bottom - rect.top);
        setScale(newScale);

        // Update opacity based on height
        setOpacity(newHeight > 300 ? 1 : 0);
      }
    }, 16);
  }, [isMobile]);

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
      }
    };
  }, [handleScroll]);

  return (
    <div className="relative mb-6 h-[calc(100vh-253px)] w-full overflow-hidden sm:mb-8 sm:h-[calc(100vh-108px)] md:mb-12 lg:mb-14">
      {/* Video element with performance optimizations */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        muted
        loop
        playsInline
        preload="metadata"
        src={videoSrc}
        poster={posterSrc}
        aria-hidden="true"
      />

      {/* Overlay to improve text readability */}
      <div className="bg-black absolute inset-0 bg-opacity-40" />

      {/* Content overlay with title */}
      <div
        className={`absolute ${isTop ? "top-0" : "bottom-0"} left-0 z-10 flex h-full w-full flex-col items-center justify-center px-4 text-center text-white-a700`}
        style={{
          height: `${height}px`,
        }}
      >
        {title && (
          <h1
            ref={titleRef}
            className="wrap-break-word mb-4 w-20 font-bold leading-none tracking-wide sm:w-24"
            style={{
              scale: `${scale}`,
              transition: `all 0.15s ease-out`,
              color: titleColor,
            }}
          >
            {title}
          </h1>
        )}
      </div>

      {/* CTA section */}
      <div
        className="absolute bottom-0 left-0 z-10 mb-4 flex h-full w-full flex-col items-center justify-end px-4 text-center text-white-a700"
        style={{
          opacity,
          transition: "all 0.5s ease-in-out",
        }}
      >
        {ctaText && (
          <Link
            href={ctaLink || "#"}
            className={`flex flex-col items-center gap-y-6 ${isMobile ? "tracking-[.2em]" : "tracking-[.4em]"}`}
          >
            <h1
              className="mb-30 border-b-2 border-white-a700_01 pb-2 font-semibold"
              style={{ color: titleColor }}
            >
              {ctaText.toLocaleUpperCase()}
            </h1>
            <div className="animate-bounce">
              <DownArrowIcon width={24} height={24} fill="#FFFFFF" />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
