import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentAddress: null,
  addressList: [],
  isLoading: false,
  initialLoading: false,
};

export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    updateCurrentAddress: (state, action) => {
      state.currentAddress = action.payload;
    },
    resetAddress: () => initialState,
    updateAddressLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    updateAddressList: (state, action) => {
      state.addressList = action.payload;
    },
    updateInitialLoading: (state, action) => {
      state.initialLoading = action.payload;
    },
  },
});

export const {
  updateCurrentAddress,
  updateAddressLoading,
  updateAddressList,
  updateInitialLoading,
  resetAddress,
} = addressSlice.actions;
export default addressSlice.reducer;
