import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { userSagaActions } from "../sagaActions/user.actions";

export const useUserDispatch = () => {
  const dispatch = useDispatch();

  const setIsLoggedinViaGokwik = useCallback(
    (payload) => {
      dispatch({
        type: userSagaActions.SET_LOGGED_IN_VIA,
        payload,
      });
    },
    [dispatch],
  );

  const setCustomUser = useCallback(
    (phone) => {
      dispatch({
        type: userSagaActions.SET_CUSTOM_USER,
        payload: {
          phone,
        },
      });
    },
    [dispatch],
  );

  const setUser = useCallback(
    (user) => {
      dispatch({
        type: userSagaActions.SET_USER,
        payload: {
          user,
        },
      });
    },
    [dispatch],
  );

  return {
    setIsLoggedinViaGokwik,
    setCustomUser,
    setUser,
  };
};
