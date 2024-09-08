import {
  setCustomUser,
  setIsLoggedinViaGokwik,
  setUser,
} from "@/store/slices/user.slice";
import { put } from "redux-saga/effects";
import { cartSagaActions } from "@/store/sagas/sagaActions/cart.actions";

export function* setUserHandler(action) {
  const { user } = action.payload;
  try {
    yield put(setUser(user));
    yield put({ type: cartSagaActions.MANAGE_CART });
  } catch (error) {
    console.error("error", error);
  }
}

export function* setCustomUserHandler(action) {
  const { phone } = action.payload;
  try {
    yield put(setCustomUser({ phone }));
  } catch (error) {
    console.error("error", error);
  }
}

export function* setIsLoggedinViaGokwikHandler(action) {
  try {
    yield put(setIsLoggedinViaGokwik(action.payload));
    yield put({ type: cartSagaActions.MANAGE_CART });
  } catch (error) {
    console.error("error", error);
  }
}
