import { atom } from "recoil";

export const selectedGenreState = atom({
  key: "SelectedGenre",
  default: { selected: {}, index: "" },
});
export const selectedSubState = atom({
  key: "SelectedSubGenre",
  default: { selected: {}, index: "" },
});
export const allGenreState = atom({
  key: "AllGenre",
  default: [],
});
