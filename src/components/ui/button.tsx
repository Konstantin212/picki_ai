import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';

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
    const baseStyles =
      'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';

    const variants = {
      primary:
        'bg-indigo-600 text-white hover:bg-indigo-500 hover:text-white focus-visible:outline-indigo-600',
      secondary:
        'bg-gray-200 text-gray-900 hover:bg-gray-300 hover:text-gray-900 focus-visible:outline-gray-600',
      outline:
        'border border-gray-300 bg-transparent text-gray-200 hover:bg-gray-700 hover:text-white focus-visible:outline-gray-600',
      ghost:
        'bg-transparent text-gray-200 hover:bg-gray-700 hover:text-white focus-visible:outline-gray-600',
      link: 'bg-transparent underline-offset-4 hover:underline focus-visible:outline-gray-600 text-indigo-600 hover:text-indigo-500',
    };

    const sizes = {
      sm: 'h-8 px-3 text-xs',
      md: 'h-10 px-4 text-sm',
      lg: 'h-12 px-6 text-base',
    };

    const Component = asChild ? Slot : 'button';

    return (
      <Component
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          disabled && 'cursor-not-allowed opacity-50',
          className
        )}
        ref={ref}
        disabled={!asChild ? disabled || isLoading : undefined}
        {...props}
      >
        {isLoading ? (
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {children}
      </Component>
    );
  }
);

Button.displayName = 'Button';

export { Button };
