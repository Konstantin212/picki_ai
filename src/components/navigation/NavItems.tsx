import { Session } from '@supabase/supabase-js';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ProfileNavItem } from './ProfileNavItem';
import { LogoutNavItem } from './LogoutNavItem';
import { LoginNavItem } from './LoginNavItem';

interface NavItemsProps {
  session: Session | null;
  isMobile?: boolean;
  onItemClick?: () => void;
  onLogout: () => Promise<void>;
}

export const NavItems = ({ session, isMobile = false, onItemClick, onLogout }: NavItemsProps) => {
  return (
    <>
      <LanguageSwitcher isMobile={isMobile} />
      <ProfileNavItem isMobile={isMobile} onItemClick={onItemClick} />
      {session ? (
        <LogoutNavItem isMobile={isMobile} onItemClick={onItemClick} onLogout={onLogout} />
      ) : (
        <LoginNavItem isMobile={isMobile} onItemClick={onItemClick} />
      )}
    </>
  );
};
