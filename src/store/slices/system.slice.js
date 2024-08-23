import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  meta: null,
};

export const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    setMeta: (state, action) => {
      state.meta = { ...state.meta, ...action.payload };
    },
    clearMeta: (state) => {
      state.meta = initialState.meta;
    },
  },
});

export const { setMeta, setSessionId, clearMeta } = systemSlice.actions;

export default systemSlice.reducer;
