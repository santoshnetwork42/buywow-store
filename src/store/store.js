import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { persistReducer } from "redux-persist";
import { signupSlice } from "@/store/slices/signup/signupSlice";
import storage from "redux-persist/lib/storage";
import rootSaga from "./sagas";
import persistStore from "redux-persist/es/persistStore";

const rootReducer = combineReducers({
  [signupSlice.name]: signupSlice.reducer,
});

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: "wow",
  whitelist: ["signup"],
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
