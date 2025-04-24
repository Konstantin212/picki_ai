import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export type QueryError = AxiosError<{
  message: string;
  code: string;
}>;

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

// Example usage:
// const { data, isLoading, error } = useApiQuery(
//   ['users'],
//   () => api.get('/users').then(res => res.data),
//   {
//     staleTime: 1000 * 60 * 5, // 5 minutes
//   }
// );
