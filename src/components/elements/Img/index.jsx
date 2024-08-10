"use client";

import React, { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import { BASE_PATH } from "@/config";
import { getPublicImageURL } from "@/utils/helpers/img-loader";

const BASE_URL = "/images";

const Img = React.memo(
  ({
    className,
    src,
    alt = "Image",
    isStatic = false,
    width,
    addPrefix = false,
    ...restProps
  }) => {
    const [hasError, setHasError] = useState(false);

    const imageSrc = useMemo(() => {
      if (!src) return null;
      if (isStatic) {
        return addPrefix
          ? getPublicImageURL({
              key: src ? encodeURI(src) : "",
              resize: width,
              addPrefix: true,
            })
          : src;
      }
      return `${BASE_URL}/${src}`;
    }, [src, isStatic, addPrefix, width]);

    const imageLoader = useCallback(
      ({ src, width, quality }) => {
        if (!isStatic) return src;
        return getPublicImageURL({
          key: src ? encodeURI(src) : "",
          resize: width,
          quality: quality || 75,
        });
      },
      [isStatic],
    );

    const handleError = useCallback(() => {
      setHasError(true);
    }, []);

    if (!src || hasError) {
      return <div className={`bg-white ${className}`} />;
    }

    return (
      <Image
        className={className}
        loader={isStatic ? imageLoader : undefined}
        src={imageSrc}
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
