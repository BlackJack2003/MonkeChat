import React from "react";

const Error: React.FC<{ text: string; settext: Function }> = ({
  text,
  settext,
}) => {
  if (text == null || text == "") return <></>;
  return (
    <div className="w-screen h-screen z-20 flex justify-center items-center backdrop-blur-lg">
      <div className="w-20 p-5 rounded-md min-h-20 dark:bg-gray-700 bg-white">
        <div className="text-xl text-red-500">{text}</div>
        <div
          onClick={() => settext("")}
          className="text-white bg-red-700 rounded-md ml-[80%] px-5 py-2"
        >
          Ok
        </div>
      </div>
    </div>
  );
};

export default Error;
