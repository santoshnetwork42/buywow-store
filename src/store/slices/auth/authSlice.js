import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  confirmationStatus: null,
  confirmationCode: null,
  error: false,
  loading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setConfirmationStatus: (state, action) => {
      state.confirmationStatus = action.payload;
    },
    setConfirmationCode: (state, action) => {
      state.confirmationCode = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setConfirmationStatus, setConfirmationCode } = authSlice.actions;
export default authSlice.reducer;
