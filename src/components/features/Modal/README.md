# Modal Component

A custom modal component that supports different views for mobile and desktop, with configurable options.

## Props

- Renders a modal component with the specified title, description, and children content.
-
- @param {string} title - The title of the modal.
- @param {string} description - The description content of the modal.
- @param {boolean} isOpen - Flag indicating if the modal is open.
- @param {function} onClose - Function to handle modal close.
- @param {ReactNode} children - The child components to be rendered inside the modal.
- @param {number} mobileViewHeight - The height of the mobile view.
- @param {boolean} showCloseButtonOutOfBox - Flag to show close button outside the modal box.
- @param {boolean} showMobileView - Flag to show the mobile view.
- @param {boolean} enableOutsideClick - Flag to enable outside click to close modal.
- @param {boolean} enableCloseButton - Flag to enable the close button.
- @return {ReactNode} The rendered modal component.

## Example Usage

```jsx
import React, { useState } from "react";
import Modal from "./Modal";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      <Modal
        title={"Dummy Title long long for testing"}
        description={"Dummy Description"}
        showCloseButtonOutOfBox
        showMobileView={true}
        mobileViewHeight={"h-1/4"}
        isOpen={isOpen}
        onCloseClick={() => setIsOpen(false)}
        enableOutsideClick={true}
      />
    </div>
  );
};

export default App;
```
