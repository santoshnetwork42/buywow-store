# Drawer Component

A custom drawer component that supports different positions, configurable options, and handles outside clicks to close.

## Props

- Renders a drawer component with the specified position, width, and children content.
-
- @param {boolean} isOpen - Flag indicating if the drawer is open.
- @param {function} onClose - Function to handle drawer close.
- @param {ReactNode} children - The child components to be rendered inside the drawer.
- @param {string} position - The position of the drawer ('left' or 'right').
- @param {string} width - The width of the drawer.
- @param {string} className - Additional classes for the drawer.
- @param {boolean} enableOutsideClick - Flag to enable outside click to close drawer.
- @return {ReactNode} The rendered drawer component.

## Example Usage

```jsx
import React, { useState } from "react";
import Drawer from "./Drawer";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Drawer</button>
      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        position="left"
        width="326px"
        enableOutsideClick={true}
      >
        <div>Drawer Content</div>
      </Drawer>
    </div>
  );
};

export default App;
```
