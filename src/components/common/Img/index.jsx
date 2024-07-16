"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { BASE_PATH } from "../../../../config";
import { getPublicImageURL } from "@/utils/helpers/img-loader";

const BASE_URL = BASE_PATH || "/images";
const DEFAULT_IMAGE = "/images/defaultNoData.png";

const Img = React.memo(
  ({ className, src, alt = "Img", isStatic = false, ...restProps }) => {
    const imgSrc = useMemo(() => {
      if (!src) return DEFAULT_IMAGE;
      return isStatic ? src : `${BASE_URL}/${src}`;
    }, [src, isStatic]);

    const imageLoader = useMemo(() => {
      if (!isStatic) return undefined;
      return ({ src, width, quality }) =>
        getPublicImageURL(encodeURI(src), width, quality);
    }, [isStatic]);

    if (!src) return null;

    return (
      <Image
        className={className}
        loader={imageLoader}
        src={imgSrc}
        alt={alt}
        {...restProps}
      />
    );
  },
);

Img.displayName = "Img";

export { Img };
