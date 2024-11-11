"use client";

import { Text } from "@/components/elements";
import { getPublicImageURL } from "@/utils/helpers/img-loader";
import Image from "next/image";
import React, { useCallback, useMemo, useState } from "react";

const IMAGE_BASE_URL = "/images";
const DEFAULT_IMAGE_QUALITY = 75;

const Img = React.memo(
  ({
    className,
    src,
    alt = "Image",
    isStatic = false,
    width,
    addPrefix = false,
    quality = DEFAULT_IMAGE_QUALITY,
    isPersistLoading = false,
    ...restProps
  }) => {
    const [hasError, setHasError] = useState(false);

    const imageConfig = useMemo(() => {
      if (!src) return { src: null, loader: undefined };

      if (!isStatic) {
        const processedSrc = addPrefix ? src : encodeURI(src);
        return {
          src: processedSrc,
          loader: ({ src: imageSrc, width: imageWidth }) => {
            return getPublicImageURL({
              key: imageSrc,
              resize: Math.ceil(imageWidth * 0.75),
              quality,
              addPrefix,
            });
          },
        };
      }

      return { src: `${IMAGE_BASE_URL}/${src}`, loader: undefined };
    }, [src, isStatic, addPrefix, quality]);

    const handleError = useCallback(() => {
      setHasError(true);
    }, []);

    if (!src || hasError) {
      return (
        <div
          className={`bg-white ${className} flex items-center justify-center overflow-hidden`}
        >
          <Text size="sm" as="span" className="text-center" responsive>
            {alt}
          </Text>
        </div>
      );
    }

    if (isPersistLoading) {
      return (
        <Image
          className={className}
          src={imageConfig.src}
          alt={alt || "Image"}
          width={width}
          onError={handleError}
          {...restProps}
        />
      );
    }

    return (
      <Image
        className={className}
        loader={imageConfig.loader}
        src={imageConfig.src}
        alt={alt || "Image"}
        width={width}
        onError={handleError}
        {...restProps}
      />
    );
  },
);

Img.displayName = "Img";

export { Img };
