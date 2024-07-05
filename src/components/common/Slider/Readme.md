# Slider Component

A customizable carousel slider component using `react-alice-carousel`, with support for various configurations and customization options.

## Props

- Renders a slider component with specified items, styles, and behaviors.
-
- @param {Array<ReactNode>} items - The items to be displayed in the slider.
- @param {number} activeIndex - The index of the active slide. Defaults to 0.
- @param {boolean} centerMode - Flag to enable center mode where the active slide is highlighted.
- @param {number} magnifiedIndex - The index of the slide to be magnified in center mode.
- @param {string} activeSlideCSS - CSS classes to apply to non-active slides in center mode.
- @param {string} className - Additional CSS classes for the slider container.
- @param {Object} responsive - Responsive settings for the slider.
- @param {boolean} autoPlay - Flag to enable automatic play of the slides.
- @param {number} autoPlayInterval - Interval (in ms) for automatic play. Defaults to 3000 ms.
- @param {boolean} infinite - Flag to enable infinite looping of slides.
- @param {boolean} disableDotsControls - Flag to disable the dots controls.
- @param {boolean} disableButtonsControls - Flag to disable the buttons controls.
- @param {boolean} touchTracking - Flag to enable touch tracking.
- @param {boolean} mouseTracking - Flag to enable mouse tracking.
- @param {Object} props - Additional props to be spread on the slider component.
- @return {ReactNode} The rendered slider component.

## Example Usage

```jsx
"use client";

import React, { useRef } from "react";
import { Slider } from "./Slider";

const ExamplePage = () => {
  const items = [
    <div className="item" data-value="1">
      1
    </div>,
    <div className="item" data-value="2">
      2
    </div>,
    <div className="item" data-value="3">
      3
    </div>,
    <div className="item" data-value="4">
      4
    </div>,
    <div className="item" data-value="5">
      5
    </div>,
  ];

  const sliderRef = useRef(null);

  return (
    <div>
      <Slider
        items={items}
        activeIndex={0}
        centerMode={true}
        magnifiedIndex={2}
        activeSlideCSS="scale-75"
        className="mb-4"
        responsive={{
          0: { items: 1 },
          512: { items: 2 },
          1024: { items: 3 },
        }}
        autoPlay={true}
        autoPlayInterval={2000}
        infinite={true}
        disableDotsControls={false}
        disableButtonsControls={true}
        touchTracking={true}
        mouseTracking={true}
        ref={sliderRef}
      />
      {/* Example usage of Slider component */}
    </div>
  );
};

export default ExamplePage;
```
