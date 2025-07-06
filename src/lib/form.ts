import { zodResolver } from '@hookform/resolvers/zod';
import { useForm as useHookForm, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

/**
 * Custom hook that wraps react-hook-form with Zod validation
 *
 * @param schema - Zod schema for form validation
 * @returns Form instance with validation and error handling
 *
 * @example
 * ```typescript
 * const form = useForm(loginSchema);
 * ```
 */
export const useForm = <T extends z.ZodType>(schema: T): UseFormReturn<z.infer<T>> => {
  return useHookForm<z.infer<T>>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });
};
