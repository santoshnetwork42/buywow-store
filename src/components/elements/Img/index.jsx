"use client";

import { Text } from "@/components/elements";
import { getPublicImageURL } from "@/utils/helpers/img-loader";
import Image from "next/image";
import React, { useCallback, useMemo, useState } from "react";

const BASE_URL = "/images";

const Img = React.memo(
  ({
    className,
    src,
    alt = "Image",
    isStatic = false,
    width,
    addPrefix = false,
    quality = 75,
    test,
    ...restProps
  }) => {
    const [hasError, setHasError] = useState(false);

    const imageData = useMemo(() => {
      if (!src) return { src: null, loader: undefined };

      if (isStatic) {
        const staticSrc = addPrefix ? src : encodeURI(src);
        return {
          src: staticSrc,
          loader: ({ src, width: w }) => {
            {
              test &&
                console.log(
                  src,
                  getPublicImageURL({
                    key: src,
                    resize: w,
                    quality,
                    addPrefix,
                  }),
                );
            }
            return getPublicImageURL({
              key: src,
              resize: w,
              quality,
              addPrefix,
            });
          },
        };
      }

      return { src: `${BASE_URL}/${src}`, loader: undefined };
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

    return (
      <Image
        className={className}
        loader={imageData.loader}
        src={imageData.src}
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
