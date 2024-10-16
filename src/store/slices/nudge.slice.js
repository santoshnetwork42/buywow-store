import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  collectionSlug: "",
  applicableProductCoupons: [],
  applicableCollectionCoupons: [],
  globalCoupons: [],
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
    setApplicableCollectionCoupons: (state, action) => {
      state.applicableCollectionCoupons = action.payload;
    },
    setApplicableProductCoupons: (state, action) => {
      state.applicableProductCoupons = action.payload;
    },
    setGlobalCoupons: (state, action) => {
      state.globalCoupons = action.payload;
    },
    resetNudge: () => initialState,
  },
});

export const {
  setCollectionSlug,
  setCurrentQuantity,
  setMaximumQuantity,
  setApplicableCollectionCoupons,
  setApplicableProductCoupons,
  setGlobalCoupons,
  resetNudge,
} = nudgeSlice.actions;
export default nudgeSlice.reducer;
