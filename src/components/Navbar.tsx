'use client';

import { useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { Logo } from '@/components/navigation/Logo';
import { NavItems } from '@/components/navigation/NavItems';
import { MobileMenu, MobileMenuButton } from '@/components/navigation/MobileMenu';
import { useLogout } from '@/hooks/useLogout';

interface NavbarProps {
  session: Session | null;
}

export const Navbar = ({ session }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useLogout();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-900 shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <NavItems session={session} onLogout={logout} />
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <MobileMenuButton isOpen={isOpen} onToggle={toggleMenu} />
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <MobileMenu isOpen={isOpen} session={session} onToggle={toggleMenu} onLogout={logout} />
    </nav>
  );
};
