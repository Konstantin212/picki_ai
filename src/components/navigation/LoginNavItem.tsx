import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
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
      <Typography component="span" tKey="nav.loginSignup" />
    </Link>
  ) : (
    <Link href="/login" className="flex items-center">
      <Button variant="primary" size="sm">
        <LogIn className="mr-2 h-4 w-4" />
        <Typography component="span" tKey="nav.loginSignup" />
      </Button>
    </Link>
  );
};
