'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRecommendationForm } from '@/lib/stores/use-recommendation-form';
import { Typography } from '@/components/ui/Typography';
import { useToast } from '@/hooks/use-toast';
import { useRecommendMutation } from '@/hooks/use-recommendation';
import { useRecommendationResultsStore } from '@/lib/stores/use-recommendation-results';
import { Loader2 } from 'lucide-react';
import { StepProductType } from './StepProductType';
import { StepPurpose } from './StepPurpose';
import { StepBudget } from './StepBudget';
import { StepParameters } from './StepParameters';
import { FormProgressBar } from './FormProgressBar';
import styles from './index.module.scss';
import { type RecommendDict } from '@/app/[lang]/dictionaries';
import { Stepper } from '@/components/Stepper';

interface RecommendationFormProps {
  dict: RecommendDict;
  lang: string;
}

export const RecommendationForm = ({ dict, lang }: RecommendationFormProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    currentStep,
    isLoading,
    setStep,
    validateStep,
    setLoading,
    reset,
    productType,
    purpose,
    budget,
    parameters,
  } = useRecommendationForm();

  const TOTAL_STEPS = 4;

  const { mutateAsync } = useRecommendMutation();
  const saveResults = useRecommendationResultsStore((s) => s.save);

  const handleSubmit = async () => {
    if (isSubmitting || mutateAsync === undefined) return;
    // ensure last step valid
    if (!validateStep(TOTAL_STEPS - 1)) return;

    setIsSubmitting(true);
    setLoading(true);

    try {
      const formData = useRecommendationForm.getState();
      const result = await mutateAsync({
        productType: formData.productType!,
        purpose: formData.purpose!,
        budget: formData.budget!,
        parameters: formData.parameters!,
        customPurpose: formData.customPurpose,
      });

      reset();
      const recs = (result as { id?: string; recommendations?: unknown }).recommendations;
      if (result?.id && recs) {
        saveResults(result.id, recs as unknown as Record<string, unknown>);
      }
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

  // Compute ability to proceed based on current form state
  const canProceedFromStep = (stepIndexZeroBased: number) => {
    switch (stepIndexZeroBased) {
      case 0:
        return !!productType;
      case 1:
        return !!purpose;
      case 2:
        return !!(budget && budget > 0);
      case 3:
        return !!(parameters && parameters.length > 0);
      default:
        return false;
    }
  };

  const nextDisabled = !canProceedFromStep(currentStep) || isSubmitting;
  const backDisabled = currentStep === 0 || isSubmitting;

  return (
    <div className={styles.container}>
      {/* Progress Bar */}
      <FormProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />

      {/* Stepper with smooth transitions; hide built-in indicators */}
      <Stepper
        initialStep={currentStep + 1}
        onStepChange={(step) => setStep(step - 1)}
        onFinalStepCompleted={handleSubmit}
        stepContainerClassName="hidden"
        contentClassName="!px-0"
        backButtonText={dict.navigation.back}
        nextButtonText={dict.navigation.next}
        finalButtonText={dict.navigation.submit}
        backButtonProps={{
          disabled: backDisabled,
          className:
            'rounded-lg border border-gray-600 bg-transparent px-4 py-2 text-white hover:bg-gray-700 disabled:opacity-50',
        }}
        nextButtonProps={{
          disabled: nextDisabled,
          className:
            'rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-white hover:from-blue-700 hover:to-purple-700 disabled:opacity-50',
        }}
        disableStepIndicators
      >
        <div className="flex min-h-[420px] w-full flex-1 flex-col">
          <div className="flex-1">
            <StepProductType dict={dict} />
          </div>
          <div className="pt-6" />
        </div>
        <div className="flex min-h-[420px] w-full flex-1 flex-col">
          <div className="flex-1">
            <StepPurpose dict={dict} />
          </div>
          <div className="pt-6" />
        </div>
        <div className="flex min-h-[420px] w-full flex-1 flex-col">
          <div className="flex-1">
            <StepBudget dict={dict} />
          </div>
          <div className="pt-6" />
        </div>
        <div className="flex min-h-[420px] w-full flex-1 flex-col">
          <div className="flex-1">
            <StepParameters dict={dict} />
          </div>
          <div className="pt-6" />
        </div>
      </Stepper>

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
