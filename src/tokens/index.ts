/**
 * Design tokens — typed mirror of the CSS variables defined in
 * `src/styles/globals.css`.
 *
 * The CSS custom properties (e.g. `--color-primary`) are the single source of
 * truth for styling: Tailwind derives its `bg-primary`, `text-muted`, etc.
 * utilities from them and raw `var(--color-*)` references also work.
 *
 * This object exposes the same values in a typed, programmatic form so
 * consumers can reference tokens from JavaScript/TypeScript (charts, inline
 * styles, tooling, documentation, and the Storybook "Design Tokens" page).
 */
export const tokens = {
  colors: {
    primary: '#2563eb',
    primaryHover: '#1d4ed8',
    primaryActive: '#1e40af',
    secondary: '#475569',
    destructive: '#dc2626',
    success: '#16a34a',
    warning: '#d97706',
    info: '#0284c7',
    background: '#ffffff',
    surface: '#f8fafc',
    foreground: '#0f172a',
    muted: '#64748b',
    border: '#e2e8f0',
    focusRing: '#93c5fd',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  radius: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    full: '9999px',
  },
  fontSizes: {
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  },
  transitions: {
    fast: '150ms',
    base: '200ms',
    slow: '300ms',
  },
} as const;

export type Tokens = typeof tokens;
