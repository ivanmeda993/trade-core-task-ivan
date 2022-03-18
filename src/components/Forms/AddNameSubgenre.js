import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import StepperControl from "../StepperControl";
import { useRecoilState } from "recoil";
import { btnStateRecoil } from "../../atoms/btn";

export default function AddNameSubgenre({
  currentStep,
  steps,
  setSteps,
  setCurrentStep,
  setBook,
  book,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [btnState, setBtnState] = useRecoilState(btnStateRecoil);

  useEffect(() => {
    setBtnState({ ...btnState, nextBtn: false });
  }, []);

  const handleClick = (data) => {
    if (data) {
      setBook(data);
      setCurrentStep(4);
    }
  };

  const handleBack = () => {
    let newStep = currentStep;
    steps.splice(2, 2, "...");
    setSteps(steps);
    setBtnState({ ...btnState, isAddForm: false });
    newStep--;

    return newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(handleClick)}
        className="flex flex-col space-y-24"
      >
        <div className="w-full mx-2 flex-1">
          <div className="">
            <input
              className="inputForm mb-1"
              type="text"
              placeholder="Subgenre name"
              {...register("subgenreName", {
                required: true,
                maxLength: 80,
                value: book.subgenreName,
              })}
            />
            {errors.subgenreName?.type === "required" && (
              <p className="text-xs text-red-600">Subgenre Name is required</p>
            )}
          </div>
          <div className="flex items-center gap-3 mt-2">
            <input
              type="checkbox"
              placeholder="Description is required for this subgenre"
              className="checkboxForm"
              {...register("isDescriptionRequired", {
                maxLength: 100,
                value: book.isDescriptionRequired,
              })}
            />

            <input type="submit" hidden />
            <p className="textForm">
              Description is required for this subgenre
            </p>
          </div>
        </div>
        <StepperControl
          type="submit"
          handleSubmit={handleClick}
          handleBack={handleBack}
          currentStep={currentStep}
          steps={steps}
        />
      </form>
    </>
  );
}
