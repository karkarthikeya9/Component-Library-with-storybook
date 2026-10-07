/**
 * Tiny className combiner.
 *
 * Joins truthy class segments with a single space and drops any `false`,
 * `null`, or `undefined` values. Kept dependency-free to avoid pulling in a
 * utility library for a single helper.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}
