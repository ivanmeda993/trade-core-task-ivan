export default function Final({ finishHandler }) {
  return (
    <div className="container md:mt-10 z-50">
      <div className="flex flex-col items-center">
        <div className="wrapper">
          <svg
            className="checkmark"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            <circle
              className="checkmark__circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path
              className="checkmark__check"
              fill="none"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
          </svg>
        </div>

        <div className="text-lg font-semibold text-gray-500 mt-4">
          Book added successfully
        </div>
        <button
          onClick={finishHandler}
          className="bg-gray-700 w-full mt-10 shadow-lg text-white  py-2 px-4 rounded-xl  cursor-pointer hover:bg-gray-900 hover:text-white transition duration-200 ease-in-out disabled:bg-slate-200 "
        >
          <span className="p-4 ">Add another book</span>
        </button>
      </div>
    </div>
  );
}
