import { forwardRef, type TextareaHTMLAttributes } from "react";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
  hint?: string;
};

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ label, error, hint, className = "", id, ...props }, ref) {
    const textareaId =
      id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="font-body text-[13px] font-medium text-stone-700"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={`
            w-full bg-white border rounded-lg px-4 py-3
            font-body text-[15px] text-charcoal placeholder:text-stone-400
            transition-all duration-200 resize-vertical min-h-[120px]
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
              ? `${textareaId}-error`
              : hint
                ? `${textareaId}-hint`
                : undefined
          }
          {...props}
        />
        {error && (
          <p
            id={`${textareaId}-error`}
            className="font-body text-[13px] text-error"
            role="alert"
          >
            {error}
          </p>
        )}
        {hint && !error && (
          <p
            id={`${textareaId}-hint`}
            className="font-body text-[13px] text-stone-400"
          >
            {hint}
          </p>
        )}
      </div>
    );
  }
);

export { Textarea };
export type { TextareaProps };
