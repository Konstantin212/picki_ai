import { ReactNode } from 'react';
import { StepProps } from './types';

export function Step({ children }: StepProps) {
  return <div className="px-8">{children as ReactNode}</div>;
}
