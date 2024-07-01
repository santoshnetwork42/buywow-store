// components/MyCart/CartHeader.jsx

import { Heading } from "@/components/common";

export default function CartHeader({ itemCount, className }) {
  return (
    <Heading size="2xl" as="h1" className={`${className}`} responsive>
      My Cart ({itemCount})
    </Heading>
  );
}
