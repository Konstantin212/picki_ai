import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface ProfileNavItemProps {
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

  return (
    <Link
      href={profilePath}
      onClick={handleClick}
      className={`block px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:text-white ${
        isMobile ? 'border-b border-gray-700' : ''
      }`}
    >
      {dict.nav.profile}
    </Link>
  );
};
