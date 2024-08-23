import { addressSlice } from "@/store/slices/address.slice";
import { authSlice } from "@/store/slices/auth.slice";
import { cartSlice } from "@/store/slices/cart.slice";
import { eventsSlice } from "@/store/slices/events.slice";
import { modalSlice } from "@/store/slices/modal.slice";
import { recentlyViewedSlice } from "@/store/slices/recentlyViewed.slice";
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
  whitelist: ["auth", "user", "cart", "address", "recentlyViewed", "events"],
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
