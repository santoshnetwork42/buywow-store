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

  const handlePasswordLessModal = (
    isPasswordLessOpen = false,
    customLogin = false,
    redirectTo = null,
  ) => {
    dispatch({
      type: modalSagaActions.SET_PASSWORDLESS_MODAL,
      payload: {
        isPasswordLessOpen,
        customLogin,
        redirectTo,
      },
    });
  };

  return {
    handleCartVisibility,
    handlePasswordLessModal,
  };
};
