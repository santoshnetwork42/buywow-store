import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  email: "",
  pincode: "",
  city: "",
  state: "",
  area: "",
  street: "",
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    updateAddress: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetAddress: () => initialState,
  },
});

export const { updateAddress, resetAddress } = addressSlice.actions;
export default addressSlice.reducer;
