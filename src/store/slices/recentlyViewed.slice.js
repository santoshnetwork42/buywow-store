import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  recentlyViewedProducts: [],
  stalePeriod: null,
};

export const recentlyViewedSlice = createSlice({
  name: "recentlyViewed",
  initialState,
  reducers: {
    setRecentlyViewedProducts: (state, action) => {
      state.recentlyViewedProducts = action.payload;
    },
    setStalePeriod: (state, action) => {
      state.stalePeriod = action.payload;
    },
  },
});

export const { setRecentlyViewedProducts, setStalePeriod } =
  recentlyViewedSlice.actions;

export default recentlyViewedSlice.reducer;
