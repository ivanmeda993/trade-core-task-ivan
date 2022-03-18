import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  selectedGenreState,
  selectedSubState,
} from "../../atoms/selectedGenre";
import { btnStateRecoil } from "../../atoms/btn";

const Subgenre = ({ setSteps, steps, setCurrentStep }) => {
  const selectGenre = useRecoilValue(selectedGenreState);
  const [selectSubGenre, setSelectedSubGenre] =
    useRecoilState(selectedSubState);
  const [btnState, setBtnState] = useRecoilState(btnStateRecoil);

  useEffect(() => {
    if (selectSubGenre.selected.id) {
      setBtnState({
        ...btnState,
        nextBtn: false,
        btnDirection: "next",
      });
    } else {
      setBtnState({ ...btnState, nextBtn: true });
    }
  }, [selectGenre.selected.id]);
  const selectHandler = (genre, i) => {
    setBtnState({ ...btnState, nextBtn: false });
    setSelectedSubGenre({ selected: genre, index: i });
  };
  const handleAddSub = () => {
    let newSteps = steps.filter((s) => s !== "...");
    newSteps.push("Add new subgenre", "Information");
    setSteps(newSteps);
    setBtnState({ ...btnState, isAddForm: true });

    setCurrentStep((prevState) => prevState + 1);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-center">
      {selectGenre.selected.subgenres.map((genre, i) => (
        <div
          key={i}
          onClick={() => selectHandler(genre, i)}
          className={` p-4 border-2 text-center cursor-pointer hover:bg-gray-600 hover:text-white rounded-2xl ${
            selectSubGenre.selected.id === genre.id && "bg-gray-600"
          }`}
        >
          {genre.name || genre.subgenreName}
        </div>
      ))}
      <div
        className="p-4 border-2 text-center cursor-pointer hover:bg-gray-600 hover:text-white rounded-2xl"
        onClick={handleAddSub}
      >
        Add New
      </div>
    </div>
  );
};

export default Subgenre;
