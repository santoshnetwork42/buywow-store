import React from "react";
import { Img, Text } from "@/components/elements";
import { toDecimal } from "@/utils/helpers";

const Cashback = ({ cashbackAmount, amountNeeded }) => {
  if (!cashbackAmount) return null;
  return (
    <div className="flex w-[calc(100%+24px)] -translate-x-3 items-center justify-center gap-0.5 bg-blue-50 px-2 py-1.5 shadow-sm sm:w-[calc(100%+32px)] sm:-translate-x-4">
      <Img
        src="img_image_2037.png"
        width={24}
        height={24}
        alt="cashback icon"
        className="aspect-square w-[24px] object-cover"
      />
      {cashbackAmount ? (
        <Text size="base" as="p">
          You will earn{" "}
          <span className="font-semibold">₹{toDecimal(cashbackAmount)}</span>{" "}
          cashback with this order.
        </Text>
      ) : amountNeeded ? (
        <Text size="base" as="p">
          Add items worth{" "}
          <span className="font-semibold">₹{toDecimal(amountNeeded)}</span> to
          earn WOW Cash
        </Text>
      ) : null}
    </div>
  );
};

export default Cashback;
