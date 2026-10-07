import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Visual variant. @default 'default' */
  variant?: BadgeVariant;
  /** Size of the badge. @default 'md' */
  size?: BadgeSize;
  /** Renders a status dot before the content. @default false */
  dot?: boolean;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'border border-border bg-surface text-foreground',
  primary: 'bg-primary text-white',
  success: 'bg-success text-white',
  warning: 'bg-warning text-white',
  error: 'bg-destructive text-white',
  info: 'bg-info text-white',
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-0.5 text-sm',
  lg: 'px-3 py-1 text-md',
};

const dotSizeClasses: Record<BadgeSize, string> = {
  sm: 'h-1.5 w-1.5',
  md: 'h-2 w-2',
  lg: 'h-2.5 w-2.5',
};

const dotColorClasses: Record<BadgeVariant, string> = {
  default: 'bg-muted',
  primary: 'bg-white',
  success: 'bg-white',
  warning: 'bg-white',
  error: 'bg-white',
  info: 'bg-white',
};

/**
 * A small status/label element rendered as a `<span>`. Optionally shows a
 * status dot with a visually-hidden description of the status.
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { variant = 'default', size = 'md', dot = false, className, children, ...rest },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-medium',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...rest}
    >
      {dot && (
        <>
          <span
            className={cn('rounded-full', dotSizeClasses[size], dotColorClasses[variant])}
            aria-hidden="true"
          />
          <span className="sr-only">{variant} status</span>
        </>
      )}
      {children}
    </span>
  );
});
