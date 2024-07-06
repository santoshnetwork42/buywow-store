"use client";

import React from "react";
import { Img } from "@/components/common";
import Link from "next/link";
import { useDeviceWidth } from "@/hooks/useDeviceWidth";
import SliderComponent from "@/components/features/Slider/SliderScroll";

const OfferCarousel = ({ offers }) => {
  const width = useDeviceWidth();

  if (!width) return null;
  if (!offers || offers.length === 0) {
    return null;
  }

  const renderOfferItem = (offer, index) => (
    <div key={`offer-${index}`}>
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
  );

  return (
    <SliderComponent
      items={offers}
      renderItem={renderOfferItem}
      className="w-full"
      sliderClassName="gap-2 sm:gap-3 md:gap-4 lg:gap-5"
      showCounter={false}
      showControls={false}
      snapType="mandatory"
      snapAlign="center"
      snapAlways={true}
    />
  );
};

export default OfferCarousel;
