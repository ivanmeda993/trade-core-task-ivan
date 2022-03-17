import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedSubState } from "../../atoms/selectedGenre";
import { btnStateRecoil } from "../../atoms/btn";

const ShowInfo = ({ steps }) => {
  const { selected } = useRecoilValue(selectedSubState);
  const [btnState, setBtnState] = useRecoilState(btnStateRecoil);
  useEffect(() => {
    setBtnState({ ...btnState, nextBtn: true });
  }, []);
  console.log(selected);
  return (
    <div className="flex flex-col space-y-24">
      <div className="w-full mx-2 flex-1">
        <p className="inputForm mb-1">
          {selected.name || selected.subgenreName}
        </p>{" "}
        {selected.author && <p className="inputForm mb-1">{selected.author}</p>}
        {selected.editionLanguage && (
          <p className="inputForm mb-1">{selected.editionLanguage}</p>
        )}
        {selected.format && <p className="inputForm mb-1">{selected.format}</p>}
        {selected.description && (
          <p className="inputForm mb-1">{selected.description}</p>
        )}
        <div className="flex items-center gap-3 mt-2">
          <input
            type="checkbox"
            placeholder="Description is required for this subgenre"
            className="checkboxForm"
            readOnly
            checked={selected.isDescriptionRequired}
          />

          <p className="textForm">Description is required for this subgenre</p>
        </div>
      </div>{" "}
    </div>
  );
};

export default ShowInfo;
