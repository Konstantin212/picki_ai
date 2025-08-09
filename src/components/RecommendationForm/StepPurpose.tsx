'use client';

import { useState } from 'react';
import { useRecommendationForm } from '@/lib/stores/use-recommendation-form';
import { Typography } from '@/components/ui/Typography';
import { Input } from '@/components/ui/Input';
import { Briefcase, Gamepad2, Plane, BookOpen, Camera, Music, Plus } from 'lucide-react';
import styles from './StepPurpose.module.scss';
import { type RecommendDict } from '@/app/[lang]/dictionaries';

interface StepPurposeProps {
  dict: RecommendDict;
}

const PURPOSES = [
  { key: 'work', icon: Briefcase, label: 'work' },
  { key: 'gaming', icon: Gamepad2, label: 'gaming' },
  { key: 'travel', icon: Plane, label: 'travel' },
  { key: 'study', icon: BookOpen, label: 'study' },
  { key: 'photography', icon: Camera, label: 'photography' },
  { key: 'music', icon: Music, label: 'music' },
  { key: 'other', icon: Plus, label: 'other' },
];

export const StepPurpose = ({ dict }: StepPurposeProps) => {
  const { purpose, customPurpose, setField, errors } = useRecommendationForm();
  const [showCustomInput, setShowCustomInput] = useState(purpose === 'other');

  const handleSelect = (selectedPurpose: string) => {
    if (selectedPurpose === 'other') {
      setShowCustomInput(true);
      setField('purpose', 'other');
    } else {
      setShowCustomInput(false);
      setField('purpose', selectedPurpose);
      setField('customPurpose', undefined);
    }
  };

  const handleCustomInputChange = (value: string) => {
    setField('customPurpose', value);
    if (value.trim()) {
      setField('purpose', 'other');
    }
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <Typography variant="h2" className={styles.title}>
          {dict.steps.purpose.title}
        </Typography>
        <Typography variant="body1" color="secondary" className={styles.subtitle}>
          {dict.steps.purpose.subtitle}
        </Typography>
      </div>

      {/* Purpose Pills */}
      <div className={styles.pills}>
        {PURPOSES.map(({ key, icon: Icon, label }) => {
          const isSelected = purpose === key;

          return (
            <button
              key={key}
              onClick={() => handleSelect(key)}
              className={`${styles.pill} ${isSelected ? styles.selected : ''}`}
              type="button"
            >
              <Icon className={styles.icon} />
              <span className={styles.label}>
                {dict.purposes[label as keyof typeof dict.purposes]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Custom Input */}
      {showCustomInput && (
        <div className={styles.customInput}>
          <Typography variant="body2" color="secondary" className={styles.inputLabel}>
            Please specify your purpose:
          </Typography>
          <Input
            type="text"
            placeholder="Enter your purpose..."
            value={customPurpose || ''}
            onChange={(e) => handleCustomInputChange(e.target.value)}
            className={styles.input}
          />
        </div>
      )}

      {/* Error Message */}
      {errors.purpose && (
        <Typography variant="body2" color="error" className={styles.error}>
          {dict.validation.required}
        </Typography>
      )}
    </div>
  );
};
