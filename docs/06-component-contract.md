# 06 — Component Contracts

This is the canonical API contract for each component. Note: this is a **component
API** contract, not a REST API. Every prop is typed and JSDoc'd in source.

## Button

```ts
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;   // default 'primary'
  size?: ButtonSize;         // default 'md'
  loading?: boolean;         // spinner + aria-busy + disabled
  fullWidth?: boolean;
}
```

States: default, hover, focus-visible, active, disabled, loading.

## Input

```ts
interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  helperText?: string;
  error?: string;            // non-empty => error state + aria-invalid
  fullWidth?: boolean;
}
```

Label is associated via generated `id`/`htmlFor`; errors wire `aria-describedby`.

## Select

```ts
interface SelectOption { value: string; label: string; disabled?: boolean }
interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  label?: string;
  helperText?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;       // disabled placeholder option
}
```

## Modal

```ts
type ModalSize = 'sm' | 'md' | 'lg';
interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  size?: ModalSize;              // default 'md'
  closeOnOverlayClick?: boolean; // default true
  closeOnEscape?: boolean;       // default true
  showCloseButton?: boolean;     // default true
  footer?: React.ReactNode;
  children: React.ReactNode;
}
```

Guarantees: portal to `document.body`; focus trapped and moved inside on open; focus
returned to trigger on close; Escape/overlay close (when enabled); body scroll lock;
`role="dialog"` + `aria-modal` + `aria-labelledby`/`aria-label`; accessible close button.

## Table

```ts
type TableAlign = 'left' | 'center' | 'right';
interface TableColumn<T> {
  key: string;
  header: string;
  align?: TableAlign;
  render?: (row: T) => React.ReactNode;
}
interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  striped?: boolean;       // default false
  hoverable?: boolean;     // default false
  loading?: boolean;       // skeleton rows
  emptyMessage?: string;   // default 'No data'
}
```

Semantic `<table>/<thead>/<tbody>`, `<th scope="col">`, empty + loading states.

## Toast

```ts
type ToastVariant = 'success' | 'error' | 'info' | 'warning';
interface ToastOptions {
  variant?: ToastVariant;   // default 'info'
  title?: string;
  message: string;
  duration?: number;        // ms, default 5000; 0 = persistent
}
```

Exports: `ToastProvider`, `useToast()` → `{ toast, success, error, info, warning,
dismiss }`, and `ToastViewport`. Toasts auto-dismiss, are manually dismissible, use
`role="status"`/`aria-live="polite"`, and appear top-right by default.

## Card

```ts
type CardPadding = 'none' | 'sm' | 'md' | 'lg';
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: CardPadding;    // default 'md'
}
```

Composed via static subcomponents: `Card.Header`, `Card.Content`, `Card.Footer`.

## Badge

```ts
type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
type BadgeSize = 'sm' | 'md' | 'lg';
interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;   // default 'default'
  size?: BadgeSize;         // default 'md'
  dot?: boolean;            // status dot + sr-only status text
}
```
