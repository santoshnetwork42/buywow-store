import { useDispatch } from "react-redux";
import { cartSagaActions } from "@/store/sagas/sagaActions/cart.actions";

export const useCartDispatch = () => {
  const dispatch = useDispatch();

  const addToCart = (product) => {
    dispatch({
      type: cartSagaActions.ADD_TO_CART,
      payload: { product },
    });
  };

  const removeFromCart = (product) => {
    dispatch({
      type: cartSagaActions.REMOVE_FROM_CART,
      payload: { product },
    });
  };

  const updateCart = (data) => {
    dispatch({
      type: cartSagaActions.UPDATE_CART,
      payload: { data },
    });
  };

  const applyRewardPoint = (isRewardApplied) => {
    dispatch({
      type: cartSagaActions.APPLY_REWARD_POINT,
      payload: { isRewardApplied },
    });
  };

  const applyCoupon = (coupon) => {
    dispatch({
      type: cartSagaActions.APPLY_COUPONS,
      payload: { coupon },
    });
  };

  const removeCoupon = () => {
    dispatch({
      type: cartSagaActions.REMOVE_COUPON,
      payload: {},
    });
  };

  const emptyCart = () => {
    dispatch({
      type: cartSagaActions.EMPTY_CART,
      payload: {},
    });
  };

  const validateCart = (payload) => {
    dispatch({
      type: cartSagaActions.VALIDATE_CART,
      payload,
    });
  };

  const updateCartId = (cartId) => {
    dispatch({
      type: cartSagaActions.UPDATE_CART_ID,
      payload: { cartId },
    });
  };

  const updateCartIdLoading = (isLoading) => {
    dispatch({
      type: cartSagaActions.UPDATE_CART_ID_LOADING,
      payload: { isLoading },
    });
  };

  const storeCoupon = (couponCode) => {
    dispatch({
      type: cartSagaActions.STORE_COUPON,
      payload: { couponCode },
    });
  };

  const fetchAndAddProductsFromEncodedCart = (_cx) => {
    dispatch({
      type: cartSagaActions.FETCH_AND_ADD_PRODUCTS_FROM_ENCODED_CART,
      payload: { _cx },
    });
  };

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
