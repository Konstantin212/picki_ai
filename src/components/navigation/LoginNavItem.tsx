import { LogIn } from 'lucide-react';
import Link from 'next/link';
import { Dictionary } from '@/app/[lang]/dictionaries';

interface LoginNavItemProps {
  dict: Dictionary;
  isMobile?: boolean;
  onItemClick?: (() => void) | undefined;
  lang: string;
}

export const LoginNavItem = ({ dict, isMobile = false, onItemClick, lang }: LoginNavItemProps) => {
  const handleClick = () => {
    if (onItemClick) {
      onItemClick();
    }
  };

  return (
    <Link
      href={`/${lang}/login`}
      onClick={handleClick}
      className={`flex w-full items-center px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:text-white ${
        isMobile ? 'border-b border-gray-700' : ''
      }`}
    >
      <LogIn className="mr-2 h-4 w-4" />
      {dict.nav.loginSignup}
    </Link>
  );
};
