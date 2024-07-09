"use client";

import { Img } from "@/components/common";
import { useDeviceWidth } from "@/utils/hooks/useDeviceWidth";
import Link from "next/link";
import React from "react";

export default function ShopBanner({
  desktop,
  mobile,
  linkUrl,
  altText = "Shop banner",
  breakpoint = 576,
  ...props
}) {
  const width = useDeviceWidth();
  if (!width) return null;

  const imageProps =
    width > breakpoint
      ? {
          src: desktop.desktopImageUrl,
          width: desktop.width,
          height: desktop.height,
          className: `w-full object-contain ${desktop.aspectRatio}`,
        }
      : {
          src: mobile.mobileImageUrl,
          width: mobile.width,
          height: mobile.height,
          className: `w-full object-contain ${mobile.aspectRatio}`,
        };

  return (
    <div {...props} className={`${props.className} self-stretch`}>
      <Link href={linkUrl || "#"}>
        <Img {...imageProps} alt={altText} />
      </Link>
    </div>
  );
}
