/**
 * Format a number as currency using Intl.NumberFormat.
 *
 * @param value   – The numeric amount.
 * @param currency – ISO 4217 currency code (defaults to USD).
 */
export function formatCurrency(
  value: number,
  currency: string = "USD",
): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Merge class names, filtering out falsy values.
 */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Truncate a string to a given length, appending an ellipsis if it exceeds
 * the limit.
 *
 * @param str    – The input string.
 * @param length – Maximum character length (default 100).
 * @returns Truncated string with ellipsis, or the original if shorter.
 *
 * @example
 * truncate("A very long description here", 20)
 * // => "A very long descript\u2026"
 */
export function truncate(str: string, length: number = 100): string {
  if (!str) return "";
  if (str.length <= length) return str;
  return str.slice(0, length).trimEnd() + "\u2026";
}
