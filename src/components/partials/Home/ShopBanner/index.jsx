"use client";

import { Img } from "@/components/common";
import { useDeviceWidth } from "@/utils/useDeviceWidth";
import Link from "next/link";
import React from "react";

export default function ShopBanner({
  desktopImageUrl,
  mobileImageUrl,
  linkUrl,
  altText = "Shop banner",
  ...props
}) {
  const width = useDeviceWidth();

  if (!width) return null;

  const imageProps =
    width > 576
      ? {
          src: desktopImageUrl,
          width: 1440,
          height: 310,
          className: "w-full object-cover",
        }
      : {
          src: mobileImageUrl,
          width: 576,
          height: 288,
          className: "w-full object-cover aspect-[375/187]",
        };

  return (
    <div
      {...props}
      className={`${props.className} self-stretch`}>
      <Link href={linkUrl || "#"}>
        <Img
          {...imageProps}
          alt={altText}
        />
      </Link>
    </div>
  );
}
