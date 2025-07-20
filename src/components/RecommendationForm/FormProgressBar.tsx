'use client';

import { Typography } from '@/components/ui/Typography';
import { Check } from 'lucide-react';
import styles from './FormProgressBar.module.scss';

interface FormProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export const FormProgressBar = ({ currentStep, totalSteps }: FormProgressBarProps) => {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className={styles.container}>
      {/* Progress Text */}
      <div className={styles.header}>
        <Typography variant="h3" className={styles.title}>
          Step {currentStep + 1} of {totalSteps}
        </Typography>
        <Typography variant="body2" color="secondary" className={styles.subtitle}>
          {Math.round(progress)}% Complete
        </Typography>
      </div>

      {/* Progress Bar */}
      <div className={styles.progressContainer}>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Step Indicators */}
      <div className={styles.steps}>
        {Array.from({ length: totalSteps }, (_, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <div
              key={index}
              className={`${styles.step} ${
                isCompleted ? styles.completed : isCurrent ? styles.current : styles.upcoming
              }`}
            >
              <div className={styles.stepIndicator}>
                {isCompleted ? (
                  <Check className="h-4 w-4 text-white" />
                ) : (
                  <span className={styles.stepNumber}>{index + 1}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
