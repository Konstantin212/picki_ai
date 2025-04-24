import { Menu, X } from 'lucide-react';
import { Session } from '@supabase/supabase-js';
import { NavItems } from './NavItems';

type MobileMenuProps = {
  isOpen: boolean;
  session: Session | null;
  onToggle: () => void;
  onLogout: () => Promise<void>;
};

export const MobileMenuButton = ({
  isOpen,
  onToggle,
}: {
  isOpen: boolean;
  onToggle: () => void;
}) => {
  return (
    <button
      onClick={onToggle}
      className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
    >
      <span className="sr-only">Open main menu</span>
      {isOpen ? (
        <X className="block h-6 w-6" aria-hidden="true" />
      ) : (
        <Menu className="block h-6 w-6" aria-hidden="true" />
      )}
    </button>
  );
};

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
