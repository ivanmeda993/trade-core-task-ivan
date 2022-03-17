import React, { useState } from "react";
import { selectedGenreState } from "../../atoms/selectedGenre";
import { useRecoilState } from "recoil";
import { btnStateRecoil } from "../../atoms/btn";

const Genre = ({ data, setData }) => {
  const [selectGenre, setSelectedGenre] = useRecoilState(selectedGenreState);
  const [select, setSelect] = useState(false);
  const [btnState, setBtnState] = useRecoilState(btnStateRecoil);

  const selectHandler = (g, i) => {
    setSelectedGenre({ selected: g, index: i });
    setSelect(g.id);
    return setBtnState({
      ...btnState,
      nextBtn: false,
      btnDirection: "next",
    });
  };
  console.log(selectGenre.selected);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-center">
      {data.map((g, i) => (
        <div
          key={g.id}
          onClick={() => selectHandler(g, i)}
          className={`p-4 border-2 text-center cursor-pointer hover:bg-gray-600 hover:text-white rounded-2xl ${
            select === g.id && "bg-gray-600"
          }`}
        >
          {g.name}
        </div>
      ))}
    </div>
  );
};

export default Genre;
