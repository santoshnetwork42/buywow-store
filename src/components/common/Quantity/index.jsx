"use client";

import { showToast } from "@/components/common/ToastComponent";
import { Button, Text } from "@/components/elements";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

const Quantity = ({
  max,
  quantity = 1,
  minimumOrderQuantity = 1,
  maximumOrderQuantity = 99,
  totalItemQuantity,
  onChangeQuantity,
  product,
  className,
}) => {
  const [cartQuantity, setCartQuantity] = useState(quantity);

  useEffect(() => {
    setCartQuantity(quantity || 1);
  }, [quantity]);

  useEffect(() => {
    onChangeQuantity &&
      cartQuantity !== quantity &&
      cartQuantity !== "" &&
      onChangeQuantity(cartQuantity);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartQuantity]);

  const decreaseQuantity = () => {
    if (cartQuantity > 0) {
      const newQuantity =
        cartQuantity === minimumOrderQuantity ? 0 : parseInt(cartQuantity) - 1;
      setCartQuantity(newQuantity);
    }
  };

  const increaseQuantity = () => {
    if (!product?.isInventoryEnabled || cartQuantity < max) {
      if (cartQuantity < maximumOrderQuantity) {
        if (totalItemQuantity && totalItemQuantity >= maximumOrderQuantity) {
          showToast.error(
            `You cannot add more than ${maximumOrderQuantity} quantities of ${product?.title}.`,
          );
        } else {
          setCartQuantity(parseInt(cartQuantity) + 1);
        }
      } else {
        showToast.error(
          `You cannot add more than ${maximumOrderQuantity} quantities of ${product?.title}.`,
        );
      }
    } else {
      showToast.error(
        `You cannot add more than ${maximumOrderQuantity} quantities of ${product?.title}.`,
      );
    }
  };
  const buttonClassName =
    "h-full rounded-none bg-lime-50 text-black-900 md:text-lg";

  const containerClassName = twMerge(
    "grid h-[25.5px] min-h-5 shrink-0 grid-cols-3 items-center overflow-hidden rounded-md border bg-white-a700 sm:h-7 md:h-8 lg:h-[34.5px]",
    className,
  );

  if (!product) return null;

  return (
    <div className={containerClassName}>
      <Button
        enableRipple={false}
        className={buttonClassName}
        onClick={decreaseQuantity}
      >
        -
      </Button>
      <Text as="span" size="base" responsive className="text-center text-sm">
        {cartQuantity}
      </Text>
      <Button
        enableRipple={false}
        className={buttonClassName}
        onClick={increaseQuantity}
      >
        +
      </Button>
    </div>
  );
};

Quantity.displayName = "Quantity";

export default Quantity;
