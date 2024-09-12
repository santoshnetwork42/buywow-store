"use client";

import { showToast } from "@/components/common/ToastComponent";
import { Button, Text } from "@/components/elements";
import React, { useCallback, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

const QuantityButton = React.memo(({ onClick, children }) => (
  <Button
    enableRipple={false}
    className="h-full rounded-none bg-lime-50 text-black-900 md:text-lg"
    onClick={onClick}
  >
    {children}
  </Button>
));

QuantityButton.displayName = "QuantityButton";

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
  }, [quantity, product]);

  useEffect(() => {
    if (onChangeQuantity && cartQuantity !== quantity && cartQuantity !== "") {
      onChangeQuantity(cartQuantity);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartQuantity]);

  const handleQuantityChange = useCallback(
    (newQuantity) => {
      if (newQuantity >= 0 && newQuantity <= maximumOrderQuantity) {
        setCartQuantity(newQuantity);
      }
    },
    [maximumOrderQuantity],
  );

  const decreaseQuantity = useCallback(() => {
    setCartQuantity((prevQuantity) => {
      const newQuantity =
        prevQuantity === minimumOrderQuantity ? 0 : prevQuantity - 1;
      return newQuantity;
    });
  }, [minimumOrderQuantity]);

  const increaseQuantity = useCallback(() => {
    setCartQuantity((prevQuantity) => {
      if (!product?.isInventoryEnabled || prevQuantity < max) {
        if (prevQuantity < maximumOrderQuantity) {
          if (totalItemQuantity && totalItemQuantity >= maximumOrderQuantity) {
            showToast.error(
              `You cannot add more than ${maximumOrderQuantity} quantities of ${product?.title}.`,
            );
          } else {
            return prevQuantity + 1;
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
      return prevQuantity;
    });
  }, [max, maximumOrderQuantity, totalItemQuantity, product]);

  if (!product) return null;

  const containerClassName = twMerge(
    "grid h-[25.5px] min-h-5 shrink-0 grid-cols-3 items-center overflow-hidden rounded-md border bg-white-a700 sm:h-7 md:h-8 lg:h-[34.5px]",
    className,
  );

  return (
    <div className={containerClassName}>
      <QuantityButton onClick={decreaseQuantity}>-</QuantityButton>
      <Text as="span" size="base" className="text-center text-sm" responsive>
        {cartQuantity}
      </Text>
      <QuantityButton onClick={increaseQuantity}>+</QuantityButton>
    </div>
  );
};

Quantity.displayName = "Quantity";

export default React.memo(Quantity);
