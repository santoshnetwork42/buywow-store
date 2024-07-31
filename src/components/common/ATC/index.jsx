"use client";

import Quantity from "@/components/common/Quantity";
import { Button } from "@/components/elements";
import { cartSagaActions } from "@/store/sagas/sagaActions/cart.actions";
import { getRecordKey } from "@/utils/helpers";
import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";

const AddToCart = ({
  fetchedProduct,
  quantityClassName,
  buttonText,
  buttonClass,
  buttonSize = "none",
  showGoToCart = false,
}) => {
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state?.cart?.data || []);

  const addToCartHandler = useCallback(
    (e) => {
      dispatch({
        type: cartSagaActions.ADD_TO_CART,
        payload: {
          product: {
            ...fetchedProduct,
            qty: fetchedProduct.minimumOrderQuantity || 1,
          },
        },
      });
    },
    [dispatch, fetchedProduct],
  );

  const cartItem = useMemo(() => {
    const recordKey = getRecordKey(fetchedProduct);
    return cartData.find((item) => item.recordKey === recordKey);
  }, [cartData, fetchedProduct]);

  return (
    <div className="">
      {!!cartItem && (
        <div className="flex w-full justify-between gap-2 sm:gap-3 md:gap-4 lg:gap-5">
          <div className={`flex ${showGoToCart ? "w-1/3" : "w-auto"}`}>
            <Quantity
              quantity={cartItem.qty}
              cartItem={cartItem}
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
      )}

      {!cartItem && (
        <Button
          variant="primary"
          size={buttonSize}
          className={buttonClass}
          onClick={addToCartHandler}
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
};

export default AddToCart;
