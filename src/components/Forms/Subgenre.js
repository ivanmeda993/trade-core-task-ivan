import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSubGenre } from "../../reducers/genreReducer";
import { isAddFormHandler, nextBtn } from "../../reducers/btnReducer";

const Subgenre = ({ setSteps, steps, setCurrentStep }) => {
  const dispatch = useDispatch();
  const { subGenre, selected } = useSelector((state) => state.selectedGenre);

  useEffect(() => {
    if (!subGenre.id) {
      dispatch(nextBtn(true));
    } else {
      dispatch(nextBtn(false));
    }
  }, []);
  const selectHandler = (genre) => {
    dispatch(selectSubGenre(genre));
    dispatch(nextBtn(false));
  };
  const handleAddSub = () => {
    let newSteps = steps.filter((s) => s !== "...");
    newSteps.push("Add new subgenre", "Information");
    setSteps(newSteps);
    dispatch(isAddFormHandler(true));
    setCurrentStep((prevState) => prevState + 1);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-center">
      {selected.subgenres.map((genre, i) => (
        <div
          key={i}
          onClick={() => selectHandler(genre, i)}
          className={` p-4 border-2 text-center cursor-pointer hover:bg-gray-600 hover:text-white rounded-2xl ${
            subGenre.id === genre.id && "bg-gray-600"
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
