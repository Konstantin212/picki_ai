import { Session } from '@supabase/supabase-js';
import { ProfileNavItem } from '@/components/ProfileNavItem';
import { LogoutNavItem } from '@/components/LogoutNavItem';
import { LoginNavItem } from '@/components/LoginNavItem';
import { Dictionary } from '@/app/[lang]/dictionaries';

interface NavItemsProps {
  dict: Dictionary;
  session: Session | null;
  lang: string;
  isMobile?: boolean;
  onItemClick?: () => void;
  onLogout?: () => Promise<void>;
}

export const NavItems = ({
  dict,
  session,
  lang,
  isMobile = false,
  onItemClick,
  onLogout,
}: NavItemsProps) => {
  return (
    <>
      <ProfileNavItem dict={dict} isMobile={isMobile} onItemClick={onItemClick} />
      {session && onLogout ? (
        <LogoutNavItem
          dict={dict}
          isMobile={isMobile}
          onItemClick={onItemClick}
          onLogout={onLogout}
        />
      ) : (
        <LoginNavItem dict={dict} isMobile={isMobile} onItemClick={onItemClick} lang={lang} />
      )}
    </>
  );
};
