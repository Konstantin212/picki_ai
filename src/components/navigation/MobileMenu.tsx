import { Session } from '@supabase/supabase-js';
import { NavItems } from './NavItems';

interface MobileMenuProps {
  isOpen: boolean;
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
  onToggle: () => void;
  onLogout: () => Promise<void>;
}

export const MobileMenu = ({ isOpen, dict, session, onToggle, onLogout }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden">
      <div className="space-y-1 bg-gray-800 px-2 pb-3 pt-2">
        <NavItems
          dict={dict}
          session={session}
          isMobile={true}
          onItemClick={onToggle}
          onLogout={onLogout}
        />
      </div>
    </div>
  );
};
