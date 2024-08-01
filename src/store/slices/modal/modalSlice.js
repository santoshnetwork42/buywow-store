import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  modal: {
    passwordLess: { isPasswordLessOpen: false, customLogin: false },
    cart: { isCartOpen: false },
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
  },
});

export const { setModal, setPasswordLessModal, setCartModal } =
  modalSlice.actions;
export default modalSlice.reducer;
