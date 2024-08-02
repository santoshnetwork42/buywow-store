"use client";

import React, { useState, useCallback, useEffect, useMemo } from "react";
import { Button, Text } from "@/components/elements";
import { twMerge } from "tailwind-merge";

const Quantity = React.memo(
  ({
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

    const decreaseQuantity = useCallback(() => {
      if (quantity > 0) {
        const newQuantity =
          quantity === minimumOrderQuantity ? 0 : parseInt(quantity) - 1;
        setCartQuantity(newQuantity);
        onChangeQuantity(newQuantity);
      }
    }, [quantity, minimumOrderQuantity, onChangeQuantity]);

    const increaseQuantity = useCallback(() => {
      if (!product?.isInventoryEnabled || quantity < max) {
        if (quantity < maximumOrderQuantity) {
          if (totalItemQuantity && totalItemQuantity >= maximumOrderQuantity) {
            alert("Maximum order quantity reached");
          } else {
            const newQuantity = parseInt(quantity) + 1;
            setCartQuantity(newQuantity);
            onChangeQuantity(newQuantity);
          }
        } else {
          alert("Maximum order quantity reached");
        }
      } else {
        alert("Maximum order quantity reached");
      }
    }, [
      product,
      quantity,
      max,
      maximumOrderQuantity,
      totalItemQuantity,
      onChangeQuantity,
    ]);

    const buttonClassName = useMemo(
      () => "h-full rounded-none bg-lime-50 text-black-900 md:text-lg",
      [],
    );

    const containerClassName = useMemo(
      () =>
        twMerge(
          "grid h-[26px] min-h-5 shrink-0 grid-cols-3 items-center overflow-hidden rounded-md border bg-white-a700 sm:h-7 md:h-8 lg:h-9",
          className,
        ),
      [className],
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
  },
);

Quantity.displayName = "Quantity";

export default Quantity;
