/* eslint-disable react/display-name */
"use client";

import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import PropTypes from "prop-types";

const Slider = React.forwardRef(
  (
    {
      items = [],
      activeIndex = 0,
      centerMode = false,
      magnifiedIndex = 0,
      activeSlideCSS = "scale-75",
      className = "",
      responsive = {},
      autoPlay = false,
      autoPlayInterval = 3000,
      infinite = true,
      disableDotsControls = false,
      disableButtonsControls = true,
      touchTracking = true,
      mouseTracking = true,
      ...props
    },
    ref,
  ) => {
    const isSmall = (index) => {
      if (props?.activeIndex + magnifiedIndex >= items?.length) {
        return index !== props?.activeIndex + magnifiedIndex - items?.length;
      } else {
        return index !== props.activeIndex + magnifiedIndex;
      }
    };

    const slideItems = centerMode
      ? items?.map((child, index) => {
          if (isSmall(index)) {
            return React.cloneElement(child, {
              ...child.props,
              className: [child.props?.className, activeSlideCSS]
                .filter(Boolean)
                .join(" "),
            });
          }
          return React.cloneElement(child);
        })
      : items;

    return (
      <AliceCarousel
        items={slideItems}
        activeIndex={activeIndex}
        infinite={infinite}
        responsive={responsive}
        autoPlay={autoPlay}
        autoPlayInterval={autoPlayInterval}
        disableDotsControls={disableDotsControls}
        disableButtonsControls={disableButtonsControls}
        touchTracking={touchTracking}
        mouseTracking={mouseTracking}
        ref={ref}
        {...props}
      />
    );
  },
);

Slider.propTypes = {
  items: PropTypes.arrayOf(PropTypes.node).isRequired,
  activeIndex: PropTypes.number,
  centerMode: PropTypes.bool,
  magnifiedIndex: PropTypes.number,
  activeSlideCSS: PropTypes.string,
  className: PropTypes.string,
  responsive: PropTypes.object,
  autoPlay: PropTypes.bool,
  autoPlayInterval: PropTypes.number,
  infinite: PropTypes.bool,
  disableDotsControls: PropTypes.bool,
  disableButtonsControls: PropTypes.bool,
  touchTracking: PropTypes.bool,
  mouseTracking: PropTypes.bool,
};

Slider.displayName = "Slider";

export { Slider };
