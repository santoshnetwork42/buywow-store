import { ArrowIconSVG } from "@/assets/svg/icons";
import { Text } from "@/components/elements";
import React from "react";

const CheckoutHeader = React.memo(() => (
  <div className="hidden flex-wrap items-center justify-center gap-2 md:flex">
    <Text as="h3" size="xl" className="uppercase text-gray-600/90">
      1. Shopping Cart
    </Text>
    <ArrowIconSVG size={18} strokeColor="#666666bb" />
    <Text as="h3" size="xl" className="uppercase">
      2. Checkout
    </Text>
    <ArrowIconSVG size={18} />
    <Text as="h3" size="xl" className="uppercase text-gray-600/90">
      3. Order Complete
    </Text>
  </div>
));

export default CheckoutHeader;
