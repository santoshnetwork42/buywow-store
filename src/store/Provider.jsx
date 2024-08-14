"use client";

import store, { persistor } from "@/store/store";
import { Provider as ReactProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export const Provider = ({ children }) => {
  return (
    <ReactProvider store={store}>
      <PersistGate persistor={persistor}>{children}</PersistGate>
    </ReactProvider>
  );
};
