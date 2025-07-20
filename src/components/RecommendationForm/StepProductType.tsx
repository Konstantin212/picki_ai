'use client';

import { useRecommendationForm } from '@/lib/stores/use-recommendation-form';
import { Typography } from '@/components/ui/Typography';
import { Smartphone, Laptop, Tablet, Headphones, Camera, Plus } from 'lucide-react';
import styles from './StepProductType.module.scss';

interface StepProductTypeProps {
  dict: {
    steps: {
      productType: { title: string; subtitle: string };
    };
    productTypes: {
      smartphone: string;
      laptop: string;
      tablet: string;
      headphones: string;
      camera: string;
      other: string;
    };
    validation: {
      required: string;
    };
  };
}

const PRODUCT_TYPES = [
  { key: 'smartphone', icon: Smartphone, label: 'smartphone' },
  { key: 'laptop', icon: Laptop, label: 'laptop' },
  { key: 'tablet', icon: Tablet, label: 'tablet' },
  { key: 'headphones', icon: Headphones, label: 'headphones' },
  { key: 'camera', icon: Camera, label: 'camera' },
  { key: 'other', icon: Plus, label: 'other' },
];

export const StepProductType = ({ dict }: StepProductTypeProps) => {
  const { productType, setField, errors } = useRecommendationForm();

  const handleSelect = (type: string) => {
    setField('productType', type);
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <Typography variant="h2" className={styles.title}>
          {dict.steps.productType.title}
        </Typography>
        <Typography variant="body1" color="secondary" className={styles.subtitle}>
          {dict.steps.productType.subtitle}
        </Typography>
      </div>

      {/* Product Type Grid */}
      <div className={styles.grid}>
        {PRODUCT_TYPES.map(({ key, icon: Icon, label }) => {
          const isSelected = productType === key;

          return (
            <button
              key={key}
              onClick={() => handleSelect(key)}
              className={`${styles.card} ${isSelected ? styles.selected : ''}`}
              type="button"
            >
              <div className={styles.iconContainer}>
                <Icon className={styles.icon} />
              </div>
              <Typography variant="body1" className={styles.label}>
                {dict.productTypes[label as keyof typeof dict.productTypes]}
              </Typography>
            </button>
          );
        })}
      </div>

      {/* Error Message */}
      {errors.productType && (
        <Typography variant="body2" color="error" className={styles.error}>
          {dict.validation.required}
        </Typography>
      )}
    </div>
  );
};
