import { ReactNode } from 'react';

export interface ControlsRowProps {
  leftContent: ReactNode;
  rightContent?: ReactNode;
  className?: string;
}

export const ControlsRow = ({ leftContent, rightContent, className = '' }: ControlsRowProps) => {
  return (
    <div
      className={`mb-8 flex flex-col-reverse items-start justify-between gap-3 sm:flex-row sm:items-center ${className}`}
    >
      <div className="flex flex-wrap gap-2">{leftContent}</div>
      {rightContent && <div>{rightContent}</div>}
    </div>
  );
};
