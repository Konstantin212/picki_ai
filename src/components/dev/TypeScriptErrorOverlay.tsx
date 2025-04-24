'use client';

import { useEffect, useState } from 'react';

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
      className={`fixed bottom-0 left-0 right-0 z-50 bg-red-50 p-4 shadow-lg transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="flex items-center justify-between border-b border-red-200 pb-2">
        <h2 className="text-lg font-semibold text-red-700">TypeScript Errors ({errors.length})</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setIsVisible(!isVisible)}
            className="rounded bg-red-100 px-2 py-1 text-sm text-red-700 hover:bg-red-200"
          >
            {isVisible ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>
      <div className="mt-4 max-h-[300px] overflow-auto">
        {errors.map((error, index) => (
          <div key={index} className="mb-4 rounded border border-red-200 bg-white p-4 last:mb-0">
            <div className="font-mono text-sm text-red-600">{error.file}</div>
            <div className="mt-1 text-red-700">{error.message}</div>
            <div className="mt-1 text-sm text-red-500">
              Line {error.line}, Character {error.character}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
