import { useDispatch } from "react-redux";
import { cartSagaActions } from "../sagaActions/cart.actions";

export const useCartDispatch = () => {
  const dispatch = useDispatch();

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

  const updateCart = (updatedCart) => {
    dispatch({
      type: cartSagaActions.UPDATE_CART,
      payload: { data: updatedCart },
    });
  };

  const removeFromCart = (product) => {
    dispatch({
      type: cartSagaActions.REMOVE_FROM_CART,
      payload: { product },
    });
  };

  // You can add more dispatch functions here
  // For example:
  // const removeItem = (itemId) => {
  //   dispatch({
  //     type: cartSagaActions.REMOVE_ITEM,
  //     payload: { itemId },
  //   });
  // };

  return {
    applyCoupon,
    removeFromCart,
    removeCoupon,
    updateCart,
  };
};
