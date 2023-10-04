import { ComponentPropsWithoutRef, LegacyRef, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  error?: boolean;
  errorMessage?: string;
}

function Input(
  { className, error, errorMessage, ...props }: InputProps,
  ref: LegacyRef<HTMLInputElement> | undefined
) {
  const inputClassName = twMerge(
    "rounded-lg border border-gray-300 bg-white p-2 text-sm font-normal text-primaryHotefy-darker placeholder-black placeholder-opacity-20 outline-none transition-all",
    error ? "border-red-400" : "focus:ring-1 focus:ring-secondary",
    className
  );

  return (
    <div className="flex w-full flex-col">
      <input ref={ref} className={inputClassName} {...props} />
      {error && errorMessage && (
        <span className="mt-2 text-xs font-medium text-red-400 dark:text-red-300 flex justify-start">{errorMessage}</span>
      )}
    </div>
  );
}

export default forwardRef(Input);
