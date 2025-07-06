import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export type MutationError = AxiosError<{
  message: string;
  code: string;
}>;

/**
 * Wrapper around TanStack Mutation for API data mutations
 * @param mutationFn - Function that performs the mutation
 * @param options - Additional mutation options
 * @returns Mutation result with loading state and error handling
 */
export function useApiMutation<TData = unknown, TVariables = void, TError = MutationError>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: Omit<UseMutationOptions<TData, TError, TVariables>, 'mutationFn'>
): UseMutationResult<TData, TError, TVariables> {
  return useMutation<TData, TError, TVariables>({
    mutationFn,
    ...options,
  });
}
