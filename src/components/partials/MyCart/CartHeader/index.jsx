import { Heading } from "@/components/elements";

export default function CartHeader({ itemCount, className }) {
  return (
    <Heading size="2xl" as="h1" className={`${className}`} responsive>
      My Cart ({itemCount})
    </Heading>
  );
}
