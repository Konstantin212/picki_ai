import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface LoginNavItemProps {
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
  onItemClick?: () => void;
}

export const LoginNavItem = ({ dict, isMobile = false, onItemClick }: LoginNavItemProps) => {
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1];
  const loginPath = `/${currentLocale}/login`;

  const handleClick = () => {
    if (onItemClick) {
      onItemClick();
    }
  };

  return (
    <Link
      href={loginPath}
      onClick={handleClick}
      className={`block px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:text-white ${
        isMobile ? 'border-b border-gray-700' : ''
      }`}
    >
      {dict.nav.loginSignup}
    </Link>
  );
};
