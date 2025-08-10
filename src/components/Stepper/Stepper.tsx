import React, { Children, HTMLAttributes, ReactNode, useState } from 'react';
import { StepConnector } from '@/components/Stepper/StepConnector';
import { StepContentWrapper } from '@/components/Stepper/StepContentWrapper';
import { StepIndicator } from '@/components/Stepper/StepIndicator';
import { StepperProps } from './types';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export default function Stepper({
  children,
  initialStep = 1,
  onStepChange = () => {},
  onFinalStepCompleted = () => {},
  stepCircleContainerClassName = '',
  stepContainerClassName = '',
  contentClassName = '',
  footerClassName = '',
  backButtonProps = {},
  nextButtonProps = {},
  backButtonText = 'Back',
  nextButtonText = 'Continue',
  finalButtonText = 'Complete',
  disableStepIndicators = false,
  renderStepIndicator,
  ...rest
}: StepperProps) {
  const [currentStep, setCurrentStep] = useState<number>(initialStep);
  const [direction, setDirection] = useState<number>(0);
  const stepsArray = Children.toArray(children);
  const totalSteps = stepsArray.length;
  const isCompleted = currentStep > totalSteps;
  const isLastStep = currentStep === totalSteps;

  const updateStep = (newStep: number) => {
    setCurrentStep(newStep);
    if (newStep > totalSteps) {
      onFinalStepCompleted();
    } else {
      onStepChange(newStep);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1);
      updateStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (!isLastStep) {
      setDirection(1);
      updateStep(currentStep + 1);
    }
  };

  const handleComplete = () => {
    setDirection(1);
    updateStep(totalSteps + 1);
  };

  return (
    <div className="mt-6 w-full" {...(rest as HTMLAttributes<HTMLDivElement>)}>
      <div className={cn('mx-auto w-full max-w-2xl', stepCircleContainerClassName)}>
        {/* Step indicators row */}
        <div className={cn(stepContainerClassName, 'flex w-full items-center')}>
          {stepsArray.map((_, index) => {
            const stepNumber = index + 1;
            const isNotLastStep = index < totalSteps - 1;
            return (
              <React.Fragment key={stepNumber}>
                {renderStepIndicator ? (
                  renderStepIndicator({
                    step: stepNumber,
                    currentStep,
                    onStepClick: (clicked: number) => {
                      setDirection(clicked > currentStep ? 1 : -1);
                      updateStep(clicked);
                    },
                  })
                ) : (
                  <StepIndicator
                    step={stepNumber}
                    disableStepIndicators={disableStepIndicators}
                    currentStep={currentStep}
                    onClickStep={(clicked: number) => {
                      setDirection(clicked > currentStep ? 1 : -1);
                      updateStep(clicked);
                    }}
                  />
                )}
                {isNotLastStep && <StepConnector isComplete={currentStep > stepNumber} />}
              </React.Fragment>
            );
          })}
        </div>

        {/* Content + footer container with footer pinned to bottom */}
        <div className={cn('flex min-h-[420px] flex-col', contentClassName)}>
          {/* Animated content only */}
          <StepContentWrapper
            isCompleted={isCompleted}
            currentStep={currentStep}
            direction={direction}
          >
            <div className="w-full">{stepsArray[currentStep - 1] as ReactNode}</div>
          </StepContentWrapper>

          {/* Spacer to push controls to bottom when content is short */}
          <div className="flex-1" />

          {/* Static footer controls (using internal Button) */}
          {!isCompleted && (
            <div className={footerClassName}>
              <div
                className={cn('mt-6 flex', currentStep !== 1 ? 'justify-between' : 'justify-end')}
              >
                {currentStep !== 1 && (
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    disabled={backButtonProps.disabled}
                    {...backButtonProps}
                  >
                    {backButtonText}
                  </Button>
                )}
                <Button
                  variant="gradient"
                  onClick={isLastStep ? handleComplete : handleNext}
                  disabled={nextButtonProps.disabled}
                  {...nextButtonProps}
                >
                  {isLastStep ? finalButtonText : nextButtonText}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
