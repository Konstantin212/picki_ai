import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import classes from './LogoutNavItem.module.scss';

interface LogoutNavItemProps {
  isMobile?: boolean;
  onItemClick?: (() => void) | undefined;
  onLogout: () => Promise<void>;
}

export const LogoutNavItem = ({ isMobile, onItemClick, onLogout }: LogoutNavItemProps) => {
  const handleClick = async () => {
    await onLogout();
    if (onItemClick) {
      onItemClick();
    }
  };

  return isMobile ? (
    <button onClick={handleClick} className={classes.mobileButton}>
      <LogOut className="mr-2 h-5 w-5" />
      Logout
    </button>
  ) : (
    <Button variant="outline" size="sm" onClick={onLogout} className="flex items-center">
      <LogOut className="mr-2 h-4 w-4" />
      Logout
    </Button>
  );
};
