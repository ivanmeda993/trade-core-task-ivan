import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import StepperControl from "../StepperControl";
import { nanoid } from "nanoid";
import { useRecoilValue } from "recoil";
import { selectedGenreState } from "../../atoms/selectedGenre";
import Loading from "../Loading";

export default function AddInfo({
  currentStep,
  steps,
  setSteps,
  setCurrentStep,
  setBook,
  book,
  setData,
  data,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const selectedGenre = useRecoilValue(selectedGenreState);
  const [loading, setLoading] = useState(false);
  const id = nanoid(21);

  let newArray = [...data];

  const handleClick = (bookData) => {
    setLoading(true);
    if (bookData) {
      setBook((prevState) => ({ ...prevState, ...bookData, id }));
    }
    newArray[selectedGenre.index] = {
      ...newArray[selectedGenre.index],
      subgenres: [...newArray[selectedGenre.index].subgenres, book],
    };
    setLoading(true);
  };
  useEffect(() => {
    if (loading) {
      const timeout = setTimeout(() => {
        const uniqArr = newArray.filter(
          (v, i, a) => a.findIndex((t) => t.id === v.id) === i
        );
        localStorage.setItem("books", JSON.stringify(uniqArr));
        setData(uniqArr);
        let details = JSON.parse(localStorage.getItem("books"));
        console.log("NEW DATA ==>", details);
        setCurrentStep("final");
        setLoading(false);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [loading]);
  const handleBack = () => {
    let newStep = currentStep;
    setSteps(steps);
    newStep--;
    return newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };
  return (
    <>
      {loading && <Loading />}
      <form onSubmit={handleSubmit(handleClick)} className="flex flex-col ">
        <div className="w-full mx-2 flex-1">
          <label className="textForm ">Book title</label>
          <input
            className="inputForm mb-0"
            type="text"
            placeholder="Book title"
            {...register("bookTitle", {
              required: !!book.isDescriptionRequired,
              maxLength: 80,
            })}
          />
          {errors.bookTitle?.type === "required" && (
            <p className="text-xs text-red-600">Book title is required</p>
          )}
          <label className="textForm ">Author</label>
          <input
            className="inputForm"
            type="text"
            placeholder="Author"
            {...register("author", { maxLength: 100 })}
          />
          <label className="textForm ">ISBN</label>
          <input
            type="text"
            className="inputForm"
            placeholder="ISBN"
            {...register("ISBN", {})}
          />
          <label className="textForm ">Publisher</label>
          <input
            className="inputForm"
            type="text"
            placeholder="Publisher"
            {...register("publisher", { maxLength: 12 })}
          />
          <label className="textForm ">Date published</label>
          <input
            type="date"
            className="inputForm"
            placeholder="Date"
            {...register("datePublished", {})}
          />
          <label className="textForm ">Number of pages</label>
          <input
            className="inputForm"
            type="number"
            placeholder="Number of pages"
            {...register("numberOfPages", {})}
          />
          <label className="textForm ">Format</label>
          <select {...register("format")} className="inputForm">
            <option value="A4">A4</option>
            <option value="A3">A3</option>
          </select>
          <label className="textForm ">Edition</label>
          <input
            className="inputForm"
            type="text"
            placeholder="Edition"
            {...register("edition", {})}
          />
          <label className="textForm ">Edition Language</label>
          <select {...register("editionLanguage")} className="inputForm">
            <option value="English">English</option>
            <option value="Serbian">Serbian</option>
          </select>
          <label className="textForm ">Description</label>
          <textarea
            className="inputForm"
            {...register("description", {
              required: !!book.isDescriptionRequired,
            })}
          />
          {errors.description?.type === "required" && (
            <p className="text-xs text-red-600">Description is required</p>
          )}

          <input type="submit" hidden />
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