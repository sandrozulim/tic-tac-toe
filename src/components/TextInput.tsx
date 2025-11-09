import type { InputHTMLAttributes } from "react";

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export function TextInput({ label, id, ...props }: TextInputProps) {
  return (
    <div>
      <label className="text-gray-500 text-sm" htmlFor={id}>
        {label}
      </label>
      <input
        className="w-full px-4 py-2 rounded-lg border border-gray-300"
        id={id}
        {...props}
      />
    </div>
  );
}
