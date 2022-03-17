import "./App.css";
import Stepper from "./components/Stepper";
import StepperControl from "./components/StepperControl";
import Genre from "./components/Forms/Genre";
import Subgenre from "./components/Forms/Subgenre";
import { useEffect, useState } from "react";
import axios from "axios";
import AddNameSubgenre from "./components/Forms/AddNameSubgenre";
import ShowInfo from "./components/Forms/ShowInfo";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { btnStateRecoil } from "./atoms/btn";
import AddInfo from "./components/Forms/AddInfo";
import Final from "./components/Forms/Final";
import {
  allGenreState,
  selectedGenreState,
  selectedSubState,
} from "./atoms/selectedGenre";

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [steps, setSteps] = useState(["Genre", "Subgenre", "..."]);
  const resetBtn = useResetRecoilState(btnStateRecoil);
  const btnState = useRecoilValue(btnStateRecoil);
  const resetGenre = useResetRecoilState(selectedGenreState);
  const resetSub = useResetRecoilState(selectedSubState);
  const resetAllGenre = useResetRecoilState(allGenreState);
  const [data, setData] = useState([]);
  const [book, setBook] = useState({});
  const localData = JSON.parse(localStorage.getItem("books"));
  useEffect(() => {
    if (!localData) {
      axios.get("data.json").then((res) => {
        const { genres } = res.data;
        setData(genres);
      });
    } else {
      setData(localData);
      console.log("LocalData=>", localData);
    }
  }, []);

  const finishHandler = () => {
    setCurrentStep(1);
    setSteps(["Genre", "Subgenre", "..."]);
    resetGenre();
    resetSub();
    resetBtn();
    resetAllGenre();
  };

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <Genre data={data} setData={setData} />;
      case 2:
        return (
          <Subgenre
            setSteps={setSteps}
            steps={steps}
            setCurrentStep={setCurrentStep}
          />
        );
      case 3:
        return !btnState.isAddForm ? (
          <ShowInfo steps={steps} />
        ) : (
          <AddNameSubgenre
            currentStep={currentStep}
            steps={steps}
            setBook={setBook}
            setSteps={setSteps}
            setCurrentStep={setCurrentStep}
          />
        );

      case 4:
        return (
          <AddInfo
            currentStep={currentStep}
            steps={steps}
            setBook={setBook}
            book={book}
            setData={setData}
            data={data}
            setSteps={setSteps}
            setCurrentStep={setCurrentStep}
          />
        );
      case "final":
        return <Final finishHandler={finishHandler} />;
      default:
        return;
    }
  };

  const handleClick = (direction) => {
    let newStep = currentStep;

    if (direction === "next") {
      newStep++;
      return setCurrentStep(newStep);
    }
    if (direction === "back") {
      newStep--;
      return newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
    }
  };
  return (
    <div className="md:w-2/3 mx-auto shadow-2xl rounded-2xl pb-2 bg-white">
      {/*  Stepper*/}
      <div className="container  mt-5">
        <Stepper
          steps={steps}
          currentStep={currentStep}
          setSteps={setSteps}
          setCurrentStep={setCurrentStep}
        />
      </div>
      <div className="my-10 p-10 ">{displayStep(currentStep)}</div>
      {/*  Control*/}
      {!btnState.isAddForm && (
        <StepperControl
          handleClick={handleClick}
          currentStep={currentStep}
          steps={steps}
        />
      )}
    </div>
  );
}

export default App;
