"use client";

import { Button, Text } from "@/components/elements";
import { cartSagaActions } from "@/store/sagas/sagaActions/cart.actions";
import { getRecordKey, getUpdatedCart } from "@/utils/helpers";
import { useState, useCallback, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";

const Quantity = ({ quantity, cartItem, className }) => {
  const dispatch = useDispatch();
  const { maximumOrderQuantity, minimumOrderQuantity } = cartItem || {};
  const [cartQuantity, setCartQuantity] = useState(quantity);

  const cartData = useSelector((state) => state.cart);
  const cartList = useMemo(() => cartData?.data || [], [cartData?.data]);

  useEffect(() => {
    setCartQuantity(quantity);
  }, [quantity]);

  const updateCart = useCallback(
    async (newQuantity) => {
      if (!cartItem) return;

      const recordKey = getRecordKey(cartItem);
      const updatedCart = getUpdatedCart(cartList, recordKey, {
        qty: newQuantity,
      });

      dispatch({
        type: cartSagaActions.UPDATE_CART,
        payload: { data: updatedCart },
      });
    },
    [cartItem, cartList, dispatch],
  );

  const removeFromCart = useCallback(() => {
    if (!cartItem) return;

    dispatch({
      type: cartSagaActions.REMOVE_FROM_CART,
      payload: { product: cartItem },
    });
  }, [cartItem, dispatch]);

  const handleQuantityChange = useCallback(
    (change) => {
      const newQuantity = cartQuantity + change;
      if (
        newQuantity >= minimumOrderQuantity &&
        newQuantity <= maximumOrderQuantity
      ) {
        setCartQuantity(newQuantity);
        updateCart(newQuantity);
      } else if (newQuantity < minimumOrderQuantity) {
        removeFromCart();
      }
    },
    [
      cartQuantity,
      maximumOrderQuantity,
      minimumOrderQuantity,
      updateCart,
      removeFromCart,
    ],
  );

  const increaseQuantity = useCallback(
    () => handleQuantityChange(1),
    [handleQuantityChange],
  );
  const decreaseQuantity = useCallback(
    () => handleQuantityChange(-1),
    [handleQuantityChange],
  );

  if (!cartItem) return null;

  return (
    <div
      className={twMerge(
        "grid min-h-7 shrink-0 grid-cols-3 items-center overflow-hidden rounded-md border bg-white-a700 sm:min-h-8 md:min-h-9 lg:min-h-10",
        className,
      )}
    >
      <Button
        enableRipple={false}
        className="h-full rounded-none bg-lime-50 text-black-900 md:text-lg"
        onClick={decreaseQuantity}
      >
        -
      </Button>
      <Text
        as="span"
        size="base"
        responsive
        className="text-center text-sm"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        {cartQuantity}
      </Text>
      <Button
        enableRipple={false}
        className="h-full rounded-none bg-lime-50 text-black-900 md:text-lg"
        onClick={increaseQuantity}
      >
        +
      </Button>
    </div>
  );
};

export default Quantity;
