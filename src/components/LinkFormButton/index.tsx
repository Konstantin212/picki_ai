import { cn } from '@/lib/utils';
import styles from './index.module.scss';

interface LinkFormButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export const LinkFormButton = ({ children, className, ...props }: LinkFormButtonProps) => {
  return (
    <button className={cn(styles.linkButton, className)} {...props}>
      {children}
    </button>
  );
};
