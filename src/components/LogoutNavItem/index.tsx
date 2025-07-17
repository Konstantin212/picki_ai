import { Dictionary } from '@/app/[lang]/dictionaries';
import { LogOut } from 'lucide-react';
import styles from './index.module.scss';

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
    <button onClick={handleLogout} className={`${styles.navItem} ${isMobile ? styles.mobile : ''}`}>
      <LogOut className="mr-2 h-4 w-4" />
      {dict.nav.logout}
    </button>
  );
};
