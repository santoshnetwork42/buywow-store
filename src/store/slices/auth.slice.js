import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  confirmationStatus: null,
  error: {
    phone: "",
    otp: "",
  },
  loading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setConfirmationStatus: (state, action) => {
      state.confirmationStatus = action.payload;
    },
    setAuthError: (state, action) => {
      state.error = { ...state.error, ...action.payload };
    },
    setAuthLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setConfirmationStatus, setAuthLoading, setAuthError } =
  authSlice.actions;
export default authSlice.reducer;
