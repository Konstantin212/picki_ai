import { LogIn } from 'lucide-react';
import Link from 'next/link';
import { Dictionary } from '@/app/[lang]/dictionaries';
import { cn } from '@/lib/utils';
import styles from './index.module.scss';

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

  // If we have an onClick handler, render with it
  if (onItemClick) {
    return (
      <Link
        href={`/${lang}/login`}
        onClick={handleClick}
        className={cn(styles.navItem, isMobile && styles.mobile)}
      >
        <LogIn className="mr-2 h-4 w-4" />
        {dict.nav.loginSignup}
      </Link>
    );
  }

  // Otherwise, render without onClick handler for server-side rendering
  return (
    <Link href={`/${lang}/login`} className={cn(styles.navItem, isMobile && styles.mobile)}>
      <LogIn className="mr-2 h-4 w-4" />
      {dict.nav.loginSignup}
    </Link>
  );
};
