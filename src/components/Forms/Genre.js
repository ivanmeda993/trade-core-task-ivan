import React, { useEffect } from "react";
import { selectedGenreState } from "../../atoms/selectedGenre";
import { useRecoilState } from "recoil";
import { btnStateRecoil } from "../../atoms/btn";

const Genre = ({ data }) => {
  const [selectGenre, setSelectedGenre] = useRecoilState(selectedGenreState);
  const [btnState, setBtnState] = useRecoilState(btnStateRecoil);
  useEffect(() => {
    if (selectGenre.selected.id) {
      setBtnState({
        ...btnState,
        nextBtn: false,
        btnDirection: "next",
      });
    }
  }, []);

  const selectHandler = (selected, i) => {
    setSelectedGenre({ selected: selected, index: i });
    return setBtnState({
      ...btnState,
      nextBtn: false,
      btnDirection: "next",
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-center">
      {data.map((genre, i) => (
        <div
          key={genre.id}
          onClick={() => selectHandler(genre, i)}
          className={`p-4 border-2 text-center cursor-pointer hover:bg-gray-600 hover:text-white rounded-2xl ${
            selectGenre.selected.id === genre.id && "bg-gray-600"
          }`}
        >
          {genre.name}
        </div>
      ))}
    </div>
  );
};

export default Genre;
