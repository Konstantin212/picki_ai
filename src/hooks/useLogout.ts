'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const useLogout = () => {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const logout = async () => {
    setIsLoggingOut(true);
    setError(null);

    const formData = new FormData();

    try {
      const response = await fetch('/auth/sign-out', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        router.refresh();
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Logout failed');
      }
    } catch (err) {
      console.error('Logout failed:', err);
      setError(err instanceof Error ? err : new Error('Unknown error during logout'));
    } finally {
      setIsLoggingOut(false);
    }
  };

  return {
    logout,
    isLoggingOut,
    error,
  };
};
