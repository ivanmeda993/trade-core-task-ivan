import React from "react";
import { CircleLoader } from "react-spinners";
import { css } from "@emotion/react";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: #0e0e0e;
  color: #f35656;
`;
const Loading = () => {
  return (
    <>
      <div>
        <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-black/90  flex flex-col items-center justify-center">
          <CircleLoader
            color={"rgb(3, 105, 161)"}
            loading={true}
            css={override}
            size={350}
            margin={15}
          />
          <p className="text-sky-700 text-4xl font-extralight mt-8 animate-pulse">
            Loading...
          </p>
        </div>
      </div>
    </>
  );
};

export default Loading;
