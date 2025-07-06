import * as React from 'react';
import { cn } from '@/lib/utils';
import classes from './input.module.scss';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && (
          <label htmlFor={props.id} className={classes.label}>
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(classes.input, error && classes.inputError, className)}
          ref={ref}
          {...props}
        />
        {error && <p className={classes.error}>{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
