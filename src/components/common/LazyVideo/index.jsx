"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { getPublicImageURL } from "@/utils/helpers/img-loader";
import ProductThumbnail from "@/components/partials/Product/ProductThumbnail";

const LazyVideo = ({
  videoKey,
  imageKey,
  width = 400,
  height = 550,
  thumbnailUrl,
  title = "Product video",
  className = "",
  imageBgColor = "#F7F7E7",
}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Intersection observer setup
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        const newIsIntersecting = entry.isIntersecting;
        setIsIntersecting(newIsIntersecting);
        // Try to play when coming into view if already loaded
        if (
          newIsIntersecting &&
          videoRef.current &&
          videoRef.current.readyState >= 3
        ) {
          videoRef.current.play().catch((err) => {
            console.warn("Autoplay failed:", err);
          });
        }
      },
      {
        rootMargin: "200px",
        threshold: 0.01,
      },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // Define play video function with useCallback to avoid recreation on each render
  const playVideo = useCallback(() => {
    if (!videoRef.current || !isMountedRef.current) return;

    const playPromise = videoRef.current.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          if (isMountedRef.current) {
            setIsVideoReady(true);
            setHasError(false);
          }
        })
        .catch((error) => {
          console.warn("Video play failed:", error);
          // On iOS, autoplay with sound is blocked, try muted
          if (videoRef.current && !videoRef.current.muted) {
            videoRef.current.muted = true;
            videoRef.current.play().catch((err) => {
              console.warn("Muted autoplay failed:", err);
              if (isMountedRef.current) {
                setHasError(true);
              }
            });
          } else if (isMountedRef.current) {
            setHasError(true);
          }
        });
    }
  }, []);

  // Video loading and event setup
  useEffect(() => {
    if (!isIntersecting || !videoRef.current || hasError) return;
    let isSetup = false;
    if (!videoRef.current.src) {
      try {
        const videoSrc = getPublicImageURL({
          key: videoKey,
          resize: 300,
          addPrefix: true,
        });

        if (!videoSrc) {
          console.error("Invalid video source generated");
          setHasError(true);
          return;
        }

        videoRef.current.src = videoSrc;
      } catch (error) {
        console.error("Error setting video source:", error);
        setHasError(true);
        return;
      }
    }

    // Setup event listeners
    const onLoadedData = () => {
      if (isIntersecting && isMountedRef.current && !isSetup) {
        isSetup = true;
        playVideo();
      }
    };

    const onCanPlay = () => {
      if (isIntersecting && isMountedRef.current && !isSetup) {
        isSetup = true;
        playVideo();
      }
    };

    const onError = (error) => {
      console.error("Video error:", error);
      if (isMountedRef.current) {
        setIsVideoReady(false);
        setHasError(true);
      }
    };

    // Add event listeners
    videoRef.current.addEventListener("loadeddata", onLoadedData);
    videoRef.current.addEventListener("canplay", onCanPlay);
    videoRef.current.addEventListener("error", onError);

    // Cleanup
    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener("loadeddata", onLoadedData);
        videoRef.current.removeEventListener("canplay", onCanPlay);
        videoRef.current.removeEventListener("error", onError);
      }
    };
  }, [isIntersecting, videoKey, playVideo, hasError]);

  return (
    <div
      ref={containerRef}
      className={`relative aspect-square w-full ${className}`}
      style={{ backgroundColor: imageBgColor }}
    >
      {/* Show thumbnail until video is loaded or if there's an error */}
      {(!isVideoReady || hasError) && (
        <ProductThumbnail
          width={width}
          height={height}
          url={thumbnailUrl}
          imageKey={imageKey}
          className="aspect-square w-full object-contain"
          alt={title || "Product thumbnail"}
        />
      )}

      <video
        ref={videoRef}
        height={height}
        width={width}
        className={`aspect-square w-full ${!isVideoReady || hasError ? "hidden" : ""}`}
        muted
        autoPlay={false}
        loop
        playsInline
        alt={title}
      />
    </div>
  );
};

export default LazyVideo;
