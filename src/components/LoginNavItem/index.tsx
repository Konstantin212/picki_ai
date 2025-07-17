import { LogIn } from 'lucide-react';
import Link from 'next/link';
import { Dictionary } from '@/app/[lang]/dictionaries';
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

  return (
    <Link
      href={`/${lang}/login`}
      onClick={handleClick}
      className={`${styles.navItem} ${isMobile ? styles.mobile : ''}`}
    >
      <LogIn className="mr-2 h-4 w-4" />
      {dict.nav.loginSignup}
    </Link>
  );
};
