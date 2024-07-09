import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  auth: {
    confirmationStatus: null,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setConfirmationStatus: (state, action) => {
      state.auth.confirmationStatus = action.payload;
    },
  },
});

export const {} = authSlice.actions;
export default authSlice.reducer;
