'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import classes from './TypeScriptErrorOverlay.module.scss';

interface TypeScriptError {
  file: string;
  message: string;
  line: number;
  character: number;
}

export function TypeScriptErrorOverlay() {
  const [errors, setErrors] = useState<TypeScriptError[]>([]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;

    const eventSource = new EventSource('/api/typescript-errors');

    eventSource.onmessage = (event) => {
      try {
        const newErrors = JSON.parse(event.data);
        setErrors(newErrors);
      } catch (error) {
        console.error('Failed to parse TypeScript errors:', error);
      }
    };

    return () => {
      eventSource.close();
    };
  }, []);

  if (process.env.NODE_ENV !== 'development' || errors.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(classes.overlay, isVisible ? classes.overlayVisible : classes.overlayHidden)}
    >
      <div className={classes.header}>
        <h2 className={classes.title}>TypeScript Errors ({errors.length})</h2>
        <div className={classes.buttonContainer}>
          <button onClick={() => setIsVisible(!isVisible)} className={classes.toggleButton}>
            {isVisible ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>
      <div className={classes.errorList}>
        {errors.map((error, index) => (
          <div key={index} className={classes.errorItem}>
            <div className={classes.errorFile}>{error.file}</div>
            <div className={classes.errorMessage}>{error.message}</div>
            <div className={classes.errorLocation}>
              Line {error.line}, Character {error.character}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
