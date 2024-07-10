"use client";

import React from "react";
import Image from "next/image";

const BASE_URL = process.env.BASE_PATH || "/images/";

const Img = ({ className, src, alt, isStatic = false, ...restProps }) => {
  const [imgSrc, setImgSrc] = React.useState(src);

  return (
    <Image
      className={className}
      src={
        src
          ? isStatic
            ? imgSrc
            : BASE_URL + imgSrc
          : BASE_URL + "defaultNoData.png"
      }
      alt={alt || "Img"}
      {...restProps}
      onError={() => {
        setImgSrc("defaultNoData.png");
      }}
    />
  );
};
export { Img };
