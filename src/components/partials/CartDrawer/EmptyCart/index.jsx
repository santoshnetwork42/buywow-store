import { CartIcon } from "@/assets/svg/icons";
import { Text } from "@/components/elements";
import Link from "next/link";
import React from "react";

const EmptyCart = ({ cartClose }) => {
  return (
    <div className="flex flex-1 -translate-y-8 flex-col items-center justify-center gap-2">
      <CartIcon size={250} />
      <Text
        as="p"
        size="lg"
        className="mb-1 text-center text-[#777]"
        responsive
      >
        Your cart is currently empty.
      </Text>
      <Link
        prefetch={false}
        href="/"
        className="rounded-full bg-yellow-900 px-4 py-2 text-base font-medium text-white-a700_01 sm:text-lg md:px-5 md:py-3 lg:text-xl"
        onClick={cartClose}
      >
        Return to shop
      </Link>
    </div>
  );
};

export default EmptyCart;
