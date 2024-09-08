import { systemSagaActions } from "@/store/sagas/sagaActions/system.actions";
import { rootActions } from "@/store/store";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

export const useSystemDispatch = () => {
  const dispatch = useDispatch();

  const updateMeta = useCallback(
    (payload) => {
      dispatch({
        type: systemSagaActions.SET_META,
        payload,
      });
    },
    [dispatch],
  );

  const setStore = useCallback(
    (payload) => {
      dispatch({
        type: systemSagaActions.SET_STORE,
        payload,
      });
    },
    [dispatch],
  );

  const destroySession = useCallback(() => {
    dispatch(rootActions.destroySession());
  }, [dispatch]);

  return {
    updateMeta,
    setStore,
    destroySession,
  };
};
