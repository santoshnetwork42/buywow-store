import { TickMark } from "@/assets/svg/checkmark/icon";
import { Text } from "@/components/elements";
import React from "react";

const ProductClaims = React.memo(({ productClaims = [], className }) => {
  return (
    <>
      <div className={`my-2 flex flex-col gap-y-1 ${className}`}>
        {productClaims?.map(({ text = "" }) => (
          <div className="flex items-center gap-x-4" key={text}>
            <div>
              <TickMark size={18} />
            </div>
            <Text as="p" size="base" className="">
              {text}
            </Text>
          </div>
        ))}
      </div>
    </>
  );
});

ProductClaims.displayName = "ProductClaims";

export default ProductClaims;
