import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  modal: {
    passwordLess: { isPasswordlessOpen: false, redirectAfterLogin: false },
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
    setPasswordlessModal: (state, action) => {
      state.modal.passwordLess = action.payload;
    },
    setCartModal: (state, action) => {
      state.modal.cart = action.payload;
    },
  },
});

export const { setModal, setPasswordlessModal, setCartModal } =
  modalSlice.actions;
export default modalSlice.reducer;
