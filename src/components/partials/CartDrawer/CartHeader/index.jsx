import { CloseSVG } from "@/assets/svg/icons";
import { Button, Heading } from "@/components/elements";
import React from "react";

const CartHeader = React.memo(({ totalItems, cartClose, text, className }) => {
  if (!text) return null;
  return (
    <div
      className={`flex items-center justify-between border-b-[0.25px] border-black-900 pb-2 md:pb-2.5 ${className}`}
    >
      <Heading size="xl" as="h2" className="text-lg" responsive>
        {text} {totalItems > 0 && `(${totalItems})`}
      </Heading>
      <Button onClick={cartClose} className="z-10">
        <CloseSVG height={24} width={24} fillColor="#000000" />
      </Button>
    </div>
  );
});

CartHeader.displayName = "CartHeader";

export default CartHeader;
