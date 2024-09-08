import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { modalSagaActions } from "@/store/sagas/sagaActions/modal.actions";

export const useModalDispatch = () => {
  const dispatch = useDispatch();

  const handleCartVisibility = useCallback(
    (isCartOpen = false) => {
      dispatch({
        type: modalSagaActions.SET_CART_MODAL,
        payload: {
          isCartOpen,
        },
      });
    },
    [dispatch],
  );

  const handlePasswordLessModal = useCallback(
    (isPasswordLessOpen = false, customLogin = false, redirectTo = null) => {
      dispatch({
        type: modalSagaActions.SET_PASSWORDLESS_MODAL,
        payload: {
          isPasswordLessOpen,
          customLogin,
          redirectTo,
        },
      });
    },
    [dispatch],
  );

  return {
    handleCartVisibility,
    handlePasswordLessModal,
  };
};
