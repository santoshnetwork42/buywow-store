import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  recentlyViewedProducts: [],
};

export const recentlyViewedSlice = createSlice({
  name: "recentlyViewed",
  initialState,
  reducers: {
    setRecentlyViewedProducts: (state, action) => {
      state.recentlyViewedProducts = action.payload;
    },
  },
});

export const { setRecentlyViewedProducts } = recentlyViewedSlice.actions;

export default recentlyViewedSlice.reducer;
