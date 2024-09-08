import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { cartSagaActions } from "@/store/sagas/sagaActions/cart.actions";

export const useCartDispatch = () => {
  const dispatch = useDispatch();

  const addToCart = useCallback(
    (product) => {
      dispatch({
        type: cartSagaActions.ADD_TO_CART,
        payload: { product },
      });
    },
    [dispatch],
  );

  const removeFromCart = useCallback(
    (product) => {
      dispatch({
        type: cartSagaActions.REMOVE_FROM_CART,
        payload: { product },
      });
    },
    [dispatch],
  );

  const updateCart = useCallback(
    (data) => {
      dispatch({
        type: cartSagaActions.UPDATE_CART,
        payload: { data },
      });
    },
    [dispatch],
  );

  const applyRewardPoint = useCallback(
    (isRewardApplied) => {
      dispatch({
        type: cartSagaActions.APPLY_REWARD_POINT,
        payload: { isRewardApplied },
      });
    },
    [dispatch],
  );

  const applyCoupon = useCallback(
    (coupon) => {
      dispatch({
        type: cartSagaActions.APPLY_COUPONS,
        payload: { coupon },
      });
    },
    [dispatch],
  );

  const removeCoupon = useCallback(() => {
    dispatch({
      type: cartSagaActions.REMOVE_COUPON,
      payload: {},
    });
  }, [dispatch]);

  const emptyCart = useCallback(() => {
    dispatch({
      type: cartSagaActions.EMPTY_CART,
      payload: {},
    });
  }, [dispatch]);

  const validateCart = useCallback(
    (payload) => {
      dispatch({
        type: cartSagaActions.VALIDATE_CART,
        payload,
      });
    },
    [dispatch],
  );

  const updateCartId = useCallback(
    (cartId) => {
      dispatch({
        type: cartSagaActions.UPDATE_CART_ID,
        payload: { cartId },
      });
    },
    [dispatch],
  );

  const updateCartIdLoading = useCallback(
    (isLoading) => {
      dispatch({
        type: cartSagaActions.UPDATE_CART_ID_LOADING,
        payload: { isLoading },
      });
    },
    [dispatch],
  );

  const storeCoupon = useCallback(
    (couponCode) => {
      dispatch({
        type: cartSagaActions.STORE_COUPON,
        payload: { couponCode },
      });
    },
    [dispatch],
  );

  const fetchAndAddProductsFromEncodedCart = useCallback(
    (_cx) => {
      dispatch({
        type: cartSagaActions.FETCH_AND_ADD_PRODUCTS_FROM_ENCODED_CART,
        payload: { _cx },
      });
    },
    [dispatch],
  );

  return {
    addToCart,
    removeFromCart,
    updateCart,
    applyRewardPoint,
    applyCoupon,
    removeCoupon,
    emptyCart,
    validateCart,
    updateCartId,
    updateCartIdLoading,
    storeCoupon,
    fetchAndAddProductsFromEncodedCart,
  };
};
