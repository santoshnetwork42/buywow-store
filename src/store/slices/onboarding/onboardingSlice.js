import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  onBoarding: {
    id: "",
  },
};

export const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.onBoarding = { ...action.payload };
    },
  },
});

export const { setUser } = onboardingSlice.actions;
export default onboardingSlice.reducer;
