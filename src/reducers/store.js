import { configureStore } from "@reduxjs/toolkit";
import btnReducer from "./btnReducer";
import selectedGenreReducer from "./genreReducer";

export const store = configureStore({
  reducer: {
    btn: btnReducer,
    selectedGenre: selectedGenreReducer,
  },
});
