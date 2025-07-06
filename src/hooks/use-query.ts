import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export type QueryError = AxiosError<{
  message: string;
  code: string;
}>;

/**
 * Wrapper around TanStack Query for consistent API data fetching
 * @param key - Query key array for caching
 * @param queryFn - Function that returns a promise with the data
 * @param options - Additional query options
 * @returns Query result with data, loading state, and error handling
 */
export function useApiQuery<TData = unknown, TError = QueryError>(
  key: string[],
  queryFn: () => Promise<TData>,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>
): UseQueryResult<TData, TError> {
  return useQuery<TData, TError>({
    queryKey: key,
    queryFn,
    ...options,
  });
}
