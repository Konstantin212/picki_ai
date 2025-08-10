'use client';

import { useRecommendationForm } from '@/lib/stores/use-recommendation-form';
import { Typography } from '@/components/ui/Typography';
import { Input } from '@/components/ui/Input';
import { DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';
import styles from './StepBudget.module.scss';
import { type RecommendDict } from '@/app/[lang]/dictionaries';

interface StepBudgetProps {
  dict: RecommendDict;
}

export const StepBudget = ({ dict }: StepBudgetProps) => {
  const { budget, setField, errors } = useRecommendationForm();

  const handleBudgetChange = (value: string) => {
    // Remove non-numeric characters except decimal point
    const numericValue = value.replace(/[^0-9.]/g, '');

    // Ensure only one decimal point
    const parts = numericValue.split('.');
    const cleanValue = parts.length > 2 ? `${parts[0]}.${parts.slice(1).join('')}` : numericValue;

    // Convert to number or null
    const numberValue = cleanValue ? parseFloat(cleanValue) : null;

    setField('budget', numberValue);
  };

  const formatDisplayValue = (value: number | null): string => {
    if (value === null) return '';
    return value.toString();
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <Typography variant="h2" className={styles.title}>
          {dict.steps.budget.title}
        </Typography>
        <Typography variant="body1" color="secondary" className={styles.subtitle}>
          {dict.steps.budget.subtitle}
        </Typography>
      </div>

      {/* Budget Input */}
      <div className={styles.inputContainer}>
        <div className={styles.inputWrapper}>
          <DollarSign className={styles.currencyIcon} />
          <Input
            type="text"
            placeholder={dict.steps.budget.placeholder}
            value={formatDisplayValue(budget)}
            onChange={(e) => handleBudgetChange(e.target.value)}
            className={styles.input}
          />
        </div>

        {/* Budget Suggestions */}
        <div className={styles.suggestions}>
          <Typography variant="body2" color="secondary" className={styles.suggestionsLabel}>
            Quick select:
          </Typography>
          <div className={styles.suggestionButtons}>
            {[100, 300, 500, 1000, 2000].map((amount) => (
              <button
                key={amount}
                onClick={() => setField('budget', amount)}
                className={cn(styles.suggestionButton, budget === amount && styles.selected)}
                type="button"
              >
                ${amount}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Error Message */}
      {errors.budget && (
        <Typography variant="body2" color="error" className={styles.error}>
          {dict.validation.invalidBudget}
        </Typography>
      )}
    </div>
  );
};
