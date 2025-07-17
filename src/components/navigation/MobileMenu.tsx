import { Session } from '@supabase/supabase-js';
import { NavItems } from './NavItems';
import { Dictionary } from '@/app/[lang]/dictionaries';

interface MobileMenuProps {
  isOpen: boolean;
  dict: Dictionary;
  session: Session | null;
  lang: string;
  onToggle: () => void;
  onLogout: () => Promise<void>;
}

export const MobileMenu = ({
  isOpen,
  dict,
  session,
  lang,
  onToggle,
  onLogout,
}: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden">
      <div className="space-y-1 bg-gray-800 px-2 pb-3 pt-2">
        <NavItems
          dict={dict}
          session={session}
          lang={lang}
          isMobile={true}
          onItemClick={onToggle}
          onLogout={onLogout}
        />
      </div>
    </div>
  );
};
