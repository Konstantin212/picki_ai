'use client';

import { useEffect, useMemo } from 'react';
import { useRecommendationForm } from '@/lib/stores/use-recommendation-form';
import { type RecommendDict } from '@/app/[lang]/dictionaries';

interface RecommendationTitleProps {
  dict: RecommendDict;
  appName?: string;
}

export const RecommendationTitle = ({ dict, appName = 'Picki AI' }: RecommendationTitleProps) => {
  const { currentStep } = useRecommendationForm();

  const stepTitle = useMemo(() => {
    switch (currentStep) {
      case 0:
        return dict.steps.productType.title;
      case 1:
        return dict.steps.purpose.title;
      case 2:
        return dict.steps.budget.title;
      case 3:
        return dict.steps.parameters.title;
      default:
        return 'Recommend';
    }
  }, [currentStep, dict.steps]);

  useEffect(() => {
    document.title = `${appName} — ${stepTitle}`;
  }, [appName, stepTitle]);

  return null;
};
