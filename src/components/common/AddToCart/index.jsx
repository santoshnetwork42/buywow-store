"use client";

import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";

import Quantity from "@/components/common/Quantity";
import { Button } from "@/components/elements";
import { cartSagaActions } from "@/store/sagas/sagaActions/cart.actions";
import { getRecordKey, getUpdatedCart } from "@/utils/helpers";

const AddToCart = ({
  product,
  selectedVariant,
  buttonText,
  buttonSize = "none",
  buttonClassName,
  quantityClassName,
  showGoToCart = false,
}) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state?.cart?.data || []);

  const addToCartHandler = useCallback(() => {
    if (!product) return;

    dispatch({
      type: cartSagaActions.ADD_TO_CART,
      payload: {
        product: {
          ...product,
          qty: product.minimumOrderQuantity || 1,
          variantId: selectedVariant?.id,
        },
      },
    });
  }, [dispatch, product, selectedVariant]);

  const cartItem = useMemo(() => {
    if (!cartItems.length || !product) return null;

    const recordKey = getRecordKey(product, selectedVariant?.id);
    return cartItems.find((item) => item.recordKey === recordKey);
  }, [cartItems, product, selectedVariant]);

  const changeQuantity = useCallback(
    (newQuantity) => {
      if (!cartItem || !product) return;

      if (newQuantity >= 1) {
        const recordKey = getRecordKey(product, selectedVariant?.id);
        const updatedCart = getUpdatedCart(cartItems, recordKey, {
          qty: newQuantity,
        });

        dispatch({
          type: cartSagaActions.UPDATE_CART,
          payload: { data: updatedCart },
        });
      } else {
        dispatch({
          type: cartSagaActions.REMOVE_FROM_CART,
          payload: { product: cartItem },
        });
      }
    },
    [cartItem, cartItems, dispatch, product, selectedVariant?.id],
  );

  const minimumOrderQuantity =
    selectedVariant?.minimumOrderQuantity || product?.minimumOrderQuantity || 1;

  const maximumOrderQuantity =
    selectedVariant?.maximumOrderQuantity ||
    product?.maximumOrderQuantity ||
    99;

  const totalItemQuantity = cartItem?.qty || minimumOrderQuantity;

  if (!product) return null;

  if (!product.hasInventory) {
    return (
      <Button
        variant="primary"
        size={buttonSize}
        className={twMerge(
          buttonClassName,
          "rounded bg-red-50 uppercase text-red-600 opacity-100",
        )}
        disabled
      >
        Sold Out
      </Button>
    );
  }

  if (cartItem) {
    return (
      <div className="flex gap-2 sm:gap-3 md:gap-4 lg:gap-5">
        <div className={`flex ${showGoToCart ? "w-1/3" : "w-auto"}`}>
          <Quantity
            product={product}
            max={product.currentInventory}
            quantity={cartItem.qty}
            minimumOrderQuantity={minimumOrderQuantity}
            maximumOrderQuantity={maximumOrderQuantity}
            totalItemQuantity={totalItemQuantity}
            onChangeQuantity={changeQuantity}
            className={quantityClassName}
          />
        </div>
        {!!showGoToCart && (
          <Button
            variant="primary"
            size={buttonSize}
            className={twMerge(buttonClassName, "w-auto flex-1")}
          >
            Go to cart
          </Button>
        )}
      </div>
    );
  }

  return (
    <Button
      variant="primary"
      size={buttonSize}
      className={buttonClassName}
      onClick={addToCartHandler}
      disabled={!product.isAtcEnabled}
    >
      {buttonText}
    </Button>
  );
};

export default React.memo(AddToCart);
