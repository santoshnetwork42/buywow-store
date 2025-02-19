import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  modal: {
    passwordLess: {
      isPasswordLessOpen: false,
      customLogin: false,
      redirectTo: null,
      source: null,
    },
    cart: { isCartOpen: false },
    spinTheWheel: { isSpinTheWheelNudgeThere: false },
  },
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModal: (state, action) => {
      state.modal = action.payload;
    },
    setPasswordLessModal: (state, action) => {
      state.modal.passwordLess = action.payload;
    },
    setSpinTheWheelVisible: (state, action) => {
      state.modal.spinTheWheel = action.payload;
    },
    setCartModal: (state, action) => {
      state.modal.cart = action.payload;
    },
  },
});

export const {
  setModal,
  setPasswordLessModal,
  setCartModal,
  setSpinTheWheelVisible,
} = modalSlice.actions;

export default modalSlice.reducer;
