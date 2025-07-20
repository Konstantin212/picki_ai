import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { authApi } from '@/lib/api/auth';

// Query keys
export const authKeys = {
  all: ['auth'] as const,
  session: () => [...authKeys.all, 'session'] as const,
  user: () => [...authKeys.all, 'user'] as const,
};

// Session query hook
export function useSession() {
  return useQuery({
    queryKey: authKeys.session(),
    queryFn: authApi.getSession,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

// User query hook
export function useUser() {
  return useQuery({
    queryKey: authKeys.user(),
    queryFn: authApi.getUser,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Sign in mutation hook
export function useSignIn() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { toast } = useToast();

  return useMutation({
    mutationFn: authApi.signIn,
    onSuccess: (data) => {
      if (data.success) {
        // Invalidate and refetch session/user data
        queryClient.invalidateQueries({ queryKey: authKeys.session() });
        queryClient.invalidateQueries({ queryKey: authKeys.user() });

        // Show success message
        toast({
          title: 'Success',
          description: 'Successfully signed in!',
          variant: 'default',
        });

        // Redirect to home page
        router.refresh();
        router.push('/');
      } else {
        // Handle field errors - these will be handled by the component
        if (data.fieldErrors) {
          // Field errors are handled by the component, not here
          return;
        }

        // Show error message
        toast({
          title: 'Error',
          description: data.error || 'Authentication failed',
          variant: 'destructive',
        });
      }
    },
    onError: (error) => {
      console.error('Sign in error:', error);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    },
  });
}

// Sign up mutation hook
export function useSignUp() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { toast } = useToast();

  return useMutation({
    mutationFn: authApi.signUp,
    onSuccess: (data) => {
      if (data.success) {
        // Invalidate and refetch session/user data
        queryClient.invalidateQueries({ queryKey: authKeys.session() });
        queryClient.invalidateQueries({ queryKey: authKeys.user() });

        // Show success message
        toast({
          title: 'Success',
          description: 'Account created successfully!',
          variant: 'default',
        });

        // Redirect to home page
        router.refresh();
        router.push('/');
      } else {
        // Handle field errors - these will be handled by the component
        if (data.fieldErrors) {
          // Field errors are handled by the component, not here
          return;
        }

        // Show error message
        toast({
          title: 'Error',
          description: data.error || 'Authentication failed',
          variant: 'destructive',
        });
      }
    },
    onError: (error) => {
      console.error('Sign up error:', error);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    },
  });
}

// Sign out mutation hook
export function useSignOut() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { toast } = useToast();

  return useMutation({
    mutationFn: authApi.signOut,
    onSuccess: (data) => {
      if (data.success) {
        // Clear all auth-related queries
        queryClient.removeQueries({ queryKey: authKeys.all });

        // Get current pathname to determine redirect logic
        const currentPath = window.location.pathname;
        const isHomePage = currentPath === '/' || /^\/[a-z]{2}$/.test(currentPath);

        if (isHomePage) {
          // If on home page, refresh to update session state
          router.refresh();
        } else {
          // If on other page, redirect to home page
          router.push('/');
        }
      } else {
        toast({
          title: 'Error',
          description: data.error || 'Failed to log out. Please try again.',
          variant: 'destructive',
        });
      }
    },
    onError: (error) => {
      console.error('Sign out error:', error);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred during logout.',
        variant: 'destructive',
      });
    },
  });
}
