"use client";

import DownArrowIcon from "@/assets/svg/downArrow";
import { ArrowIconSVG } from "@/assets/svg/icons";
import ToggleArrow from "@/components/features/Accordion/AccordionToggle";
import useWindowDimensions from "@/utils/helpers/getWindowDimension";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function VideoHeroBanner({
  videoSrc,
  posterSrc,
  title,
  subtitle,
  ctaText,
  ctaLink,
}) {
  const { isSmallSize: isMobile } = useWindowDimensions();
  const videoRef = useRef(null);
  const titleRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scale, setScale] = useState(isMobile ? 7 : 12); // % translate
  const [height, setHeight] = useState(0);
  const [top, setTop] = useState(true);

  useEffect(() => {
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // Load and play video when it comes into view
            if (entry.isIntersecting) {
              if (videoRef.current) {
                // Lazy load the video source
                if (!videoRef.current.src) {
                  videoRef.current.src = videoSrc;
                }
                // Play when loaded
                videoRef.current.load();
                videoRef.current.addEventListener(
                  "loadeddata",
                  () => {
                    setIsLoaded(true);
                    videoRef.current.play().catch((error) => {
                      console.log("Autoplay was prevented:", error);
                    });
                  },
                  { once: true },
                );
              }
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 },
      );

      if (videoRef.current) {
        observer.observe(videoRef.current);
      }

      return () => {
        if (videoRef.current) {
          observer.unobserve(videoRef.current);
        }
      };
    } else {
      // Fallback for browsers without Intersection Observer
      if (videoRef.current) {
        videoRef.current.src = videoSrc;
        videoRef.current.load();
        setIsLoaded(true);
      }
    }
  }, [videoSrc]);

  useEffect(() => {
    const handleScroll = () => {
      const section = videoRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight && rect.bottom > 0) {
        const top = Math.max(0, rect.top);
        const bottom = Math.max(0, Math.min(rect.bottom, windowHeight));
        const height = Math.max(0, bottom - top);
        setHeight(height);
        if (rect.bottom > windowHeight) setTop(true);
        else setTop(false);
        setScale(
          ((Math.max(0, rect.bottom) - Math.max(0, rect.top)) *
            (isMobile ? 7 : 12)) /
            (rect.bottom - rect.top),
        );
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative h-[calc(100vh-253px)] w-full overflow-hidden sm:h-[calc(100vh-108px)]">
      {/* Poster image shown until video loads */}
      {posterSrc && !isLoaded && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${posterSrc})` }}
          aria-hidden="true"
        />
      )}
      {/* Video element */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        muted
        loop
        playsInline
        preload="metadata"
        poster={posterSrc}
        aria-hidden="true"
      >
        {/* Source is set dynamically in useEffect */}
      </video>
      {/* Overlay to improve text readability */}
      <div className="bg-black inset-0 bg-opacity-40" />
      {/* Content overlay */}
      <div
        className={`absolute ${top ? "top-0" : "bottom-0"} left-0 z-10 flex h-full w-full flex-col items-center justify-center px-4 text-center text-white-a700`}
        style={{
          height: `${height}px`,
        }}
      >
        {title && (
          <h1
            id={titleRef}
            className="mb-4 font-bold leading-none"
            style={{
              scale: `${scale}`,
              transition: `all 0.15s ease-out`,
            }}
          >
            {title}
          </h1>
        )}
      </div>
      <div
        className={`absolute bottom-0 left-0 z-10 mb-4 flex h-full w-full flex-col items-center justify-end px-4 text-center text-white-a700`}
        style={{
          opacity: `${Number(height > 300)}`,
          transition: `all 0.5s ease-in-out`,
        }}
      >
        {subtitle && (
          <Link
            href={`${ctaLink}`}
            className={`flex flex-col items-center gap-y-6 ${isMobile ? "tracking-[.2em]" : "tracking-[.4em]"}`}
          >
            <h1
              id={titleRef}
              className="mb-30 border-b-2 border-white-a700_01 pb-2 font-semibold"
            >
              {(subtitle || "").toLocaleUpperCase()}
            </h1>
            <div className="animate-bounce">
              {" "}
              <DownArrowIcon width={24} height={24} fill="#FFFFFF" />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
