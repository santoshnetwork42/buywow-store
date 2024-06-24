import React from "react";
import { Slider } from "@/components/common";

const SliderDot = ({ items, sliderState, setSliderState, sliderRef }) => {
  return (
    <Slider
      autoPlay
      autoPlayInterval={2000}
      responsive={{
        0: { items: 1 },
        551: { items: 1 },
        1051: { items: 1 },
      }}
      renderDotsItem={(props) => {
        return props?.isActive ? (
          <div className="mr-1.5 inline-block h-[6px] w-[10px] cursor-pointer rounded-[3px] bg-white-a700_01" />
        ) : (
          <div className="mr-1.5 inline-block h-[6px] w-[6px] cursor-pointer rounded-[3px] bg-lime-50" />
        );
      }}
      activeIndex={sliderState}
      onSlideChanged={(e) => {
        setSliderState(e?.item);
      }}
      ref={sliderRef}
      items={items}
    />
  );
};

export default SliderDot;
