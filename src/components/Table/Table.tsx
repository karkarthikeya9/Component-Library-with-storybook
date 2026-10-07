import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

export type TableAlign = 'left' | 'center' | 'right';

export interface TableColumn<T> {
  /** Unique key for the column; also used to read the default cell value from the row. */
  key: string;
  /** Header label rendered in the `<thead>`. */
  header: string;
  /** Horizontal alignment of the column. @default 'left' */
  align?: TableAlign;
  /** Optional custom render function for the cell. */
  render?: (row: T) => ReactNode;
}

export interface TableProps<T> {
  /** Column definitions. */
  columns: TableColumn<T>[];
  /** Row data. */
  data: T[];
  /** Adds alternating row background. @default false */
  striped?: boolean;
  /** Highlights rows on hover. @default false */
  hoverable?: boolean;
  /** Shows loading skeleton rows. @default false */
  loading?: boolean;
  /** Message shown when there is no data. @default 'No data' */
  emptyMessage?: string;
}

const alignClasses: Record<TableAlign, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

function LoadingRows({ columns }: { columns: number }) {
  return (
    <>
      {Array.from({ length: 3 }).map((_, rowIndex) => (
        <tr key={rowIndex} aria-hidden="true" className="border-b border-border last:border-0">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <td key={colIndex} className="px-4 py-3">
              <div
                className="h-3 animate-pulse rounded bg-border"
                style={{ width: `${55 + ((rowIndex + colIndex) % 5) * 9}%` }}
              />
            </td>
          ))}
        </tr>
      ))}
      <tr className="sr-only">
        <td colSpan={columns}>Loading</td>
      </tr>
    </>
  );
}

/**
 * A generic, semantic data table with loading and empty states.
 *
 * Use the `render` callback on a column for custom cell markup; otherwise the
 * cell value is read from `row[key]`.
 */
export function Table<T>({
  columns,
  data,
  striped = false,
  hoverable = false,
  loading = false,
  emptyMessage = 'No data',
}: TableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-md border border-border bg-background">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-border bg-surface">
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                className={cn(
                  'px-4 py-3 text-sm font-semibold text-foreground',
                  alignClasses[col.align ?? 'left'],
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <LoadingRows columns={columns.length} />
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8 text-center text-muted">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={cn(
                  'border-b border-border last:border-0',
                  striped && rowIndex % 2 === 1 && 'bg-surface',
                  hoverable && 'transition-colors hover:bg-surface',
                )}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={cn('px-4 py-3 text-foreground', alignClasses[col.align ?? 'left'])}
                  >
                    {col.render
                      ? col.render(row)
                      : ((row as Record<string, ReactNode>)[col.key] ?? null)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
