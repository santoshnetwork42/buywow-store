import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  signup: {},
};

export const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.signup = { ...action.payload };
    },
  },
});

export const { setUser } = signupSlice.actions;
export default signupSlice.reducer;
