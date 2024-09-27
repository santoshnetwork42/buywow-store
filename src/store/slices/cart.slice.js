import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  data: [],
  coupon: null,
  cartId: null,
  isRewardApplied: true,
  isShoppingCartIdLoading: false,
  subTotal: 0,
  storedCouponCode: null,
  cartError: null,
  cartCreatedAt: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.data = action.payload;
    },
    setCartCreatedAt: (state, action) => {
      state.cartCreatedAt = action.payload;
    },
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
    setSubTotal: (state, action) => {
      state.subTotal = action.payload;
    },
    setStoredCouponCode: (state, action) => {
      state.storedCouponCode = action.payload;
    },
    setCartError: (state, action) => {
      state.cartError = action.payload;
    },
    emptyCart: () => initialState,
  },
});

export const {
  setCart,
  setCoupon,
  setCartId,
  setCartCreatedAt,
  setIsRewardApplied,
  setIsShoppingCartIdLoading,
  setSubTotal,
  setStoredCouponCode,
  setCartError,
  emptyCart,
} = cartSlice.actions;

export default cartSlice.reducer;
