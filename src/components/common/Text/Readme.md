# Text Component

A customizable text component with support for various sizes and responsive styles.

## Props

- Renders a text component with specified properties and styles.
-
- @param {ReactNode} children - The content to be displayed inside the text component.
- @param {string} className - Additional CSS classes for the text component.
- @param {string} size - The size of the text. One of 'xxs', 'xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'. Defaults to 'base'.
- @param {boolean} responsive - Flag to enable responsive text sizes. Defaults to false.
- @param {string} as - The HTML element to render the text as. Defaults to 'p'.
- @param {Object} restProps - Additional props to be spread on the text component.
- @return {ReactNode} The rendered text component.

## Example Usage

```jsx
"use client";

import React from "react";
import { Text } from "./Text";

const ExamplePage = () => {
  return (
    <div>
      <Text size="xl" className="mb-4">
        This is an extra-large text.
      </Text>
      <Text size="lg" responsive={true} className="mb-4">
        This is a large responsive text.
      </Text>
      <Text size="base" as="span" className="mb-4">
        This is a base size text rendered as a span element.
      </Text>
      {/* Example usage of Text component */}
    </div>
  );
};

export default ExamplePage;
```
