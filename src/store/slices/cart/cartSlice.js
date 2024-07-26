import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  data: [],
  coupon: null,
  cartId: null,
  isRewardApplied: true,
  isShoppingCartIdLoading: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setCart } = cartSlice.actions;
export default cartSlice.reducer;
