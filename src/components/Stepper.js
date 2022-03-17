import React, { useEffect, useRef, useState } from "react";

const Stepper = ({ steps, currentStep }) => {
  const [newStep, setNewStep] = useState([]);
  const stepRef = useRef();

  const updateStep = (stepNumber, steps) => {
    const newSteps = [...steps];
    let count = 0;
    while (count < newSteps.length) {
      //current step
      if (count === stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: true,
          selected: true,
          completed: true,
        };
        count++;
      }

      //step completed
      else if (count < stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: false,
          completed: true,
        };
        count++;
      }
      //step pending
      else {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: false,
          completed: false,
        };
        count++;
      }
    }

    return newSteps;
  };

  useEffect(() => {
    stepRef.current = steps.map((step, index) =>
      Object.assign(
        {},
        {
          description: step,
          completed: false,
          highlighted: index === 0,
          selected: index === 0,
        }
      )
    );
    const current = updateStep(currentStep - 1, stepRef.current);
    setNewStep(current);
  }, [steps, currentStep]);

  const displaySteps = newStep.map((step, index) => {
    return (
      <div
        key={index}
        className={
          index !== newStep.length - 1
            ? `w-full flex items-center`
            : `flex items-center`
        }
      >
        <div className="relative flex flex-col items-center text-white">
          <div
            className={`rounded-full transition duration-500 ease-in-out text-gray-100 border-gray-300 h-12 w-12 flex items-center justify-center py-3 ${
              step.selected ? "bg-gray-700" : "bg-gray-300"
            }`}
          >
            {step.completed ? (
              <span className="font-bold text-xl">{index + 1}</span>
            ) : (
              <span>{index + 1}</span>
            )}
          </div>
          <div
            className={` absolute top-0 text-center mt-16 w-32 text-xs font-medium  uppercase ${
              step.highlighted ? "text-gray-700" : "text-gray-300"
            }`}
          >
            {step.description}
          </div>
        </div>
        {/*  Line*/}
        <div
          className={`flex-auto border-t-2 transition duration-500 ease-in-out mx-3 `}
        />
      </div>
    );
  });

  return (
    <div className="mx-4 p-4 flex justify-between items-center">
      {displaySteps}
    </div>
  );
};

export default Stepper;
