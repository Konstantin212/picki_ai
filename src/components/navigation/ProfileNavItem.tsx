import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { User } from 'lucide-react';
import { MouseEventHandler } from 'react';
import classes from './ProfileNavItem.module.scss';

interface ProfileNavItemProps {
  isMobile?: boolean;
  onItemClick?: (() => void) | undefined;
}

export const ProfileNavItem = ({ isMobile, onItemClick }: ProfileNavItemProps) => {
  const handleClick: MouseEventHandler<HTMLAnchorElement> = () => {
    if (onItemClick) onItemClick();
  };

  return isMobile ? (
    <Link href="/profile" className={classes.mobileLink} onClick={handleClick}>
      <User className="mr-2 h-5 w-5" />
      <Typography component="span" tKey="nav.profile" />
    </Link>
  ) : (
    <Link href="/profile" className="flex items-center">
      <Button variant="ghost" size="sm">
        <User className="mr-2 h-4 w-4" />
        <Typography component="span" tKey="nav.profile" />
      </Button>
    </Link>
  );
};
