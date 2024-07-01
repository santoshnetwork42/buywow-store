"use client";

import React from "react";
import { Img } from "@/components/common";
import Link from "next/link";
import { useDeviceWidth } from "@/utils/useDeviceWidth";

const OfferCarousel = ({ offers }) => {
  const width = useDeviceWidth();

  if (!width) return null;
  if (!offers || offers.length === 0) {
    return null;
  }

  return (
    <section className="no-scrollbar w-full overflow-x-auto">
      <div className="m-auto flex w-max gap-2 sm:gap-3 md:gap-4 lg:gap-5">
        {offers.map((offer, index) => (
          <div key={`offer-${index}`} className="offer-item">
            <Link href={offer.linkUrl}>
              <Img
                src={width > 768 ? offer.desktopImage : offer.mobileImage}
                alt={offer.label}
                width={width > 768 ? 650 : 298}
                height={width > 768 ? 166 : 120}
                className={`object-contain ${
                  width > 768
                    ? "w-[85vw] max-w-[650px] md:w-[50vw] lg:w-[46vw]"
                    : "w-[85vw] sm:w-[48vw] lg:w-[46vw]"
                }`}
              />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OfferCarousel;
