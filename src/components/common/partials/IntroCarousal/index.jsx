"use client";

import React from "react";
import { useDeviceWidth } from "@/utils/hooks/useDeviceWidth";
import { Img } from "@/components/common";
import SliderDot from "@/components/features/Slider/SliderDot";

export default function IntroCarousal({ carousalData, ...props }) {
  const [sliderState, setSliderState] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);
  const sliderRef = React.useRef(null);

  const width = useDeviceWidth();
  if (!width) return;

  const items = carousalData.map((data, index) => {
    const isDesktop = width > 576;
    const dimensions = isDesktop
      ? data.desktopDimensions
      : data.mobileDimensions;
    const aspectRatio = `${dimensions.width} / ${dimensions.height}`;

    return (
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
            src={isDesktop ? data.desktopImage : data.mobileImage}
            width={dimensions.width}
            height={dimensions.height}
            alt={`hero image ${index}`}
            className={`w-full object-contain`}
            style={{ aspectRatio }}
          />
        </div>
      </React.Fragment>
    );
  });

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
