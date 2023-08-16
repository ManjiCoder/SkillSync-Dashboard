import React from "react";

type ErrorProps = {
  error: string | undefined;
};
export default function ErrorMessage({ error }: ErrorProps) {
  return (
    <div
      className={`mt-1 ${
        error ? "max-sm:-mb-[22px] -mb-6" : "mb-0 mt-0"
      } text-right`}
    >
      <p className="font-medium max-sm:text-xs text-sm  text-red-600 text-right w-full">
        {error}
      </p>
    </div>
  );
}
