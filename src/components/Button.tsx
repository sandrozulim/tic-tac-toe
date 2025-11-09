import type { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export function Button({ className, children, ...props }: ButtonProps) {
  return (
    <button
      className={twMerge(
        "bg-black text-white w-full px-4 py-2 rounded-lg hover:cursor-pointer hover:bg-neutral-800 active:bg-neutral-900 transition-colors disabled:bg-neutral-400 disabled:cursor-default disabled:pointer-events-none",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
