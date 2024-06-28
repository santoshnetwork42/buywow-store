import { Img } from "@/components/common";
import Link from "next/link";
import React from "react";

export default function CollectionPageBanner({ ...props }) {
  return (
    <div {...props} className={`${props.className} flex w-full justify-center`}>
      <Link href="/collections/hair-care" className="w-full">
        <Img
          src="img_collection_banner.png"
          height={400}
          width={1340}
          alt="hair care"
          className="hidden aspect-[1340/400] h-auto w-full object-contain sm:block"
        />
        <Img
          src="img_collection_banner_mobile.png"
          height={200}
          width={350}
          alt="hair care"
          className="aspect-[350/200] h-auto w-full object-contain sm:hidden"
        />
      </Link>
    </div>
  );
}
