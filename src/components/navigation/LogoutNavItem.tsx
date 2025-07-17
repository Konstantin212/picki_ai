import { Dictionary } from '@/app/[lang]/dictionaries';
import { LogOut } from 'lucide-react';

interface LogoutNavItemProps {
  dict: Dictionary;
  isMobile?: boolean;
  onItemClick?: (() => void) | undefined;
  onLogout: () => Promise<void>;
}

export const LogoutNavItem = ({
  dict,
  isMobile = false,
  onItemClick,
  onLogout,
}: LogoutNavItemProps) => {
  const handleLogout = async () => {
    if (onItemClick) {
      onItemClick();
    }
    await onLogout();
  };

  return (
    <button
      onClick={handleLogout}
      className={`flex w-full items-center px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:text-white ${
        isMobile ? 'border-b border-gray-700' : ''
      }`}
    >
      <LogOut className="mr-2 h-4 w-4" />
      {dict.nav.logout}
    </button>
  );
};
