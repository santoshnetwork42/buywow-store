# Breadcrumb Component

A breadcrumb navigation component used to display hierarchical navigation paths.

## Props

- Renders a breadcrumb component with specified items and current page.
-
- @param {Array} items - An array of objects representing breadcrumb items.
- @param {string} items.href - The URL path for the breadcrumb item.
- @param {string} items.label - The label to display for the breadcrumb item.
- @param {string} currentPage - The label for the current page displayed at the end of the breadcrumb.
- @param {Object} props - Additional props to be spread on the container div.
- @param {string} props.className - Additional CSS classes for the container div.
- @return {ReactNode} The rendered breadcrumb component.

## Example Usage

```jsx
import React from "react";
import Link from "next/link";
import { Text } from "@/components/common";
import Breadcrumb from "./Breadcrumb";

const ExamplePage = () => {
  const items = [
    { href: "/home", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/products/item1", label: "Item 1" },
  ];

  return (
    <div>
      <Breadcrumb items={items} currentPage="Current Page" className="mt-4" />
      {/* Example usage of Breadcrumb component */}
    </div>
  );
};

export default ExamplePage;
```
