import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';
import classes from './button.module.scss';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      fullWidth = false,
      asChild = false,
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

    const Component = asChild ? Slot : 'button';

    return (
      <Component
        className={cn(
          classes.baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && classes.fullWidth,
          disabled && classes.disabled,
          className
        )}
        ref={ref}
        disabled={!asChild ? disabled || isLoading : undefined}
        {...props}
      >
        {isLoading ? <span className={classes.loadingSpinner} /> : null}
        {children}
      </Component>
    );
  }
);

Button.displayName = 'Button';

export { Button };
