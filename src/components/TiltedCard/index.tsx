'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface TiltedCardProps {
  className?: string;
  children: React.ReactNode;
  intensity?: number; // higher = more tilt
  minHeight?: number; // px
}

export const TiltedCard = ({
  className,
  children,
  intensity = 10,
  minHeight = 280,
}: TiltedCardProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [transform, setTransform] = useState<string>('');
  const [glowStyle, setGlowStyle] = useState<React.CSSProperties>({ opacity: 0 });

  // RAF guard
  const frame = useRef<number | null>(null);

  const handleMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = event.clientX - left;
      const y = event.clientY - top;
      const percentX = x / width;
      const percentY = y / height;

      const rotateY = (percentX - 0.5) * (intensity * 2);
      const rotateX = (0.5 - percentY) * (intensity * 2);

      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        setTransform(
          `perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale(1.02)`
        );
        setGlowStyle({
          opacity: 0.25,
          background: `radial-gradient(400px circle at ${percentX * 100}% ${percentY * 100}%, rgba(99,102,241,0.35), rgba(99,102,241,0) 40%)`,
        });
      });
    },
    [intensity]
  );

  const handleLeave = useCallback(() => {
    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      setTransform('perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)');
      setGlowStyle({ opacity: 0 });
    });
  }, []);

  useEffect(() => {
    return () => {
      if (frame.current) {
        cancelAnimationFrame(frame.current);
      }
    };
  }, []);

  return (
    <div className="h-full [perspective:1000px]">
      <div
        ref={containerRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ transform, minHeight }}
        className={cn(
          'relative h-full transition-transform duration-150 will-change-transform',
          className
        )}
      >
        <div className="relative h-full rounded-2xl bg-gradient-to-br from-indigo-500/20 via-blue-500/10 to-purple-500/20 p-[1px]">
          <div
            className={cn(
              'group relative h-full overflow-hidden rounded-[calc(theme(borderRadius.2xl)-1px)] bg-gray-800/70 p-8 shadow-2xl ring-1 ring-gray-700/50 backdrop-blur-sm transition-colors duration-200',
              'hover:bg-gray-800/80'
            )}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-gradient-to-br from-indigo-500/10 to-purple-500/10 blur-2xl"
            />
            <div aria-hidden className="pointer-events-none absolute inset-0" style={glowStyle} />
            <div className="relative z-10 flex h-full flex-col">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TiltedCard;
