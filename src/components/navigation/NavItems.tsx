import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { User, LogOut, LogIn } from 'lucide-react';
import { Session } from '@supabase/supabase-js';
import { MouseEventHandler } from 'react';

type NavItemProps = {
  isMobile?: boolean;
  onItemClick?: (() => void) | undefined;
};

export const ProfileNavItem = ({ isMobile, onItemClick }: NavItemProps) => {
  const baseStyles = isMobile
    ? 'flex items-center rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700'
    : '';

  const handleClick: MouseEventHandler<HTMLAnchorElement> = () => {
    if (onItemClick) onItemClick();
  };

  return isMobile ? (
    <Link href="/profile" className={baseStyles} onClick={handleClick}>
      <User className="mr-2 h-5 w-5" />
      Profile
    </Link>
  ) : (
    <Button variant="ghost" size="sm">
      <Link href="/profile" className="flex items-center">
        <User className="mr-2 h-4 w-4" />
        Profile
      </Link>
    </Button>
  );
};

type LogoutNavItemProps = NavItemProps & {
  onLogout: () => Promise<void>;
};

export const LogoutNavItem = ({ isMobile, onItemClick, onLogout }: LogoutNavItemProps) => {
  const handleClick = async () => {
    await onLogout();
    if (onItemClick) {
      onItemClick();
    }
  };

  const baseStyles = isMobile
    ? 'flex w-full items-center rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700'
    : '';

  return isMobile ? (
    <button onClick={handleClick} className={baseStyles}>
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

export const LoginNavItem = ({ isMobile, onItemClick }: NavItemProps) => {
  const baseStyles = isMobile
    ? 'flex items-center rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700'
    : '';

  const handleClick: MouseEventHandler<HTMLAnchorElement> = () => {
    if (onItemClick) onItemClick();
  };

  return isMobile ? (
    <Link href="/login" className={baseStyles} onClick={handleClick}>
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

export const NavItems = ({
  session,
  isMobile = false,
  onItemClick,
  onLogout,
}: {
  session: Session | null;
  isMobile?: boolean;
  onItemClick?: () => void;
  onLogout: () => Promise<void>;
}) => {
  return (
    <>
      {session ? (
        <>
          <ProfileNavItem isMobile={isMobile} onItemClick={onItemClick} />
          <LogoutNavItem isMobile={isMobile} onItemClick={onItemClick} onLogout={onLogout} />
        </>
      ) : (
        <>
          <ProfileNavItem isMobile={isMobile} onItemClick={onItemClick} />
          <LoginNavItem isMobile={isMobile} onItemClick={onItemClick} />
        </>
      )}
    </>
  );
};
