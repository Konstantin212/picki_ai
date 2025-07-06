import { Session } from '@supabase/supabase-js';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ProfileNavItem } from './ProfileNavItem';
import { LogoutNavItem } from './LogoutNavItem';

interface NavItemsProps {
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
  session: Session | null;
  isMobile?: boolean;
  onItemClick?: () => void;
  onLogout?: () => Promise<void>;
}

export const NavItems = ({
  dict,
  session,
  isMobile = false,
  onItemClick,
  onLogout,
}: NavItemsProps) => {
  return (
    <>
      <LanguageSwitcher />
      <ProfileNavItem dict={dict} isMobile={isMobile} onItemClick={onItemClick} />
      {session && onLogout ? (
        <LogoutNavItem
          dict={dict}
          isMobile={isMobile}
          onItemClick={onItemClick}
          onLogout={onLogout}
        />
      ) : null}
    </>
  );
};
