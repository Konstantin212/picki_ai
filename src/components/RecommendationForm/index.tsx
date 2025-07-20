'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRecommendationForm } from '@/lib/stores/use-recommendation-form';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { StepProductType } from './StepProductType';
import { StepPurpose } from './StepPurpose';
import { StepBudget } from './StepBudget';
import { StepParameters } from './StepParameters';
import { FormProgressBar } from './FormProgressBar';
import styles from './index.module.scss';

interface RecommendationFormProps {
  dict: {
    steps: {
      productType: { title: string; subtitle: string };
      purpose: { title: string; subtitle: string };
      budget: { title: string; subtitle: string; placeholder: string };
      parameters: { title: string; subtitle: string };
    };
    productTypes: {
      smartphone: string;
      laptop: string;
      tablet: string;
      headphones: string;
      camera: string;
      other: string;
    };
    purposes: {
      work: string;
      gaming: string;
      travel: string;
      study: string;
      photography: string;
      music: string;
      other: string;
    };
    parameters: {
      performance: string;
      battery: string;
      screen: string;
      camera: string;
      brand: string;
      price: string;
      portability: string;
      storage: string;
    };
    navigation: {
      back: string;
      next: string;
      submit: string;
    };
    validation: {
      required: string;
      invalidBudget: string;
      minParameters: string;
      maxParameters: string;
    };
    loading: {
      title: string;
      subtitle: string;
    };
    error: {
      title: string;
      subtitle: string;
      retry: string;
    };
  };
  lang: string;
}

export const RecommendationForm = ({ dict, lang }: RecommendationFormProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { currentStep, isLoading, setStep, validateStep, canProceed, setLoading, reset } =
    useRecommendationForm();

  const TOTAL_STEPS = 4;

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < TOTAL_STEPS - 1) {
        setStep(currentStep + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) {
      return;
    }

    setIsSubmitting(true);
    setLoading(true);

    try {
      const formData = useRecommendationForm.getState();
      const response = await fetch('/api/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productType: formData.productType,
          purpose: formData.purpose,
          budget: formData.budget,
          parameters: formData.parameters,
          customPurpose: formData.customPurpose,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get recommendations');
      }

      const result = await response.json();

      // Reset form and navigate to results
      reset();
      router.push(`/${lang}/results?recommendationId=${result.id}`);
    } catch (error) {
      console.error('Recommendation error:', error);
      toast({
        title: dict.error.title,
        description: dict.error.subtitle,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <StepProductType dict={dict} />;
      case 1:
        return <StepPurpose dict={dict} />;
      case 2:
        return <StepBudget dict={dict} />;
      case 3:
        return <StepParameters dict={dict} />;
      default:
        return null;
    }
  };

  const isLastStep = currentStep === TOTAL_STEPS - 1;
  const canGoNext = canProceed(currentStep);

  return (
    <div className={styles.container}>
      {/* Progress Bar */}
      <FormProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />

      {/* Step Content */}
      <div className={styles.content}>{renderStep()}</div>

      {/* Navigation */}
      <div className={styles.navigation}>
        <Button
          variant="ghost"
          onClick={handleBack}
          disabled={currentStep === 0 || isSubmitting}
          className={styles.backButton}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {dict.navigation.back}
        </Button>

        <Button
          onClick={isLastStep ? handleSubmit : handleNext}
          disabled={!canGoNext || isSubmitting}
          className={styles.nextButton}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {dict.loading.title}
            </>
          ) : (
            <>
              {isLastStep ? dict.navigation.submit : dict.navigation.next}
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingContent}>
            <Loader2 className="mb-4 h-8 w-8 animate-spin text-blue-500" />
            <Typography variant="h3" className="mb-2">
              {dict.loading.title}
            </Typography>
            <Typography variant="body2" color="secondary">
              {dict.loading.subtitle}
            </Typography>
          </div>
        </div>
      )}
    </div>
  );
};
