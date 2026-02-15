import { forwardRef, type InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  hint?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, hint, className = "", id, ...props },
  ref
) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="font-body text-[13px] font-medium text-stone-700"
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={`
          w-full bg-white border rounded-lg px-4 py-3
          font-body text-[15px] text-charcoal placeholder:text-stone-400
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-offset-1
          disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-stone-50
          ${
            error
              ? "border-error focus:ring-error/30 focus:border-error"
              : "border-stone-200 focus:ring-terracotta/30 focus:border-terracotta"
          }
          ${className}
        `}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={
          error
            ? `${inputId}-error`
            : hint
              ? `${inputId}-hint`
              : undefined
        }
        {...props}
      />
      {error && (
        <p
          id={`${inputId}-error`}
          className="font-body text-[13px] text-error"
          role="alert"
        >
          {error}
        </p>
      )}
      {hint && !error && (
        <p
          id={`${inputId}-hint`}
          className="font-body text-[13px] text-stone-400"
        >
          {hint}
        </p>
      )}
    </div>
  );
});

export { Input };
export type { InputProps };
