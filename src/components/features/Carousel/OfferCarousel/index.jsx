"use client";

import React from "react";
import { Img } from "@/components/common";
import Link from "next/link";
import { useDeviceWidth } from "@/utils/useDeviceWidth";
import SliderDot from "../../Slider/SliderDot";

const OfferCarousel = ({ offers }) => {
  const width = useDeviceWidth();

  if (!width) return;
  if (!offers || offers.length === 0) {
    return null;
  }

  return (
    <section className="no-scrollbar w-full overflow-x-auto">
      <div className="flex w-max gap-2 sm:gap-3 md:gap-4 lg:gap-5">
        {offers.map((offer, index) => (
          <div key={`offer-${index}`} className="offer-item">
            <Link href={offer.linkUrl}>
              {width > 768 ? (
                <Img
                  src={offer.desktopImage}
                  alt={offer.label}
                  width={650}
                  height={166}
                  className="w-[85vw] max-w-[650px] object-contain md:w-[50vw] lg:w-[46vw]"
                />
              ) : (
                <Img
                  src={offer.mobileImage}
                  alt={offer.label}
                  width={298}
                  height={120}
                  className="w-[85vw] object-contain sm:w-[48vw] lg:w-[46vw]"
                />
              )}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OfferCarousel;
