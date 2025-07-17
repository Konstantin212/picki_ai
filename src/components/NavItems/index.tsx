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
  // If we have event handlers, we need to render client components
  const hasEventHandlers = onItemClick || onLogout;

  if (hasEventHandlers) {
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
  }

  // Server-side rendering without event handlers
  return (
    <>
      <ProfileNavItem dict={dict} isMobile={isMobile} />
      {session ? (
        <LogoutNavItem dict={dict} isMobile={isMobile} />
      ) : (
        <LoginNavItem dict={dict} isMobile={isMobile} lang={lang} />
      )}
    </>
  );
};
