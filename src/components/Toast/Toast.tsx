import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { cn } from '../../utils/cn';

export type ToastVariant = 'success' | 'error' | 'info' | 'warning';

export interface ToastOptions {
  /** Visual variant. @default 'info' */
  variant?: ToastVariant;
  /** Optional title line. */
  title?: string;
  /** Main message text (required). */
  message: string;
  /** Auto-dismiss delay in milliseconds. `0` means persistent. @default 5000 */
  duration?: number;
}

interface ToastItem {
  id: string;
  variant: ToastVariant;
  title?: string;
  message: string;
  duration: number;
}

export interface ToastContextValue {
  /** Show a toast. Accepts a `ToastOptions` object or a plain message string. Returns its id. */
  toast: (options: ToastOptions | string) => string;
  /** Show a success toast. */
  success: (message: string, options?: Omit<ToastOptions, 'message' | 'variant'>) => string;
  /** Show an error toast. */
  error: (message: string, options?: Omit<ToastOptions, 'message' | 'variant'>) => string;
  /** Show an info toast. */
  info: (message: string, options?: Omit<ToastOptions, 'message' | 'variant'>) => string;
  /** Show a warning toast. */
  warning: (message: string, options?: Omit<ToastOptions, 'message' | 'variant'>) => string;
  /** Dismiss a toast by id. */
  dismiss: (id: string) => void;
}

interface ToastInternalState {
  toasts: ToastItem[];
  add: (options: ToastOptions) => string;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastInternalState | null>(null);

let counter = 0;
function generateId(): string {
  counter += 1;
  return `toast-${counter}-${Date.now().toString(36)}`;
}

const DEFAULT_DURATION = 5000;

export interface ToastProviderProps {
  children: ReactNode;
}

/**
 * Provides toast state and actions to descendants. Wrap your application with
 * `<ToastProvider>` and render `<ToastViewport />` to display toasts.
 */
export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
  }, []);

  const add = useCallback(
    (options: ToastOptions): string => {
      const id = generateId();
      const item: ToastItem = {
        id,
        variant: options.variant ?? 'info',
        title: options.title,
        message: options.message,
        duration: options.duration ?? DEFAULT_DURATION,
      };
      setToasts((prev) => [...prev, item]);
      if (item.duration > 0) {
        const timer = setTimeout(() => dismiss(id), item.duration);
        timersRef.current.set(id, timer);
      }
      return id;
    },
    [dismiss],
  );

  const value = useMemo<ToastInternalState>(
    () => ({ toasts, add, dismiss }),
    [toasts, add, dismiss],
  );

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

function useToastInternal(): ToastInternalState {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a <ToastProvider>.');
  }
  return context;
}

/**
 * Hook that returns toast actions. Must be used within a `<ToastProvider>`.
 */
export function useToast(): ToastContextValue {
  const { add, dismiss } = useToastInternal();
  return useMemo<ToastContextValue>(
    () => ({
      toast: (options) => {
        const normalized = typeof options === 'string' ? { message: options } : options;
        return add(normalized);
      },
      success: (message, options) => add({ ...options, message, variant: 'success' }),
      error: (message, options) => add({ ...options, message, variant: 'error' }),
      info: (message, options) => add({ ...options, message, variant: 'info' }),
      warning: (message, options) => add({ ...options, message, variant: 'warning' }),
      dismiss,
    }),
    [add, dismiss],
  );
}

function ToastIcon({ variant }: { variant: ToastVariant }) {
  if (variant === 'success') {
    return (
      <svg className="h-5 w-5 text-success" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path
          fillRule="evenodd"
          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
          clipRule="evenodd"
        />
      </svg>
    );
  }
  if (variant === 'error') {
    return (
      <svg className="h-5 w-5 text-destructive" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
          clipRule="evenodd"
        />
      </svg>
    );
  }
  if (variant === 'warning') {
    return (
      <svg className="h-5 w-5 text-warning" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path
          fillRule="evenodd"
          d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 9a1 1 0 100-2 1 1 0 000 2z"
          clipRule="evenodd"
        />
      </svg>
    );
  }
  return (
    <svg className="h-5 w-5 text-info" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
        clipRule="evenodd"
      />
    </svg>
  );
}

const variantBorder: Record<ToastVariant, string> = {
  success: 'border-l-success',
  error: 'border-l-destructive',
  info: 'border-l-info',
  warning: 'border-l-warning',
};

function ToastCard({ toast, onDismiss }: { toast: ToastItem; onDismiss: (id: string) => void }) {
  return (
    <div
      role="status"
      className={cn(
        'pointer-events-auto flex items-start gap-3 rounded-md border border-l-4 border-border bg-background p-3 shadow-md',
        variantBorder[toast.variant],
      )}
    >
      <span aria-hidden="true">
        <ToastIcon variant={toast.variant} />
      </span>
      <div className="min-w-0 flex-1">
        {toast.title && <div className="text-sm font-semibold text-foreground">{toast.title}</div>}
        <div className="text-sm text-foreground">{toast.message}</div>
      </div>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss notification"
        className="rounded-md p-1 text-muted transition-colors hover:bg-surface hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
      >
        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
        </svg>
      </button>
    </div>
  );
}

export interface ToastViewportProps {
  /** Additional classes merged onto the fixed container. */
  className?: string;
}

/**
 * Fixed, top-right container that renders the active toasts. Must be rendered
 * inside a `<ToastProvider>`.
 */
export function ToastViewport({ className }: ToastViewportProps) {
  const { toasts, dismiss } = useToastInternal();
  return (
    <div
      className={cn(
        'pointer-events-none fixed right-4 top-4 z-[100] flex w-full max-w-sm flex-col gap-2',
        className,
      )}
      aria-live="polite"
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <ToastCard key={toast.id} toast={toast} onDismiss={dismiss} />
      ))}
    </div>
  );
}
