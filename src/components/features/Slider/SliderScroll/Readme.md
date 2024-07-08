# SliderComponent

A highly customizable slider component that supports snapping, controls, counters, and dynamic item rendering.

## Props

- `items` (array): The items to be displayed in the slider.
- `className` (string): Additional CSS classes for the slider container.
- `sliderClassName` (string): Additional CSS classes for the inner slider.
- `renderItem` (function): A function to render each item. Receives the item and its index as arguments.
- `showCounter` (boolean): Flag to show the item counter. Defaults to `true`.
- `showControls` (boolean): Flag to show the navigation controls. Defaults to `true`.
- `snapType` (string): The snap type for the slider. Can be "mandatory", "proximity", or "none". Defaults to "mandatory".
- `snapAlign` (string): The snap alignment for the slider. Can be "start", "center", or "end". Defaults to "center".
- `snapAlways` (boolean): Flag to always snap the items. Defaults to `true`.
- `...props` (object): Additional props to be spread on the slider component.

## Example Usage

```jsx
"use client";

import React from "react";
import SliderComponent from "./SliderComponent";
import { Img, Text } from "./components/common";

const ExamplePage = () => {
  const items = [
    <Img src="image1.png" alt="Image 1" />,
    <Img src="image2.png" alt="Image 2" />,
    <Img src="image3.png" alt="Image 3" />,
  ];

  return (
    <div>
      <SliderComponent
        items={items}
        renderItem={(item, index) => (
          <div key={index} className="p-2">
            {item}
          </div>
        )}
        showCounter
        showControls
        snapType="mandatory"
        snapAlign="center"
        snapAlways=true
        className="my-slider"
        sliderClassName="my-slider-inner"
      />
    </div>
  );
};

export default ExamplePage;
```
