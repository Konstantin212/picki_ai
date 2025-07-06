import { Menu, X } from 'lucide-react';
import classes from './MobileMenuButton.module.scss';

interface MobileMenuButtonProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const MobileMenuButton = ({ isOpen, onToggle }: MobileMenuButtonProps) => {
  return (
    <button onClick={onToggle} className={classes.button}>
      <span className="sr-only">Open main menu</span>
      {isOpen ? (
        <X className="block h-6 w-6" aria-hidden="true" />
      ) : (
        <Menu className="block h-6 w-6" aria-hidden="true" />
      )}
    </button>
  );
};
