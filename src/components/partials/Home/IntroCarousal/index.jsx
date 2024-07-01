"use client";

import React from "react";
import { useDeviceWidth } from "@/utils/useDeviceWidth";
import { Img } from "@/components/common";
import SliderDot from "@/components/features/Slider/SliderDot";

export default function IntroCarousal({ carousalData, ...props }) {
  const [sliderState, setSliderState] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);
  const sliderRef = React.useRef(null);
  const width = useDeviceWidth();

  if (!width) return;

  const items = carousalData.map((data, index) => (
    <React.Fragment key={index}>
      <div
        className="flex w-full"
        onMouseDown={() => setIsDragging(false)}
        onMouseMove={() => setIsDragging(true)}
        onMouseUp={() => {
          if (!isDragging) {
            window.location.href = data.linkUrl;
          }
        }}
        draggable={false}
      >
        <Img
          src={width > 576 ? data.desktopImage : data.mobileImage}
          width={width > 576 ? 1440 : 376}
          height={width > 576 ? 496 : 148}
          alt={`hero image ${index}`}
          className={`w-full object-contain ${
            width > 576 ? "aspect-[1440/496]" : "aspect-[376/148]"
          }`}
        />
      </div>
    </React.Fragment>
  ));

  return (
    <>
      {/* hero slider section */}
      <div {...props} className={`${props.className} relative`}>
        <div className="intro-carousal-container flex w-full">
          <SliderDot
            items={items}
            sliderState={sliderState}
            setSliderState={setSliderState}
            sliderRef={sliderRef}
          />
        </div>
      </div>
    </>
  );
}
