# Img Component

A custom image component that handles errors and supports both static and dynamic image sources.

## Props

- Renders an image component with specified source, alt text, and additional styles.
-
- @param {string} className - Additional CSS classes for the image.
- @param {string} src - The source URL for the image. Defaults to 'defaultNoData.png'.
- @param {string} alt - The alt text for the image. Defaults to 'testImg'.
- @param {boolean} isStatic - Flag to indicate if the image source is a static file. If false, the image source will be prefixed with the BASE_URL.
- @param {Object} restProps - Additional props to be spread on the image element.
- @return {ReactNode} The rendered image component.

## Example Usage

```jsx
"use client";

import React from "react";
import { Img } from "./Img";

const ExamplePage = () => {
  return (
    <div>
      <Img
        className="h-32 w-32"
        src="exampleImage.png"
        alt="Example Image"
        width={128}
        height={128}
      />
      <Img
        className="h-32 w-32"
        src="dynamicImage.png"
        alt="Dynamic Image"
        width={128}
        height={128}
      />
      {/* Example usage of Img component */}
    </div>
  );
};

export default ExamplePage;
```
