import { Img } from "@/components/common";
import Link from "next/link";
import React from "react";

export default function CollectionPageBanner({ bannerData, ...props }) {
  return (
    <div {...props} className={`${props.className} flex w-full justify-center`}>
      <Link href={bannerData.link} className="w-full">
        <Img
          src={bannerData.desktopImg.src}
          height={bannerData.desktopImg.height}
          width={bannerData.desktopImg.width}
          alt={bannerData.alt}
          className="hidden aspect-[1340/400] h-auto w-full object-contain sm:block"
        />
        <Img
          src={bannerData.mobileImg.src}
          height={bannerData.mobileImg.height}
          width={bannerData.mobileImg.width}
          alt={bannerData.alt}
          className="aspect-[350/200] h-auto w-full object-contain sm:hidden"
        />
      </Link>
    </div>
  );
}
