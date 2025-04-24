'use client';

import React from 'react';

interface AuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export const PrimaryFormButton: React.FC<AuthButtonProps> = ({
  children,
  isLoading = false,
  className = '',
  ...props
}) => {
  return (
    <button
      className={`inline-flex h-10 w-full items-center justify-center rounded-md bg-indigo-600 px-4 text-sm font-medium text-white hover:bg-indigo-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading && (
        <svg
          className="mr-2 h-4 w-4 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {children}
    </button>
  );
};

export const LinkFormButton: React.FC<AuthButtonProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <button className={`text-indigo-600 underline hover:text-indigo-500 ${className}`} {...props}>
      {children}
    </button>
  );
};
