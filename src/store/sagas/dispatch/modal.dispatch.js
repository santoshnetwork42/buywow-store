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

  const handleSpinTheWheelVisibility = useCallback(
    (isSpinTheWheelNudgeThere = false) => {
      dispatch({
        type: modalSagaActions.SET_SPIN_THE_WHEEL_MODAL,
        payload: {
          isSpinTheWheelNudgeThere,
        },
      });
    },
    [dispatch],
  );

  const handlePersonalizerModalVisibility = useCallback(
    (isPersonalizerModalOpen = false) => {
      dispatch({
        type: modalSagaActions.SET_PERSONALIZER_MODAL,
        payload: {
          isPersonalizerModalOpen,
        },
      });
    },
    [dispatch],
  );

  const handlePasswordLessModal = useCallback(
    (
      isPasswordLessOpen = false,
      customLogin = false,
      redirectTo = null,
      source = "HEADER",
    ) => {
      dispatch({
        type: modalSagaActions.SET_PASSWORDLESS_MODAL,
        payload: {
          isPasswordLessOpen,
          customLogin,
          redirectTo,
          source,
        },
      });
    },
    [dispatch],
  );

  return {
    handleCartVisibility,
    handlePasswordLessModal,
    handleSpinTheWheelVisibility,
    handlePersonalizerModalVisibility,
  };
};
