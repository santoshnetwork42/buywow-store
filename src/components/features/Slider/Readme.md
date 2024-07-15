# Slider

A responsive and customizable slider component using `embla-carousel` with additional features like a progress bar, slide counter, and navigation controls.

## Props

- `children` (node): The items to be displayed in the slider.
- `className` (string): Additional CSS classes for the slider container.
- `sliderClassName` (string): Additional CSS classes for the inner slider.
- `showCounter` (boolean): Flag to show the slide counter. Defaults to `true`.
- `showControls` (boolean): Flag to show the navigation controls. Defaults to `true`.
- `...props` (object): Additional props to be spread on the slider component.

## Example Usage

```jsx
"use client";

import React from "react";
import Slider from "./Slider";
import { Img, Text } from "./components/common";

const ExamplePage = () => {
  const items = [
    <Img src="image1.png" alt="Image 1" />,
    <Img src="image2.png" alt="Image 2" />,
    <Img src="image3.png" alt="Image 3" />,
  ];

  return (
    <div>
      <Slider
        showCounter
        showControls
        className="my-slider"
        sliderClassName="my-slider-inner"
      >
        {items.map((item, index) => (
          <div key={index} className="p-2">
            {item}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ExamplePage;
```
