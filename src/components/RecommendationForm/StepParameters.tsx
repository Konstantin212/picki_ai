'use client';

import { useRecommendationForm } from '@/lib/stores/use-recommendation-form';
import { Typography } from '@/components/ui/Typography';
import { Zap, Battery, Monitor, Camera, Star, DollarSign, Move, HardDrive } from 'lucide-react';
import { cn } from '@/lib/utils';
import styles from './StepParameters.module.scss';
import { type RecommendDict } from '@/app/[lang]/dictionaries';

interface StepParametersProps {
  dict: RecommendDict;
}

const PARAMETERS = [
  { key: 'performance', icon: Zap, label: 'performance' },
  { key: 'battery', icon: Battery, label: 'battery' },
  { key: 'screen', icon: Monitor, label: 'screen' },
  { key: 'camera', icon: Camera, label: 'camera' },
  { key: 'brand', icon: Star, label: 'brand' },
  { key: 'price', icon: DollarSign, label: 'price' },
  { key: 'portability', icon: Move, label: 'portability' },
  { key: 'storage', icon: HardDrive, label: 'storage' },
];

const MAX_SELECTIONS = 3;

export const StepParameters = ({ dict }: StepParametersProps) => {
  const { parameters, setField, errors } = useRecommendationForm();

  const handleToggle = (paramKey: string) => {
    const currentParams = parameters || [];

    if (currentParams.includes(paramKey)) {
      // Remove parameter
      setField(
        'parameters',
        currentParams.filter((p) => p !== paramKey)
      );
    } else {
      // Add parameter (if under limit)
      if (currentParams.length < MAX_SELECTIONS) {
        setField('parameters', [...currentParams, paramKey]);
      }
    }
  };

  const isSelected = (paramKey: string) => {
    return parameters?.includes(paramKey) || false;
  };

  const isDisabled = (paramKey: string) => {
    return !isSelected(paramKey) && (parameters?.length || 0) >= MAX_SELECTIONS;
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <Typography variant="h2" className={styles.title}>
          {dict.steps.parameters.title}
        </Typography>
        <Typography variant="body1" color="secondary" className={styles.subtitle}>
          {dict.steps.parameters.subtitle}
        </Typography>

        {/* Selection Counter */}
        <Typography variant="body2" color="secondary" className={styles.counter}>
          {parameters?.length || 0} of {MAX_SELECTIONS} selected
        </Typography>
      </div>

      {/* Parameters Grid */}
      <div className={styles.grid}>
        {PARAMETERS.map(({ key, icon: Icon, label }) => {
          const selected = isSelected(key);
          const disabled = isDisabled(key);

          return (
            <button
              key={key}
              onClick={() => handleToggle(key)}
              disabled={disabled}
              className={cn(
                styles.parameter,
                selected && styles.selected,
                disabled && styles.disabled
              )}
              type="button"
            >
              <div className={styles.iconContainer}>
                <Icon className={styles.icon} />
              </div>
              <Typography variant="body2" className={styles.label}>
                {dict.parameters[label as keyof typeof dict.parameters]}
              </Typography>

              {/* Selection Indicator */}
              {selected && (
                <div className={styles.checkmark}>
                  <div className={styles.checkmarkInner} />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Error Message */}
      {errors.parameters && (
        <Typography variant="body2" color="error" className={styles.error}>
          {dict.validation.minParameters}
        </Typography>
      )}
    </div>
  );
};
