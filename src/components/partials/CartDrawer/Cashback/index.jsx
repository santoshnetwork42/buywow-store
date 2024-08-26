import { Img, Text } from "@/components/elements";
import { toDecimal } from "@/utils/helpers";
import React from "react";
import { twMerge } from "tailwind-merge";

const Cashback = React.memo(({ cashbackAmount, amountNeeded, className }) => {
  if (!cashbackAmount && !(amountNeeded > 0)) return null;

  return (
    <div
      className={twMerge(
        "flex w-[calc(100%+24px)] -translate-x-3 items-center justify-center gap-0.5 bg-blue-50 px-2 py-1.5 shadow-sm sm:w-[calc(100%+32px)] sm:-translate-x-4",
        className,
      )}
    >
      <Img
        src="img_image_2037.png"
        width={24}
        height={24}
        alt="cashback icon"
        className="aspect-square w-[24px] object-cover"
        isStatic
      />
      <Text size="base" as="p">
        {cashbackAmount > 0 ? (
          <>
            You will earn <strong>₹{toDecimal(cashbackAmount)}</strong> cashback
            with this order.
          </>
        ) : amountNeeded > 0 ? (
          <>
            Add items worth <strong>₹{toDecimal(amountNeeded)}</strong> to earn
            WOW Cash
          </>
        ) : null}
      </Text>
    </div>
  );
});

Cashback.displayName = "Cashback";

export default Cashback;
