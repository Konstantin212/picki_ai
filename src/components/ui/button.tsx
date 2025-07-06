import * as React from 'react';
import { cn } from '@/lib/utils';
import classes from './button.module.scss';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      fullWidth = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const variants = {
      primary: classes.primary,
      secondary: classes.secondary,
      outline: classes.outline,
      ghost: classes.ghost,
      link: classes.link,
    };

    const sizes = {
      sm: classes.sm,
      md: classes.md,
      lg: classes.lg,
    };

    return (
      <button
        className={cn(
          classes.baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && classes.fullWidth,
          disabled && classes.disabled,
          className
        )}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? <span className={classes.loadingSpinner} /> : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
