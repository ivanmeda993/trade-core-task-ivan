import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import { useRecoilValue } from "recoil";
import { selectedGenreState } from "../../atoms/selectedGenre";
import Loading from "../Loading";

export default function AddInfo({
  currentStep,
  steps,
  setSteps,
  setCurrentStep,
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
  let newBook = { ...book };

  const handleClick = (bookData) => {
    setLoading(true);
    if (bookData) {
      newBook = { ...newBook, ...bookData, id };
      newBook = Object.assign(bookData, newBook);
    }

    newArray[selectedGenre.index] = {
      ...newArray[selectedGenre.index],
      subgenres: [...newArray[selectedGenre.index].subgenres, newBook],
    };
    setLoading(true);
    const uniqArr = newArray.filter(
      (v, i, a) => a.findIndex((t) => t.id === v.id) === i
    );
    localStorage.setItem("books", JSON.stringify(uniqArr));
    setData(newArray);
    let details = JSON.parse(localStorage.getItem("books"));
    console.log("NEW DATA ==>", details);
    setLoading(false);
    setCurrentStep("final");
  };

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

        <div className="container flex justify-around mt-4 mb-8">
          <button
            onClick={() => handleBack()}
            className={`bg-white text-slate-400 uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer border-2 border-slate-300 hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out ${
              currentStep === 1 && "opacity-50 cursor-not-allowed"
            }`}
          >
            back
          </button>
          <button
            type="submit"
            className="bg-gray-700  shadow-lg text-white uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer hover:bg-gray-900 hover:text-white transition duration-200 ease-in-out disabled:bg-slate-200 "
          >
            Complete
          </button>
        </div>
      </form>
    </>
  );
}
