import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { persistReducer } from "redux-persist";
import { onboardingSlice } from "@/store/slices/onboarding/onboardingSlice";
import storage from "redux-persist/lib/storage";
import rootSaga from "./sagas";
import persistStore from "redux-persist/es/persistStore";

const rootReducer = combineReducers({
  [onboardingSlice.name]: onboardingSlice.reducer,
});

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: "wow",
  whitelist: ["onboarding"],
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
