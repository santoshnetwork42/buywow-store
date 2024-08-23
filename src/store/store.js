import { STORE_PREFIX } from "@/config";
import { addressSlice } from "@/store/slices/address.slice";
import { authSlice } from "@/store/slices/auth.slice";
import { cartSlice } from "@/store/slices/cart.slice";
import { eventsSlice } from "@/store/slices/events.slice";
import { modalSlice } from "@/store/slices/modal.slice";
import { recentlyViewedSlice } from "@/store/slices/recentlyViewed.slice";
import { systemSlice } from "@/store/slices/system.slice";
import { userSlice } from "@/store/slices/user.slice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";

export const actionTypes = {
  DESTROY_SESSION: "DESTROY_SESSION",
};

export const rootActions = {
  destroySession: () => ({
    type: actionTypes.DESTROY_SESSION,
  }),
};

const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const createPersistConfig = (key) => ({
  keyPrefix: `${STORE_PREFIX}-`,
  key,
  storage,
});

const persistedReducers = {
  [authSlice.name]: persistReducer(
    createPersistConfig("auth"),
    authSlice.reducer,
  ),
  [userSlice.name]: persistReducer(
    createPersistConfig("user"),
    userSlice.reducer,
  ),
  [cartSlice.name]: persistReducer(
    createPersistConfig("cart"),
    cartSlice.reducer,
  ),
  [addressSlice.name]: persistReducer(
    createPersistConfig("address"),
    addressSlice.reducer,
  ),
  [recentlyViewedSlice.name]: persistReducer(
    createPersistConfig("recentlyViewed"),
    recentlyViewedSlice.reducer,
  ),
  [systemSlice.name]: persistReducer(
    createPersistConfig("system"),
    systemSlice.reducer,
  ),
  // Non-persisted reducers
  [modalSlice.name]: modalSlice.reducer,
  [eventsSlice.name]: eventsSlice.reducer,
};

const appReducer = combineReducers(persistedReducers);

const rootReducer = (state, action) => {
  if (action.type === actionTypes.DESTROY_SESSION) {
    Object.keys(persistedReducers).forEach((key) => {
      if (storage.removeItem) {
        storage.removeItem(`${STORE_PREFIX}-${key}`);
      }
    });
    state = undefined;
  }
  return appReducer(state, action);
};

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export default store;
