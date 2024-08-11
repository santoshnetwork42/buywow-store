import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentAddress: null,
  addressList: [],
  isLoading: false,
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
  },
});

export const { updateCurrentAddress, updateAddressLoading, updateAddressList } =
  addressSlice.actions;
export default addressSlice.reducer;
