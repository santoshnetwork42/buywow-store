import { useDispatch } from "react-redux";
import { modalSagaActions } from "../sagaActions/modal.actions";

export const useModalDispatch = () => {
  const dispatch = useDispatch();

  const handleCartVisibility = (isCartOpen = false) => {
    dispatch({
      type: modalSagaActions.SET_CART_MODAL,
      payload: {
        isCartOpen,
      },
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
    handleCartVisibility,
  };
};
