import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  collectionSlug: "",
  applicableCoupons: [],
  currQuantity: 0,
  maxQuantity: 0,
  initialLoading: false,
};

export const nudgeSlice = createSlice({
  name: "nudge",
  initialState,
  reducers: {
    setCollectionSlug: (state, action) => {
      state.collectionSlug = action.payload;
    },
    setCurrentQuantity: (state, action) => {
      state.currQuantity = action.payload;
    },
    setMaximumQuantity: (state, action) => {
      state.maxQuantity = action.payload;
    },
    setApplicableCoupons: (state, action) => {
      state.applicableCoupons = action.payload;
    },
    resetNudge: () => initialState,
  },
});

export const {
  setCollectionSlug,
  setCurrentQuantity,
  setMaximumQuantity,
  setApplicableCoupons,
  resetNudge,
} = nudgeSlice.actions;
export default nudgeSlice.reducer;
