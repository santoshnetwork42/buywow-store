import { useDispatch } from "react-redux";
import { authSagaActions } from "../sagaActions/auth.actions";

export const useAuthDispatch = () => {
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch({
      type: authSagaActions.SIGN_OUT,
    });
  };

  return {
    handleSignOut,
  };
};
