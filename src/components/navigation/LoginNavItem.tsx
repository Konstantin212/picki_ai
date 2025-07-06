import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';
import { MouseEventHandler } from 'react';
import classes from './LoginNavItem.module.scss';

interface LoginNavItemProps {
  isMobile?: boolean;
  onItemClick?: (() => void) | undefined;
}

export const LoginNavItem = ({ isMobile, onItemClick }: LoginNavItemProps) => {
  const handleClick: MouseEventHandler<HTMLAnchorElement> = () => {
    if (onItemClick) onItemClick();
  };

  return isMobile ? (
    <Link href="/login" className={classes.mobileLink} onClick={handleClick}>
      <LogIn className="mr-2 h-5 w-5" />
      Login / Signup
    </Link>
  ) : (
    <Button variant="primary" size="sm">
      <Link href="/login" className="flex items-center">
        <LogIn className="mr-2 h-4 w-4" />
        Login / Signup
      </Link>
    </Button>
  );
};
