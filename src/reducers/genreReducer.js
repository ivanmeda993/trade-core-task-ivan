import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selected: {},
  subGenre: {},
  index: "",
};
const selectedGenreSlice = createSlice({
  name: "selectedGenre",
  initialState,
  reducers: {
    selectGenre(state, action) {
      state.selected = action.payload.selected;
      state.index = action.payload.index;
    },
    selectSubGenre(state, action) {
      state.subGenre = action.payload;
    },
    resetGenre: () => initialState,
  },
});

export const { selectGenre, selectSubGenre, resetGenre } =
  selectedGenreSlice.actions;

export default selectedGenreSlice.reducer;
