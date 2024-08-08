import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  data: [],
  coupon: null,
  cartId: null,
  isRewardApplied: true,
  isShoppingCartIdLoading: false,
  subTotal: 0,
  storedCouponCode: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.data = action.payload;
    },
    setSubTotal: (state, action) => {
      state.subTotal = action.payload;
    },
    emptyCart: () => initialState,
    setCoupon: (state, action) => {
      state.coupon = action.payload;
    },
    setCartId: (state, action) => {
      state.cartId = action.payload;
    },
    setIsRewardApplied: (state, action) => {
      state.isRewardApplied = action.payload;
    },
    setIsShoppingCartIdLoading: (state, action) => {
      state.isShoppingCartIdLoading = action.payload;
    },
    setStoredCouponCode: (state, action) => {
      state.storedCouponCode = action.payload;
    },
  },
});

export const {
  setCart,
  setSubTotal,
  emptyCart,
  setCoupon,
  setCartId,
  setIsRewardApplied,
  setIsShoppingCartIdLoading,
  setStoredCouponCode,
} = cartSlice.actions;

export default cartSlice.reducer;
