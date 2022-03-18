import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  selectedGenreState,
  selectedSubState,
} from "../../atoms/selectedGenre";
import { btnStateRecoil } from "../../atoms/btn";

const Subgenre = ({ setSteps, steps, setCurrentStep }) => {
  const [selectGenre, setSelectedGenre] = useRecoilState(selectedGenreState);
  const [selectSubGenre, setSelectedSubGenre] =
    useRecoilState(selectedSubState);
  const [btnState, setBtnState] = useRecoilState(btnStateRecoil);
  const [select, setSelect] = useState(false);

  useEffect(() => {
    setBtnState({ ...btnState, nextBtn: true });
  }, []);
  const selectHandler = (g, i) => {
    setBtnState({ ...btnState, nextBtn: false });
    setSelectedSubGenre({ selected: g, index: i });
    setSelect(i);
  };
  console.log(selectSubGenre.selected);
  const handleAddSub = () => {
    let newSteps = steps.filter((s) => s !== "...");
    newSteps.push("Add new subgenre", "Information");
    setSteps(newSteps);
    setBtnState({ ...btnState, isAddForm: true });

    setCurrentStep((prevState) => prevState + 1);
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-center">
      {selectGenre.selected.subgenres.map((g, i) => (
        <div
          key={i}
          onClick={() => selectHandler(g, i)}
          className={` p-4 border-2 text-center cursor-pointer hover:bg-gray-600 hover:text-white rounded-2xl ${
            select === i && "bg-gray-600"
          }`}
        >
          {g.name || g.subgenreName}
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
