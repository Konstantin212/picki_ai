import { cn } from '@/lib/utils';
import classes from './LinkFormButton.module.scss';

interface LinkFormButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export const LinkFormButton = ({ children, className, ...props }: LinkFormButtonProps) => {
  return (
    <button className={cn(classes.linkButton, className)} {...props}>
      {children}
    </button>
  );
};
