import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { persistReducer } from "redux-persist";
import { authSlice } from "@/store/slices/auth/authSlice";
import { userSlice } from "@/store/slices/user/userSlice";
import { modalSlice } from "@/store/slices/modal/modalSlice";
import storage from "redux-persist/lib/storage";
import rootSaga from "./sagas";
import persistStore from "redux-persist/es/persistStore";

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [modalSlice.name]: modalSlice.reducer,
});

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: "wow",
  whitelist: ["auth", "user", "modal"],
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export default store;
