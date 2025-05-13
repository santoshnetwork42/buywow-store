"use client";

import { useState, useEffect, useRef } from "react";
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
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsIntersecting(entry.isIntersecting);
      },
      {
        // Adjust rootMargin to start loading slightly before the video comes into view
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

  // Only load video when element is visible or has been visible
  useEffect(() => {
    if (isIntersecting && videoRef.current && !videoRef.current.src) {
      const videoSrc = getPublicImageURL({
        key: videoKey,
        resize: 300,
        addPrefix: true,
      });
      videoRef.current.src = videoSrc;
      const onCanPlayThrough = () => {
        setIsVideoReady(true);
        videoRef.current.play().catch((err) => {
          console.warn("Autoplay failed:", err);
        });
      };

      videoRef.current.addEventListener("canplaythrough", onCanPlayThrough);

      return () => {
        videoRef?.current?.removeEventListener(
          "canplaythrough",
          onCanPlayThrough,
        );
      };
    }
  }, [isIntersecting, videoKey]);

  return (
    <div
      ref={containerRef}
      className={`relative aspect-square w-full ${className}`}
      style={{ backgroundColor: imageBgColor }}
    >
      {/* Show thumbnail until video is loaded */}
      {(!isIntersecting || !isVideoReady) && !videoRef?.current?.src && (
        <ProductThumbnail
          width={400}
          height={550}
          url={thumbnailUrl}
          imageKey={imageKey}
          className="aspect-square w-full object-contain"
          alt={title || "Product thumbnail"}
        />
      )}
      <video
        ref={videoRef}
        poster={imageKey}
        height={height}
        width={width}
        className={`aspect-square w-full ${!isVideoReady ? "invisible absolute" : ""}`}
        muted
        autoPlay={isIntersecting}
        loop
        playsInline
        loading="lazy"
        alt={title}
        onPlay={() => setIsVideoReady(true)}
      />
    </div>
  );
};

export default LazyVideo;
