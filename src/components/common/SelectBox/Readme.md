# SelectBox Component

A customizable select box component built on top of `react-select`, with support for searchable, multi-select, and custom indicators.

## Props

- Renders a select box component with specified options, styles, and behaviors.
-
- @param {string} className - Additional CSS classes for the select container.
- @param {Array} options - An array of options for the select box.
- @param {boolean} isSearchable - Flag to enable searching within the select options.
- @param {boolean} isMulti - Flag to enable multiple selection.
- @param {ReactNode} indicator - Custom indicator element for the select dropdown.
- @param {Object} restProps - Additional props to be spread on the select element.
- @return {ReactNode} The rendered select box component.

## Example Usage

```jsx
"use client";

import React, { useState } from "react";
import { SelectBox } from "./SelectBox";

const ExamplePage = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  return (
    <div>
      <SelectBox
        className="mb-4"
        options={options}
        isSearchable={true}
        isMulti={true}
        onChange={(selected) => setSelectedOption(selected)}
        value={selectedOption}
        placeholder="Select your favorite flavor"
        indicator={<span className="custom-indicator">▼</span>}
      />
      <p>Selected option: {JSON.stringify(selectedOption)}</p>
      {/* Example usage of SelectBox component */}
    </div>
  );
};

export default ExamplePage;
```
