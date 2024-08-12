import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { authSlice } from "@/store/slices/auth.slice";
import { userSlice } from "@/store/slices/user.slice";
import { modalSlice } from "@/store/slices/modal.slice";
import { cartSlice } from "@/store/slices/cart.slice";
import { addressSlice } from "@/store/slices/address.slice";
import { eventsSlice } from "@/store/slices/events.slice";
import { recentlyViewedSlice } from "@/store/slices/recentlyViewed.slice";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import rootSaga from "./sagas";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [modalSlice.name]: modalSlice.reducer,
  [cartSlice.name]: cartSlice.reducer,
  [addressSlice.name]: addressSlice.reducer,
  [eventsSlice.name]: eventsSlice.reducer,
  [recentlyViewedSlice.name]: recentlyViewedSlice.reducer,
});

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

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: "wow",
  whitelist: ["auth", "user", "cart", "address", "recentlyViewed"],
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
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
