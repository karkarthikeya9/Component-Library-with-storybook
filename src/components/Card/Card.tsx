import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Inner padding of the card container. @default 'md' */
  padding?: CardPadding;
}

const paddingClasses: Record<CardPadding, string> = {
  none: 'p-0',
  sm: 'p-sm',
  md: 'p-md',
  lg: 'p-lg',
};

const CardRoot = forwardRef<HTMLDivElement, CardProps>(function Card(
  { padding = 'md', className, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        'rounded-lg border border-border bg-background text-foreground shadow-sm',
        paddingClasses[padding],
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
});

const CardHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function CardHeader({ className, children, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={cn('flex flex-col gap-1.5 border-b border-border p-4', className)}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

const CardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function CardContent({ className, children, ...rest }, ref) {
    return (
      <div ref={ref} className={cn('p-4', className)} {...rest}>
        {children}
      </div>
    );
  },
);

const CardFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function CardFooter({ className, children, ...rest }, ref) {
    return (
      <div ref={ref} className={cn('flex items-center gap-2 border-t border-border p-4', className)} {...rest}>
        {children}
      </div>
    );
  },
);

export type CardComponent = typeof CardRoot & {
  Header: typeof CardHeader;
  Content: typeof CardContent;
  Footer: typeof CardFooter;
};

/**
 * A simple card container, composable via static subcomponents:
 * `Card.Header`, `Card.Content`, and `Card.Footer`.
 *
 * The `padding` prop sets the padding of the root container. When composing a
 * structured card with `Card.Header`/`Content`/`Footer`, pass `padding="none"`
 * so the subcomponents' own padding applies and the header/footer borders run
 * edge to edge.
 */
export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Content: CardContent,
  Footer: CardFooter,
}) as CardComponent;
