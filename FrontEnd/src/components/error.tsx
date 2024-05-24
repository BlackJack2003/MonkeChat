"use client";
import React, { useEffect, useState } from "react";

const Error: React.FC<{ text: String; setText: (x: string) => void }> = ({
  text,
  setText,
}) => {
  //   const [update, setupdate] = useState(0);
  //   useEffect(() => {
  //     return () => {};
  //   }, [update]);
  if (text == "") return <></>;
  return (
    <div className=" absolute top-0 w-screen h-screen z-40 flex justify-center items-center backdrop-blur-lg">
      <div className="w-[20%] p-5 m-auto rounded-md min-h-20 dark:bg-gray-700 bg-white">
        <div className="text-xl text-red-500">{text}</div>
        <div
          onClick={() => {
            setText("");
          }}
          className="text-white bg-red-700 rounded-md ml-[80%] px-5 py-2"
        >
          Ok
        </div>
      </div>
    </div>
  );
};

export default Error;
