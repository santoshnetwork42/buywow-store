# Input Component

A customizable input component with support for labels, prefixes, suffixes, and error messages.

## Props

- Renders an input component with specified properties and event handlers.
-
- @param {string} className - Additional CSS classes for the container label.
- @param {string} inputClassName - Additional CSS classes for the input element.
- @param {string} name - The name attribute for the input element.
- @param {string} placeholder - The placeholder text for the input element.
- @param {string} type - The type attribute for the input element. Defaults to 'text'.
- @param {string} label - The label text for the input element.
- @param {ReactNode} prefix - An optional prefix element to display before the input.
- @param {ReactNode} suffix - An optional suffix element to display after the input.
- @param {string} error - An optional error message to display below the input.
- @param {function} onChange - Event handler for the input's change event.
- @param {function} onBlur - Event handler for the input's blur event.
- @param {function} onFocus - Event handler for the input's focus event.
- @param {boolean} disabled - Flag to disable the input element.
- @param {boolean} required - Flag to mark the input element as required.
- @param {Object} restProps - Additional props to be spread on the input element.
- @return {ReactNode} The rendered input component.

## Example Usage

```jsx
"use client";

import React, { useRef, useState } from "react";
import { Input } from "./Input";

const ExamplePage = () => {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  return (
    <div>
      <Input
        className="mb-4"
        inputClassName="p-2 border border-gray-300"
        name="exampleInput"
        placeholder="Enter text"
        label="Example Input"
        prefix={<span className="mr-2">Prefix</span>}
        suffix={<span className="ml-2">Suffix</span>}
        error="This is an error message"
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => {}}
        onFocus={() => {}}
        required={true}
        ref={inputRef}
      />
      <p>Current value: {value}</p>
      {/* Example usage of Input component */}
    </div>
  );
};

export default ExamplePage;
```
