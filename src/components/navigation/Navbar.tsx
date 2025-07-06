'use client';

import { Session } from '@supabase/supabase-js';
import { Logo } from './Logo';
import { NavItems } from './NavItems';
import { LanguageSwitcher } from './LanguageSwitcher';

interface NavbarProps {
  dict: {
    nav: {
      loginSignup: string;
      profile: string;
      logout: string;
      settings: string;
      dashboard: string;
      menu: string;
      closeMenu: string;
      openMenu: string;
    };
  };
  session?: Session | null;
}

export const Navbar = ({ dict, session }: NavbarProps) => {
  return (
    <nav className="flex h-16 items-center justify-between bg-gray-900 px-6 shadow-lg">
      <Logo />
      <NavItems dict={dict} session={session ?? null} />
      <LanguageSwitcher />
    </nav>
  );
};
