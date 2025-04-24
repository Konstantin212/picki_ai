import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export type MutationError = AxiosError<{
  message: string;
  code: string;
}>;

export function useApiMutation<TData = unknown, TVariables = void, TError = MutationError>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: Omit<UseMutationOptions<TData, TError, TVariables>, 'mutationFn'>
): UseMutationResult<TData, TError, TVariables> {
  return useMutation<TData, TError, TVariables>({
    mutationFn,
    ...options,
  });
}

// Example usage:
// const { mutate, isLoading, error } = useApiMutation(
//   (data) => api.post('/users', data).then(res => res.data),
//   {
//     onSuccess: () => {
//       queryClient.invalidateQueries(['users']);
//     },
//   }
// );
