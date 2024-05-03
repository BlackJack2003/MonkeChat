import React from "react";

interface ErrorProps {
  errVal: string | string[];
}

const ErrorBox: React.FC<ErrorProps> = ({ errVal }) => {
  if (errVal == "") return <></>;
  return (
    <div
      className="w-full rounded-xl mx-4 bg-blue-100 border-t border-b border-red-500 text-red-700 px-4 py-3"
      role="alert"
    >
      <p className="font-bold">Error</p>
      <p className="text-sm">{errVal as string}</p>
    </div>
  );
};

export default ErrorBox;
