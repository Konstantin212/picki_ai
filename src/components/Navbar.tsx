'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Menu, X, User, LogOut, LogIn } from 'lucide-react';
import { Typography } from '@/components/ui/typography';
import { Session } from '@supabase/supabase-js';

export const Navbar = ({ session }: { session: Session | null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    const formData = new FormData();

    // Submit the form data to the server
    try {
      const response = await fetch('/auth/sign-out', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }

    toggleMenu();
  };

  return (
    <nav className="bg-gray-900 shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex flex-shrink-0 items-center">
              <Image
                src="/images/logo.svg"
                alt="Picki AI Logo"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <Typography variant="h5" color="primary" className="ml-3 hidden md:block">
                Picki AI
              </Typography>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {session ? (
              <>
                <Button variant="ghost" size="sm">
                  <Link href="/profile" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm">
                  <Link href="/profile" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </Button>
                <Button variant="primary" size="sm">
                  <Link href="/login" className="flex items-center">
                    <LogIn className="mr-2 h-4 w-4" />
                    Login / Signup
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            {session ? (
              <>
                <Link
                  href="/profile"
                  className="flex items-center rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700"
                  onClick={toggleMenu}
                >
                  <User className="mr-2 h-5 w-5" />
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700"
                >
                  <LogOut className="mr-2 h-5 w-5" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/profile"
                  className="flex items-center rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700"
                  onClick={toggleMenu}
                >
                  <User className="mr-2 h-5 w-5" />
                  Profile
                </Link>
                <Link
                  href="/login"
                  className="flex items-center rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700"
                  onClick={toggleMenu}
                >
                  <LogIn className="mr-2 h-5 w-5" />
                  Login / Signup
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
