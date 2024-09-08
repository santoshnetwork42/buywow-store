import { addPhonePrefix } from "@/utils/helpers";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { authSagaActions } from "@/store/sagas/sagaActions/auth.actions";

export const useAuthDispatch = () => {
  const dispatch = useDispatch();

  const handleSignOut = useCallback(() => {
    dispatch({
      type: authSagaActions.SIGN_OUT,
    });
  }, [dispatch]);

  const setConfirmationStatus = useCallback(
    (status) => {
      dispatch({
        type: authSagaActions.SET_CONFIRMATION_STATUS,
        payload: status,
      });
    },
    [dispatch],
  );

  const setAuthLoader = useCallback(
    (isLoading) => {
      dispatch({
        type: authSagaActions.SET_AUTH_LOADER,
        payload: isLoading,
      });
    },
    [dispatch],
  );

  const signInAwsAccount = useCallback(
    (phone) => {
      dispatch({
        type: authSagaActions.SIGNIN_AWS_ACCOUNT,
        payload: { phone },
      });
    },
    [dispatch],
  );

  const createAwsAccount = useCallback(
    (phone) => {
      dispatch({
        type: authSagaActions.CREATE_AWS_ACCOUNT,
        payload: {
          phone: addPhonePrefix(phone),
        },
      });
    },
    [dispatch],
  );

  const confirmSignIn = useCallback(
    (confirmationCode) => {
      dispatch({
        type: authSagaActions.CONFIRM_SIGNIN,
        payload: { confirmationCode },
      });
    },
    [dispatch],
  );

  const confirmSignUp = useCallback(
    (phone, confirmationCode) => {
      dispatch({
        type: authSagaActions.CONFIRM_SIGNUP,
        payload: { username: phone, confirmationCode },
      });
    },
    [dispatch],
  );

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
