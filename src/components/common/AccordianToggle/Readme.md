# ToggleArrow Component

A custom toggle arrow component that changes its orientation based on the `open` prop and triggers a callback function when clicked.

## Props

/\*\*

- Renders a toggle arrow component with the specified open state and click handler.
-
- @param {boolean} open - Flag indicating if the arrow is in the open state.
- @param {function} onToggle - Function to handle the toggle action.
- @param {string} className - Additional classes for styling the arrow.
- @return {ReactNode} The rendered toggle arrow component.
  \*/

## Example Usage

```jsx
import React, { useState } from "react";
import ToggleArrow from "./ToggleArrow";

const App = () => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div>
      <ToggleArrow
        open={open}
        onToggle={handleToggle}
        className="extra-class"
      />
    </div>
  );
};

export default App;
```
