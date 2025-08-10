import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { SlideTransition } from './SlideTransition';
import { StepContentWrapperProps } from './types';

export function StepContentWrapper({
  isCompleted,
  currentStep,
  direction,
  children,
  className = '',
}: StepContentWrapperProps) {
  const [parentHeight, setParentHeight] = useState<number>(0);
  const [maxHeight, setMaxHeight] = useState<number>(0);

  const handleHeightReady = (h: number) => {
    setParentHeight(h);
    setMaxHeight((prev) => (h > prev ? h : prev));
  };

  const targetHeight = isCompleted ? 0 : Math.max(parentHeight, maxHeight);

  return (
    <div className={className} style={{ position: 'relative' }}>
      <motion.div
        style={{ position: 'relative', overflow: 'hidden' }}
        animate={{ height: targetHeight }}
        transition={{ type: 'spring', duration: 0.4 }}
      >
        <AnimatePresence initial={false} mode="sync" custom={direction}>
          {!isCompleted && (
            <SlideTransition
              key={currentStep}
              direction={direction}
              onHeightReady={handleHeightReady}
            >
              <div className="flex h-full w-full flex-col">{children}</div>
            </SlideTransition>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
