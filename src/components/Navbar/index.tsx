'use client';

import { Session } from '@supabase/supabase-js';
import { Logo } from '@/components/Logo';
import { NavItems } from '@/components/NavItems';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Dictionary } from '@/app/[lang]/dictionaries';
import { useSignOut } from '@/hooks/use-auth';

interface NavbarProps {
  dict: Dictionary;
  session?: Session | null;
  lang: string;
  showNavItems?: boolean;
}

export const Navbar = ({ dict, session, lang, showNavItems = true }: NavbarProps) => {
  const signOutMutation = useSignOut();

  const handleLogout = async () => {
    signOutMutation.mutate();
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
