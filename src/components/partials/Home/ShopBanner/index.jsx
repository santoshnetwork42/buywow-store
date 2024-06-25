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
  desktopWidth = 1440,
  desktopHeight = 310,
  desktopAspectRatio = "aspect-[1440/310]",
  mobileWidth = 576,
  mobileHeight = 288,
  mobileAspectRatio = "aspect-[375/187]",
  breakpoint = 576,
  ...props
}) {
  const width = useDeviceWidth();

  if (!width) return null;

  const imageProps =
    width > breakpoint
      ? {
          src: desktopImageUrl,
          width: desktopWidth,
          height: desktopHeight,
          className: `w-full object-contain ${desktopAspectRatio}`,
        }
      : {
          src: mobileImageUrl,
          width: mobileWidth,
          height: mobileHeight,
          className: `w-full object-contain ${mobileAspectRatio}`,
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
