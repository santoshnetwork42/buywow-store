import { useDispatch } from "react-redux";
import { userSagaActions } from "../sagaActions/user.actions";

export const useUserDispatch = () => {
  const dispatch = useDispatch();

  const setIsLoggedinViaGokwik = (payload) => {
    dispatch({
      type: userSagaActions.SET_LOGGED_IN_VIA,
      payload,
    });
  };

  const setCustomUser = (payload) => {
    dispatch({
      type: userSagaActions.SET_CUSTOM_USER,
      payload,
    });
  };

  return {
    setIsLoggedinViaGokwik,
    setCustomUser,
  };
};
