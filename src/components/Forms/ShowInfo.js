import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextBtn } from "../../reducers/btnReducer";

const ShowInfo = () => {
  const dispatch = useDispatch();
  const { subGenre } = useSelector((state) => state.selectedGenre);
  useEffect(() => {
    dispatch(nextBtn(true));
  }, []);

  return (
    <>
      <h1 className="text-center mb-10 uppercase text-4xl text-gray-700 font-medium">
        Subgenre Details <br />
        <span className="text-2xl">
          {" "}
          {subGenre.name || subGenre.subgenreName}
        </span>
      </h1>
      <div className="flex flex-col space-y-24">
        <div className="w-full mx-2 flex-1">
          <p className="inputForm mb-1">
            {subGenre.name || subGenre.subgenreName}
          </p>
          {subGenre.author && (
            <p className="inputForm mb-1">{subGenre.author}</p>
          )}
          {subGenre.editionLanguage && (
            <p className="inputForm mb-1">{subGenre.editionLanguage}</p>
          )}
          {subGenre.format && (
            <p className="inputForm mb-1">{subGenre.format}</p>
          )}
          {subGenre.description && (
            <p className="inputForm mb-1">{subGenre.description}</p>
          )}
          <div className="flex items-center gap-3 mt-2">
            <input
              type="checkbox"
              placeholder="Description is required for this subgenre"
              className="checkboxForm"
              readOnly
              checked={subGenre.isDescriptionRequired}
            />

            <p className="textForm">
              Description is required for this subgenre
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowInfo;
