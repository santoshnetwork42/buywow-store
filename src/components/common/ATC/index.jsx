"use client";
import { Button } from "@/components/common";
import Quantity from "@/components/common/Quantity";
import { cartSagaActions } from "@/store/sagas/sagaActions/cart.actions";
import { getRecordKey } from "@/utils/helpers";
import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

const AddToCart = ({
  fetchedProduct,
  buttonText,
  buttonClass,
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
            cartQuantity: fetchedProduct.minimumOrderQuantity || 1,
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
    <div>
      {!!cartItem && (
        <div className="flex items-center justify-between gap-2">
          <Quantity quantity={cartItem.cartQuantity} cartItem={cartItem} />
          {showGoToCart && (
            <Button variant="primary" className="w-full p-4">
              Go to cart
            </Button>
          )}
        </div>
      )}

      {!cartItem && (
        <Button
          variant="primary"
          size="small"
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
