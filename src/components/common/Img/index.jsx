"use client";

import React from "react";
import Image from "next/image";

const BASE_URL = process.env.BASE_PATH || "/images/";

const Img = ({
  className,
  src,
  alt = "Img",
  isStatic = false,
  ...restProps
}) => {
  console.log(src);
  const [imgSrc, setImgSrc] = React.useState(src);

  return (
    <Image
      className={className}
      src={
        src
          ? isStatic
            ? imgSrc
            : BASE_URL + imgSrc
          : "/images/defaultNoData.png"
      }
      alt={alt}
      {...restProps}
      onError={() => {
        setImgSrc("defaultNoData.png");
      }}
    />
  );
};
export { Img };
