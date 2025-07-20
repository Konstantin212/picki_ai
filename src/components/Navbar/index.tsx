'use client';

import { Session } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/Logo';
import { NavItems } from '@/components/NavItems';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Dictionary } from '@/app/[lang]/dictionaries';
import { useToast } from '@/hooks/use-toast';

interface NavbarProps {
  dict: Dictionary;
  session?: Session | null;
  lang: string;
  showNavItems?: boolean;
}

export const Navbar = ({ dict, session, lang, showNavItems = true }: NavbarProps) => {
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      const response = await fetch('/auth/sign-out', {
        method: 'POST',
      });

      if (response.ok) {
        // Refresh the page to update session state
        router.refresh();
      } else {
        toast({
          title: 'Error',
          description: 'Failed to log out. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred during logout.',
        variant: 'destructive',
      });
    }
  };

  return (
    <nav className="relative z-50 flex h-16 items-center justify-between bg-gray-900 px-6 shadow-lg">
      <Logo />
      <div className="flex items-center gap-4">
        {showNavItems && (
          <NavItems dict={dict} session={session ?? null} lang={lang} onLogout={handleLogout} />
        )}
        <LanguageSwitcher />
      </div>
    </nav>
  );
};
