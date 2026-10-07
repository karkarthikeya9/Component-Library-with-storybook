import { forwardRef, useId } from 'react';
import { cn } from '../../utils/cn';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Label text rendered above the input and associated via `htmlFor`/`id`. */
  label?: string;
  /** Helper text rendered below the input. */
  helperText?: string;
  /** Error message. A non-empty string renders the error state and sets `aria-invalid`. */
  error?: string;
  /** When true, the input stretches to fill its container width. @default false */
  fullWidth?: boolean;
}

/**
 * A labeled text input with helper text and error messaging. Associates the
 * label with the control via a generated `id`, wires `aria-describedby`, and
 * exposes `aria-invalid` when an error is present.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, helperText, error, fullWidth = false, className, id: idProp, required, ...rest },
  ref,
) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const describedBy = error ? `${id}-error` : helperText ? `${id}-helper` : undefined;

  return (
    <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full')}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-foreground">
          {label}
          {required && (
            <span className="text-destructive" aria-hidden="true">
              {' '}
              *
            </span>
          )}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cn(
          'h-10 rounded-md border bg-background px-3 text-md text-foreground placeholder:text-muted transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-focus-ring focus:border-primary disabled:cursor-not-allowed disabled:opacity-50',
          error
            ? 'border-destructive focus:border-destructive focus:ring-destructive/30'
            : 'border-border',
          fullWidth && 'w-full',
          className,
        )}
        {...rest}
      />
      {error ? (
        <p id={`${id}-error`} className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : helperText ? (
        <p id={`${id}-helper`} className="text-sm text-muted">
          {helperText}
        </p>
      ) : null}
    </div>
  );
});
