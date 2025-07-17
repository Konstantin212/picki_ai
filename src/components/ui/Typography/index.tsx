'use client';
import * as React from 'react';
import { cn } from '@/lib/utils';

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption' | 'overline';
  component?: React.ElementType;
  color?: 'default' | 'primary' | 'secondary' | 'error' | 'success' | 'muted';
  align?: 'left' | 'center' | 'right';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  truncate?: boolean;
  noWrap?: boolean;
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  (
    {
      className,
      variant = 'body1',
      component,
      color = 'default',
      align = 'left',
      weight,
      truncate = false,
      noWrap = false,
      children,
      ...props
    },
    ref
  ) => {
    // Map variants to appropriate HTML elements
    const componentMap: Record<string, React.ElementType> = {
      h1: 'h1',
      h2: 'h2',
      h3: 'h3',
      h4: 'h4',
      h5: 'h5',
      h6: 'h6',
      body1: 'p',
      body2: 'p',
      caption: 'span',
      overline: 'span',
    };

    // Default component based on variant
    const Component = component || componentMap[variant];

    // Base styles for all typography
    const baseStyles = 'font-sans';

    // Variant-specific styles
    const variants = {
      h1: 'text-4xl font-bold tracking-tight md:text-5xl',
      h2: 'text-3xl font-bold tracking-tight md:text-4xl',
      h3: 'text-2xl font-bold tracking-tight md:text-3xl',
      h4: 'text-xl font-semibold tracking-tight md:text-2xl',
      h5: 'text-lg font-semibold tracking-tight md:text-xl',
      h6: 'text-base font-semibold tracking-tight md:text-lg',
      body1: 'text-base leading-relaxed',
      body2: 'text-sm leading-relaxed',
      caption: 'text-xs leading-relaxed',
      overline: 'text-xs uppercase tracking-wider',
    };

    // Color variants
    const colors = {
      default: 'text-white',
      primary: 'text-indigo-500',
      secondary: 'text-gray-400',
      error: 'text-red-500',
      success: 'text-green-500',
      muted: 'text-gray-500',
    };

    // Font weight variants
    const weights = {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    };

    // Text alignment
    const alignments = {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    };

    // Use a div as fallback if Component is undefined
    const Element = Component || 'div';

    return (
      <Element
        ref={ref as React.Ref<HTMLElement>}
        className={cn(
          baseStyles,
          variants[variant],
          colors[color],
          weight && weights[weight],
          alignments[align],
          truncate && 'truncate',
          noWrap && 'whitespace-nowrap',
          className
        )}
        {...props}
      >
        {children}
      </Element>
    );
  }
);

Typography.displayName = 'Typography';

export { Typography };
