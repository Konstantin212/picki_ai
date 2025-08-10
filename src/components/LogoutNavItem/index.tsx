import { Dictionary } from '@/app/[lang]/dictionaries';
import { LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import styles from './index.module.scss';

interface LogoutNavItemProps {
  dict: Dictionary;
  isMobile?: boolean;
  onItemClick?: (() => void) | undefined;
  onLogout?: () => Promise<void>;
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
    if (onLogout) {
      await onLogout();
    }
  };

  // If we have event handlers, render with them
  if (onItemClick || onLogout) {
    return (
      <button onClick={handleLogout} className={cn(styles.navItem, isMobile && styles.mobile)}>
        <LogOut className="mr-2 h-4 w-4" />
        {dict.nav.logout}
      </button>
    );
  }

  // Otherwise, render without onClick handler for server-side rendering
  return (
    <button className={cn(styles.navItem, isMobile && styles.mobile)}>
      <LogOut className="mr-2 h-4 w-4" />
      {dict.nav.logout}
    </button>
  );
};
