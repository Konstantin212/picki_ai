'use client';

import { Session } from '@supabase/supabase-js';
import { Logo } from '@/components/Logo';
import { NavItems } from '@/components/NavItems';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Dictionary } from '@/app/[lang]/dictionaries';

interface NavbarProps {
  dict: Dictionary;
  session?: Session | null;
  lang: string;
  showNavItems?: boolean;
}

export const Navbar = ({ dict, session, lang, showNavItems = true }: NavbarProps) => {
  return (
    <nav className="relative z-50 flex h-16 items-center justify-between bg-gray-900 px-6 shadow-lg">
      <Logo />
      <div className="flex items-center gap-4">
        {showNavItems && <NavItems dict={dict} session={session ?? null} lang={lang} />}
        <LanguageSwitcher />
      </div>
    </nav>
  );
};
