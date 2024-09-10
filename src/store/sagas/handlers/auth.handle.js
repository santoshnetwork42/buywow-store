import { showToast } from "@/components/common/ToastComponent";
import { checkIfExistingUserAPI, getUserAPI } from "@/lib/appSyncAPIs";
import {
  autoSignInRequest,
  confirmSignInRequest,
  confirmSignUpRequest,
  resendSignUpCodeRequest,
  signInWithAwsRequest,
  signOutRequest,
  signUpWithAwsRequest,
} from "@/store/sagas/requests/auth.request";
import { eventsSagaActions } from "@/store/sagas/sagaActions/events.actions";
import { resetAddress } from "@/store/slices/address.slice";
import {
  setAuthError,
  setAuthLoading,
  setConfirmationStatus,
} from "@/store/slices/auth.slice";
import { setPasswordLessModal } from "@/store/slices/modal.slice";
import { setCustomUser, setUser } from "@/store/slices/user.slice";
import { getCurrentUser } from "aws-amplify/auth";
import { call, put, select } from "redux-saga/effects";

export function* createAwsAccountHandler(action) {
  try {
    const { phone } = action.payload;
    yield put(setAuthLoading(true));
    const user = yield call(() => signUpWithAwsRequest({ phone }));

    if (user?.nextStep?.signUpStep === "CONFIRM_SIGN_UP") {
      yield put(setConfirmationStatus("UNCONFIRMED_SIGNUP"));
    }
  } catch (error) {
    console.error("error", error);
    showToast.error(error.message);
  } finally {
    yield put(setAuthLoading(false));
  }
}

export function* signInWithAwsAccountHandler(action) {
  const customLogin = yield select(
    (state) => state.modal?.modal?.passwordLess?.customLogin,
  );
  const { phone } = action.payload;
  try {
    yield put(setAuthLoading(true));
    const user = yield call(() => signInWithAwsRequest({ phone }));

    if (user?.nextStep?.signInStep === "CONFIRM_SIGN_UP") {
      const user = yield call(() => resendSignUpCodeRequest({ phone }));
      if ((user.deliveryMedium = "SMS"))
        yield put(setConfirmationStatus("UNCONFIRMED_SIGNUP"));
    } else if (
      user?.nextStep?.signInStep === "CONFIRM_SIGN_IN_WITH_CUSTOM_CHALLENGE"
    ) {
      yield put(setConfirmationStatus("UNCONFIRMED_SIGNIN"));
    }
  } catch (error) {
    if (error.name === "UserNotFoundException") {
      if (!customLogin) {
        yield put(setConfirmationStatus("SIGNUP"));
      } else {
        const isExistingUser = yield call(checkIfExistingUserAPI, { phone });

        if (isExistingUser) {
          yield put(setConfirmationStatus("SIGNUP"));
        } else {
          yield put(setConfirmationStatus("UNCONFIRMED_CUSTOM_SIGNIN"));
        }
      }
    } else {
      showToast.error(error.message);
    }
  } finally {
    yield put(setAuthLoading(false));
  }
}

export function* confirmSignInHandler(action) {
  try {
    const { confirmationCode } = action.payload;
    const passwordLess = yield select((state) => state.modal?.passwordLess);

    yield put(setAuthLoading(true));

    const user = yield call(confirmSignInRequest, { confirmationCode });

    if (!user?.isSignedIn) {
      return yield put(setAuthError({ otp: "OTP is invalid" }));
    }

    //user?.nextStep?.signInStep = DONE if user is verified successfully
    yield put(setConfirmationStatus(user?.nextStep?.signInStep));
    yield put(
      setPasswordLessModal({
        isPasswordLessOpen: false,
        customLogin: passwordLess?.customLogin,
        redirectTo: passwordLess?.redirectTo,
      }),
    );

    const currentUser = yield call(getCurrentUser);

    if (currentUser?.userId) {
      const userData = yield call(getUserAPI);
      yield put(setUser(userData));
      yield put(setCustomUser(null));
      yield put(resetAddress());

      yield put({
        type: eventsSagaActions.AUTH,
        payload: {
          action: "login",
          userId: userData?.id,
          phone: userData?.phone,
        },
      });
    }

    showToast.success("You've successfully signed in. Welcome!");
  } catch (error) {
    console.error("Error in confirmSignInHandler:", error);
  } finally {
    yield put(setAuthLoading(false));
  }
}

export function* confirmSignUpHandler(action) {
  try {
    const { username, confirmationCode } = action.payload;

    yield put(setAuthLoading(true));
    const user = yield call(confirmSignUpRequest, {
      username,
      confirmationCode,
    });

    if (!user) {
      return yield put(setAuthError({ otp: "OTP is invalid" }));
    }

    if (user?.nextStep?.signUpStep === "COMPLETE_AUTO_SIGN_IN") {
      const res = yield call(autoSignInRequest);
      yield put({
        type: eventsSagaActions.AUTH,
        payload: {
          action: "signup",
          userId: user?.userId,
          query: "",
          phone: username,
        },
      });
      yield put(setConfirmationStatus(res?.nextStep?.signInStep));

      const currentUser = yield call(getCurrentUser);

      if (currentUser?.userId) {
        const userData = yield call(getUserAPI);
        yield put(setUser(userData));
        yield put(setCustomUser(null));
        yield put(resetAddress());

        yield put({
          type: eventsSagaActions.AUTH,
          payload: {
            action: "login",
            userId: userData?.id,
            phone: userData?.phone,
          },
        });
      }

      showToast.success("You've successfully signed in. Welcome!");
    }
  } catch (error) {
    console.error("Error in confirmSignUpHandler:", error);
  } finally {
    yield put(setAuthLoading(false));
  }
}

export function* setConfirmationStatusHandler(action) {
  try {
    yield put(setConfirmationStatus(action.payload));
  } catch (error) {
    console.error("error", error);
  }
}

export function* signOutHandler() {
  try {
    const user = yield select((state) => state.user.user);
    const signedOutUser = yield call(() => signOutRequest());
    // event for logout is passed here
    yield put({
      type: eventsSagaActions.LOG_OUT,
      payload: {
        "Customer ID": user?.id,
        URL: window.location.href,
      },
    });
    yield put(setConfirmationStatus(null));
    yield put(
      setUser({
        id: null,
        phone: null,
      }),
    );
    yield put(setCustomUser({ phone: null }));
  } catch (error) {
    console.error("error", error);
  }
}

export function* authLoaderHandler(action) {
  try {
    yield put(setAuthLoading(action.payload));
  } catch (error) {
    console.error("error", error);
  }
}

export function* authErrorHandler(action) {
  try {
    yield put(setAuthError(action.payload));
  } catch (error) {
    console.error("error", error);
  }
}
