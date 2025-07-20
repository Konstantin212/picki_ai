'use client';

import { QueryProvider } from './query-provider';
import { Toaster } from '@/components/ui/Toaster';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryProvider>
      {children}
      <Toaster />
    </QueryProvider>
  );
}
