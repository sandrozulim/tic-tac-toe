import { twMerge } from "tailwind-merge";

type ErrorMessageProps = {
  className?: string;
  message: string;
};

export function ErrorMessage({ className, message }: ErrorMessageProps) {
  return (
    <p className={twMerge("mt-4 text-red-600 text-center", className)}>
      {message}
    </p>
  );
}
