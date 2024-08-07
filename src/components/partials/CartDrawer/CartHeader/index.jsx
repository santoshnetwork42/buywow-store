import { CloseSVG } from "@/assets/images";
import { Button, Heading } from "@/components/elements";
import React from "react";

const CartHeader = React.memo(({ totalItems, onClose }) => {
  return (
    <div className="flex items-center justify-between border-b border-black-900 pb-2">
      <Heading size="xl" as="h2" className="text-lg" responsive>
        My Cart ({totalItems})
      </Heading>
      <Button onClick={onClose}>
        <CloseSVG height={24} width={24} fillColor="#000000" />
      </Button>
    </div>
  );
});

CartHeader.displayName = "CartHeader";

export default CartHeader;
