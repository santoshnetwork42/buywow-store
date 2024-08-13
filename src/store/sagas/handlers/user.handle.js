import {
  setCustomUser,
  setIsLoggedinViaGokwik,
  setUser,
} from "@/store/slices/user.slice";
import { put } from "redux-saga/effects";
import { cartSagaActions } from "../sagaActions/cart.actions";

export function* setUserHandler(action) {
  try {
    yield put(setUser(action.payload));
    yield put({ type: cartSagaActions.MANAGE_CART });
  } catch (error) {
    console.log("error", error);
  }
}

export function* setCustomUserHandler(action) {
  try {
    yield put(setCustomUser(action.payload));
  } catch (error) {
    console.log("error", error);
  }
}

export function* setIsLoggedinViaGokwikHandler(action) {
  try {
    yield put(setIsLoggedinViaGokwik(action.payload));
    yield put({ type: cartSagaActions.MANAGE_CART });
  } catch (error) {
    console.log("error", error);
  }
}
