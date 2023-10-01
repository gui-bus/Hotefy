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
        locale="pt-BR"
        wrapperClassName="w-full"
        className={datePickerClassName}
        enableTabLoop={false}
        {...props}
      />
      {error && errorMessage && (
        <div className="mt-1 text-xs text-red-400 flex justify-start">{errorMessage}</div>
      )}
    </div>
  );
}

export default forwardRef(DatePicker);
