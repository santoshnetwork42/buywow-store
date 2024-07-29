"use client";
import { Button, Text } from "@/components/common";
import { cartSagaActions } from "@/store/sagas/sagaActions/cart.actions";
import { getRecordKey, getUpdatedCart } from "@/utils/helpers";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Quantity = ({ quantity, cartItem }) => {
  const dispatch = useDispatch();

  const { maximumOrderQuantity, minimumOrderQuantity } = cartItem;
  const [cartQuantity, setCartQuantity] = useState(quantity);

  const cartData = useSelector((state) => state.cart);
  const cartList = cartData?.data || [];

  const increaseQuantity = () => {
    setCartQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + 1;
      if (newQuantity <= maximumOrderQuantity) {
        updateCart(newQuantity); // Pass the new quantity to updateCart
        return newQuantity;
      }
      // If maximum quantity is reached, return the previous quantity
      // and show a message here
      return prevQuantity;
    });
  };

  const decreaseQuantity = () => {
    setCartQuantity((prevQuantity) => {
      const newQuantity = prevQuantity - 1;
      if (newQuantity >= minimumOrderQuantity) {
        updateCart(newQuantity);
        return newQuantity;
      } else {
        // Remove product from cart
        removeFromCart();
        return minimumOrderQuantity;
      }
    });
  };

  const updateCart = async (newQuantity) => {
    const recordKey = getRecordKey(cartItem);

    const updatedCart = await getUpdatedCart(cartList, recordKey, {
      cartQuantity: newQuantity,
    });

    dispatch({
      type: cartSagaActions.UPDATE_CART,
      payload: {
        data: updatedCart,
      },
    });
  };

  const removeFromCart = () => {
    dispatch({
      type: cartSagaActions.REMOVE_FROM_CART,
      payload: {
        product: cartItem,
      },
    });
  };

  return (
    <div className="flex items-center overflow-hidden rounded-md border">
      <Button
        enableRipple={false}
        className="h-7 rounded-none bg-lime-50 px-[10px] py-0 text-black-900"
        onClick={decreaseQuantity}
      >
        -
      </Button>
      <Text
        as="span"
        className="px-3 py-1"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        {cartQuantity}
      </Text>
      <Button
        enableRipple={false}
        className="h-7 rounded-none bg-lime-50 px-[10px] py-0 text-black-900"
        onClick={increaseQuantity}
      >
        +
      </Button>
    </div>
  );
};

export default Quantity;
