import { Session } from '@supabase/supabase-js';
import { NavItems } from './NavItems';

interface MobileMenuProps {
  isOpen: boolean;
  session: Session | null;
  onToggle: () => void;
  onLogout: () => Promise<void>;
}

export const MobileMenu = ({ isOpen, session, onToggle, onLogout }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden">
      <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
        <NavItems session={session} isMobile={true} onItemClick={onToggle} onLogout={onLogout} />
      </div>
    </div>
  );
};
