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

  return {
    handleCartVisibility,
  };
};
