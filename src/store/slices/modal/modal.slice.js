import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  modal: {
    passwordLess: {
      isPasswordLessOpen: false,
      customLogin: false,
      redirectTo: null,
    },
    cart: { isCartOpen: false },
    drawer: { isDrawerOpen: false },
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
    setCartModal: (state, action) => {
      state.modal.cart = action.payload;
    },
    setDrawer: (state, action) => {
      state.modal.drawer = action.payload;
    },
  },
});

export const { setModal, setPasswordLessModal, setCartModal, setDrawer } =
  modalSlice.actions;

export default modalSlice.reducer;
