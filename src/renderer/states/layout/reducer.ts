import { createSlice } from '@reduxjs/toolkit';

interface LayoutState {
  currentPage: string;
  previousPage: string;
}

const initialState: LayoutState = {
  currentPage: 'bridgeDeposit',
  previousPage: '',
};

export const LayoutSlide = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    openPage: (state, { payload }) => {
      state.previousPage = state.currentPage;
      state.currentPage = payload;
    },
    closePage: (state) => {
      state.currentPage = state.previousPage;
      state.previousPage = '';
    },
  },
});

export const { openPage, closePage } = LayoutSlide.actions;
export default LayoutSlide.reducer;
