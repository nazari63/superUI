import { createSlice } from '@reduxjs/toolkit';

interface ModalState {
  [key: string]: boolean;
}

const initialState: ModalState = {};

export const ModalSlide = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      state[payload] = true;
    },
    closeModal: (state, { payload }) => {
      state[payload] = false;
    },
    closeModalAll: (state) => {
      Object.keys(state).forEach((key) => {
        state[key] = false;
      });
    },
  },
});

export const { openModal, closeModal, closeModalAll } = ModalSlide.actions;
export default ModalSlide.reducer;
