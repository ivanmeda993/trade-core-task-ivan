import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectGenre, selectSubGenre } from "../../reducers/genreReducer";
import { nextBtn } from "../../reducers/btnReducer";

const Genre = ({ data }) => {
  const selectedGenre = useSelector((state) => state.selectedGenre.selected);
  const dispatch = useDispatch();
  useEffect(() => {
    if (selectedGenre.id) {
      dispatch(nextBtn(false));
    }
  }, []);

  const selectHandler = (selected, index) => {
    dispatch(selectGenre({ selected, index }));
    dispatch(selectSubGenre({}));
    dispatch(nextBtn(false));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-center">
      {data.map((genre, i) => (
        <div
          key={genre.id}
          onClick={() => selectHandler(genre, i)}
          className={`p-4 border-2 text-center cursor-pointer hover:bg-gray-600 hover:text-white rounded-2xl ${
            selectedGenre.id === genre.id && "bg-gray-600"
          }`}
        >
          {genre.name}
        </div>
      ))}
    </div>
  );
};

export default Genre;
