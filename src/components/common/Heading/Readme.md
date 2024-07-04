# Heading Component

A customizable heading component that supports various sizes, responsive styles, and HTML tags.

## Props

- Renders a heading component with specified children and styles.
-
- @param {ReactNode} children - The content to be displayed inside the heading.
- @param {string} className - Additional CSS classes for the heading.
- @param {string} size - The size of the heading. One of 'xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', or 'heading'.
- @param {boolean} responsive - Flag to use responsive size classes.
- @param {string} as - The HTML tag to use for the heading (e.g., 'h1', 'h2', 'h3', etc.).
- @param {Object} restProps - Additional props to be spread on the heading element.
- @return {ReactNode} The rendered heading component.

## Example Usage

```jsx
import React from "react";
import { Heading } from "./Heading";

const ExamplePage = () => {
  return (
    <div>
      <Heading size="lg">Large Heading</Heading>
      <Heading as="h3" size="2xl" className="font-bold" responsive>
        Responsive 2XL Heading
      </Heading>
      <Heading size="heading" as="h1">
        Custom Heading Size
      </Heading>
      {/* Example usage of Heading component */}
    </div>
  );
};

export default ExamplePage;
```
