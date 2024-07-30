# Button Component

A customizable button component that supports different styles, sizes, and optional ripple effect.

## Props

- Renders a button component with specified children, icons, and styles.
-
- @param {ReactNode} children - The content to be displayed inside the button.
- @param {string} className - Additional CSS classes for the button.
- @param {ReactNode} leftIcon - An optional icon to display on the left side of the button content.
- @param {ReactNode} rightIcon - An optional icon to display on the right side of the button content.
- @param {string} variant - The variant style of the button. One of 'primary', 'secondary', or 'outlined'.
- @param {string} size - The size of the button. One of 'small', 'medium', or 'large'.
- @param {boolean} fullWidth - Flag to make the button take the full width of its container.
- @param {boolean} enableRipple - Flag to enable the ripple effect on button click.
- @param {Object} restProps - Additional props to be spread on the button element.
- @return {ReactNode} The rendered button component.

## Example Usage

```jsx
"use client";
import React from "react";
import { Button } from "./Button";
import { FaCoffee } from "react-icons/fa";

const ExamplePage = () => {
  return (
    <div>
      <Button variant="primary" size="large" leftIcon={<FaCoffee />}>
        Primary Button
      </Button>
      <Button variant="secondary" size="medium" fullWidth>
        Secondary Button
      </Button>
      <Button
        variant="outlined"
        size="small"
        enableRipple={false}
        rightIcon={<FaCoffee />}
      >
        Outlined Button
      </Button>
      {/* Example usage of Button component */}
    </div>
  );
};

export default ExamplePage;
```
