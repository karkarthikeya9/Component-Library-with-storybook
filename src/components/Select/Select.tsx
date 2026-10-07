import { forwardRef, useId } from 'react';
import { cn } from '../../utils/cn';

export interface SelectOption {
  /** Underlying value submitted/emitted on change. */
  value: string;
  /** Human-readable label shown to the user. */
  label: string;
  /** Whether the option is disabled. */
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  /** Label text rendered above the select and associated via `htmlFor`/`id`. */
  label?: string;
  /** Helper text rendered below the select. */
  helperText?: string;
  /** Error message. A non-empty string renders the error state and sets `aria-invalid`. */
  error?: string;
  /** The list of options to render. */
  options: SelectOption[];
  /** Renders a disabled, non-selectable placeholder option. */
  placeholder?: string;
}

/**
 * A labeled `<select>` with a custom chevron, helper text, error messaging,
 * and an optional placeholder option. Spreads all native select attributes
 * except `children`.
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, helperText, error, options, placeholder, className, id: idProp, required, ...rest },
  ref,
) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const describedBy = error ? `${id}-error` : helperText ? `${id}-helper` : undefined;

  return (
    <div className="flex flex-col gap-1.5">
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
      <div className="relative">
        <select
          ref={ref}
          id={id}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(
            'h-10 w-full appearance-none rounded-md border bg-background px-3 pr-9 text-md text-foreground transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-focus-ring focus:border-primary disabled:cursor-not-allowed disabled:opacity-50',
            error
              ? 'border-destructive focus:border-destructive focus:ring-destructive/30'
              : 'border-border',
            className,
          )}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>
        <svg
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </div>
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
