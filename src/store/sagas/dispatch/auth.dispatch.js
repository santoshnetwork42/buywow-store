import { addPhonePrefix } from "@/utils/helpers";
import { useDispatch } from "react-redux";
import { authSagaActions } from "@/store/sagas/sagaActions/auth.actions";

export const useAuthDispatch = () => {
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch({
      type: authSagaActions.SIGN_OUT,
    });
  };

  const setConfirmationStatus = (status) => {
    dispatch({
      type: authSagaActions.SET_CONFIRMATION_STATUS,
      payload: status,
    });
  };

  const setAuthLoader = (isLoading) => {
    dispatch({
      type: authSagaActions.SET_AUTH_LOADER,
      payload: isLoading,
    });
  };

  const signInAwsAccount = (phone) => {
    dispatch({
      type: authSagaActions.SIGNIN_AWS_ACCOUNT,
      payload: { phone },
    });
  };

  const createAwsAccount = (phone) => {
    dispatch({
      type: authSagaActions.CREATE_AWS_ACCOUNT,
      payload: {
        phone: addPhonePrefix(phone),
      },
    });
  };

  const confirmSignIn = (confirmationCode) => {
    dispatch({
      type: authSagaActions.CONFIRM_SIGNIN,
      payload: { confirmationCode },
    });
  };

  const confirmSignUp = (phone, confirmationCode) => {
    dispatch({
      type: authSagaActions.CONFIRM_SIGNUP,
      payload: { username: phone, confirmationCode },
    });
  };

  return {
    handleSignOut,
    setConfirmationStatus,
    setAuthLoader,
    signInAwsAccount,
    createAwsAccount,
    confirmSignIn,
    confirmSignUp,
  };
};
