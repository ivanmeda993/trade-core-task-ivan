import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nextBtn: true,
  isAddForm: false,
};
export const btnSlice = createSlice({
  name: "btn",
  initialState,
  reducers: {
    nextBtn: (state, action) => {
      state.nextBtn = action.payload;
    },
    isAddFormHandler: (state, action) => {
      state.isAddForm = action.payload;
    },
    resetBtn: () => initialState,
  },
});

export const { nextBtn, isAddFormHandler, resetBtn } = btnSlice.actions;
export default btnSlice.reducer;
