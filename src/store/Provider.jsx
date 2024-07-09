"use client";
import React from "react";
import { Provider as ReactProvider } from "react-redux";
import store, { persistor } from "@/store/store";
import { PersistGate } from "redux-persist/integration/react";

export const Provider = ({ children }) => {
  return (
    <ReactProvider store={store}>
      <PersistGate persistor={persistor}>{children}</PersistGate>
    </ReactProvider>
  );
};
