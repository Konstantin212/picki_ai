'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Dictionary } from '@/app/[lang]/dictionaries';
import styles from './index.module.scss';

interface ProfileNavItemProps {
  dict: Dictionary;
  isMobile?: boolean;
  onItemClick?: (() => void) | undefined;
}

export const ProfileNavItem = ({ dict, isMobile = false, onItemClick }: ProfileNavItemProps) => {
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1];
  const profilePath = `/${currentLocale}/profile`;

  const handleClick = () => {
    if (onItemClick) {
      onItemClick();
    }
  };

  // If we have an onClick handler, render with it
  if (onItemClick) {
    return (
      <Link
        href={profilePath}
        onClick={handleClick}
        className={`${styles.navItem} ${isMobile ? styles.mobile : ''}`}
      >
        {dict.nav.profile}
      </Link>
    );
  }

  // Otherwise, render without onClick handler for server-side rendering
  return (
    <Link href={profilePath} className={`${styles.navItem} ${isMobile ? styles.mobile : ''}`}>
      {dict.nav.profile}
    </Link>
  );
};
