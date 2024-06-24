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
        draggable={false}>
        {width > 576 ? (
          <Img
            src={data.desktopImage}
            width={1440}
            height={496}
            alt={`hero image ${index}`}
            className="w-full object-cover"
          />
        ) : (
          <Img
            src={data.mobileImage}
            width={376}
            height={148}
            alt={`hero image ${index}`}
            className="w-full object-cover aspect-[574/349]"
          />
        )}
      </div>
    </React.Fragment>
  ));

  return (
    <>
      {/* hero slider section */}
      <div
        {...props}
        className={`${props.className} relative`}>
        <div className="Group623 flex w-full">
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
