import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS classes with proper conflict resolution
 *
 * @param inputs - Class values to merge
 * @returns Merged class string with conflicts resolved
 *
 * @example
 * ```typescript
 * const className = cn('text-red-500', 'text-blue-500'); // Returns 'text-blue-500'
 * ```
 */
export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs));
};

/**
 * Formats a date input into a readable string
 *
 * @param input - Date to format (string, number, or Date object)
 * @returns Formatted date string (e.g., "January 15, 2024")
 *
 * @example
 * ```typescript
 * const formatted = formatDate('2024-01-15'); // Returns "January 15, 2024"
 * ```
 */
export const formatDate = (input: string | number | Date): string => {
  const date = new Date(input);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

/**
 * Creates an absolute URL by prepending the app URL
 *
 * @param path - Relative path to append
 * @returns Complete absolute URL
 *
 * @example
 * ```typescript
 * const url = absoluteUrl('/api/users'); // Returns "https://app.com/api/users"
 * ```
 */
export const absoluteUrl = (path: string): string => {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
};

/**
 * Validates if a string is a valid URL
 *
 * @param url - URL string to validate
 * @returns True if valid URL, false otherwise
 *
 * @example
 * ```typescript
 * const isValid = isValidUrl('https://example.com'); // Returns true
 * ```
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
