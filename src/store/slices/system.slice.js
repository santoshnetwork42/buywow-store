import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  meta: {
    landingPage: null,
    referrer: null,
    utmCampaign: null,
    utmContent: null,
    utmMedium: null,
    utmSource: null,
    utmTerm: null,
    clickId: null,
  },
  store: { name: null, id: null, imageUrl: null, title: null, webUrl: null },
};

export const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    setMeta: (state, action) => {
      state.meta = { ...state.meta, ...action.payload };
    },
    setStore: (state, action) => {
      state.store = action.payload;
    },
  },
});

export const { setMeta, setStore } = systemSlice.actions;

export default systemSlice.reducer;
