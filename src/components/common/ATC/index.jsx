"use client";

import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";

import Quantity from "@/components/common/Quantity";
import { Button } from "@/components/elements";
import { cartSagaActions } from "@/store/sagas/sagaActions/cart.actions";
import { getRecordKey, getUpdatedCart } from "@/utils/helpers";
import { useCartItems } from "@wow-star/utils";

const AddToCart = React.memo(
  ({
    product,
    selectedVariant,
    quantityClassName,
    buttonText,
    buttonClass,
    buttonSize = "none",
    showGoToCart = false,
  }) => {
    const dispatch = useDispatch();
    const cartList = useSelector((state) => state?.cart?.data || []);
    const cartItems = useCartItems({
      showLTOProducts: false,
      showNonApplicableFreeProducts: true,
    });

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

    const cartLocalState = useMemo(() => {
      if (!cartList.length || !product) return null;

      const recordKey = getRecordKey(product, selectedVariant?.id);
      return cartList.find((item) => item.recordKey === recordKey);
    }, [cartList, product, selectedVariant]);

    const changeQuantity = useCallback(
      (newQuantity) => {
        if (!cartItem || !product) return;

        if (newQuantity >= 1) {
          const recordKey = getRecordKey(product, selectedVariant?.id);
          const updatedCart = getUpdatedCart(cartList, recordKey, {
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
      [cartItem, cartList, dispatch, product, selectedVariant?.id],
    );

    const minimumOrderQuantity =
      selectedVariant?.minimumOrderQuantity ||
      product?.minimumOrderQuantity ||
      1;

    const maximumOrderQuantity =
      selectedVariant?.maximumOrderQuantity ||
      product?.maximumOrderQuantity ||
      99;

    const totalItemQuantity = cartLocalState?.qty || minimumOrderQuantity;

    if (!product) return null;

    return (
      <div className="">
        {cartItem ? (
          <div className="flex w-full justify-between gap-2 sm:gap-3 md:gap-4 lg:gap-5">
            <div className={`flex ${showGoToCart ? "w-1/3" : "w-auto"}`}>
              <Quantity
                product={product}
                max={product.currentInventory}
                quantity={cartLocalState?.qty}
                minimumOrderQuantity={minimumOrderQuantity}
                maximumOrderQuantity={maximumOrderQuantity}
                totalItemQuantity={totalItemQuantity}
                onChangeQuantity={changeQuantity}
                className={quantityClassName}
              />
            </div>
            {showGoToCart && (
              <Button
                variant="primary"
                size={buttonSize}
                className={twMerge(buttonClass, "w-auto flex-1")}
              >
                Go to cart
              </Button>
            )}
          </div>
        ) : (
          <Button
            variant="primary"
            size={buttonSize}
            className={buttonClass}
            onClick={addToCartHandler}
            disabled={!product.isAtcEnabled}
          >
            {buttonText}
          </Button>
        )}
      </div>
    );
  },
);

AddToCart.displayName = "AddToCart";

export default AddToCart;
