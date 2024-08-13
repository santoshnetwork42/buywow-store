import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  user: {
    id: null,
    phone: null,
  },
  customUser: {
    phone: null,
  },
  isLoggedinViaGokwik: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setCustomUser: (state, action) => {
      state.customUser = action.payload;
    },
    setIsLoggedinViaGokwik: (state, action) => {
      state.isLoggedinViaGokwik = action.payload;
    },
  },
});

export const { setUser, setCustomUser, setIsLoggedinViaGokwik } =
  userSlice.actions;

export default userSlice.reducer;
