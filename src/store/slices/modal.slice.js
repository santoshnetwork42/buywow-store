import Personalizer from "@/components/blocks/QuizPersonalizer";
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
    personalizer: { isPersonalizerModalOpen: false },
    imageZoom: {
      isOpen: false,
      imageKey: null,
      imageIndex: 0,
      imageList: [],
    },
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
    setPersonalizerModal: (state, action) => {
      state.modal.personalizer = action.payload;
    },
    setCartModal: (state, action) => {
      state.modal.cart = action.payload;
    },
    setImageZoomModal: (state, action) => {
      state.modal.imageZoom = action.payload;
    },
  },
});

export const {
  setModal,
  setPasswordLessModal,
  setCartModal,
  setSpinTheWheelVisible,
  setPersonalizerModal,
  setImageZoomModal,
} = modalSlice.actions;

export default modalSlice.reducer;
