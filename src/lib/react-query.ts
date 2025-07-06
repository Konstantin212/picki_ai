import { QueryClient } from '@tanstack/react-query';

/**
 * Global React Query client instance with optimized default settings
 *
 * Default configuration:
 * - Stale time: 1 minute (data considered fresh for 1 minute)
 * - Garbage collection time: 5 minutes (unused data kept for 5 minutes)
 * - Retry attempts: 1 (retry failed requests once)
 * - Disable refetch on window focus for better UX
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      gcTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});
