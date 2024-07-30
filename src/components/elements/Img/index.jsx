"use client";

import React, { useMemo, useCallback } from "react";
import Image from "next/image";
import { BASE_PATH } from "../../../../config";
import { getPublicImageURL } from "@/utils/helpers/img-loader";

const BASE_URL = BASE_PATH || "/images";
const DEFAULT_IMAGE = "/images/defaultNoData.png";

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
    const imageSrc = useMemo(() => {
      if (!src) return DEFAULT_IMAGE;
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

    if (!src) return null;

    return (
      <Image
        className={className}
        loader={isStatic ? imageLoader : undefined}
        src={imageSrc}
        alt={alt || "Image"}
        width={width}
        {...restProps}
      />
    );
  },
);

Img.displayName = "Img";

export { Img };
