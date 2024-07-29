import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  data: [],
  coupon: null,
  cartId: null,
  isRewardApplied: true,
  isShoppingCartIdLoading: false,
  subTotal: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.data = action.payload;
    },
    updateSubTotal: (state, action) => {
      state.subTotal = action.payload;
    },
    emptyCart: (state) => {
      state.initialState = { ...initialState };
    },
  },
});

export const { setCart, updateSubTotal, emptyCart } = cartSlice.actions;
export default cartSlice.reducer;
