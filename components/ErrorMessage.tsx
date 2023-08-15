import React from "react";

type ErrorProps = {
  error: string | undefined;
};
export default function ErrorMessage({ error }: ErrorProps) {
  return (
    <div className={`text-sm mt-1 ${error ? "-mb-6" : "mb-0 mt-0"} text-right`}>
      <p className="font-semibold text-red-600 text-right w-full">{error}</p>
    </div>
  );
}
