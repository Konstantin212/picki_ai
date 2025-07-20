import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'gradient' | 'gradient-outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
}

export const Button = ({
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  ...props
}: ButtonProps) => {
  const baseClasses = 'rounded-lg font-medium transition-all duration-200';

  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg',
    secondary: 'bg-gray-700 text-white hover:bg-gray-800 shadow-md hover:shadow-lg',
    ghost: 'bg-transparent text-blue-600 hover:bg-blue-50',
    outline: 'border border-gray-600 bg-transparent text-white hover:bg-gray-700 hover:text-white',
    gradient:
      'bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:from-blue-700 hover:to-purple-700 hover:shadow-xl',
    'gradient-outline':
      'border border-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-border text-white font-semibold shadow-lg hover:from-blue-700 hover:to-purple-700 hover:shadow-xl',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'h-14 px-8 text-lg font-semibold',
  };

  return (
    <button
      className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && (
        <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
      )}
      {children}
    </button>
  );
};
