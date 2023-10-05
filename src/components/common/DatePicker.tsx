import { LegacyRef, forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import _DatePicker, {
  ReactDatePickerProps,
  registerLocale,
} from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";

import "react-datepicker/dist/react-datepicker.css";

registerLocale("pt-BR", ptBR);

interface InputProps extends ReactDatePickerProps {
  error?: boolean;
  errorMessage?: string;
}

function DatePicker(
  { className, error, errorMessage, ...props }: InputProps,
  ref: LegacyRef<HTMLInputElement> | undefined
) {
  const datePickerClassName = twMerge(
    "rounded-lg border border-gray-300 bg-white p-2 text-sm font-normal text-primaryHotefy-darker placeholder-black placeholder-opacity-20 outline-none transition-all focus:ring-1 focus:ring-secondary",
    error ? "border-red-400" : "",
    className
  );

  return (
    <div className="flex w-full flex-col">
      <_DatePicker
        withPortal
        showPopperArrow={false}
        locale="pt-BR"
        wrapperClassName="w-full"
        className={datePickerClassName}
        enableTabLoop={false}
        dateFormat="dd/MM/yyyy"
        autoComplete="off"
        {...props}
      />
      {error && errorMessage && (
        <div className="mt-2 font-medium text-xs text-red-400 dark:text-red-300 flex justify-start">
          {errorMessage}
        </div>
      )}
    </div>
  );
}

export default forwardRef(DatePicker);
