import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  data: [],
};

export const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
});

export default eventsSlice.reducer;
