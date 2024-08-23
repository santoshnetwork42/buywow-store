import { systemSagaActions } from "@/store/sagas/sagaActions/system.actions";
import { rootActions } from "@/store/store";
import { useDispatch } from "react-redux";

export const useSystemDispatch = () => {
  const dispatch = useDispatch();

  const updateMeta = (payload) => {
    dispatch({
      type: systemSagaActions.SET_META,
      payload,
    });
  };

  const destroySession = () => {
    dispatch(rootActions.destroySession());
  };

  return {
    updateMeta,
    destroySession,
  };
};
