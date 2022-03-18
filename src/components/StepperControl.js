import React from "react";
import { useRecoilValue } from "recoil";
import { btnStateRecoil } from "../atoms/btn";

const StepperControl = ({
  currentStep,
  handleClick,
  steps,
  handleBack,
  handleSubmit,
  type,
}) => {
  const btnState = useRecoilValue(btnStateRecoil);

  return (
    <div className="container flex justify-around mt-4 mb-8">
      <button
        onClick={() =>
          handleBack ? handleBack() : handleClick(btnState.btnDirectionBack)
        }
        className={`bg-white text-slate-400 uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer border-2 border-slate-300 hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out ${
          currentStep === 1 && "opacity-50 cursor-not-allowed"
        }`}
      >
        back
      </button>
      <button
        type={type}
        disabled={btnState.nextBtn}
        onClick={() =>
          handleSubmit ? handleSubmit() : handleClick(btnState.btnDirection)
        }
        className="bg-gray-700  shadow-lg text-white uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer hover:bg-gray-900 hover:text-white transition duration-200 ease-in-out disabled:bg-slate-200 "
      >
        {currentStep === steps.length ? "Complete" : "Next"}
      </button>
    </div>
  );
};

export default StepperControl;
