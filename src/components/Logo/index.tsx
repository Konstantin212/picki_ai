import Image from 'next/image';
import Link from 'next/link';
import { Typography } from '@/components/ui/Typography';

type LogoProps = {
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
};

const sizes = {
  sm: { width: 32, height: 32, className: 'h-8 w-auto' },
  md: { width: 40, height: 40, className: 'h-10 w-auto' },
  lg: { width: 48, height: 48, className: 'h-12 w-auto' },
};

export const Logo = ({ showText = true, size = 'md' }: LogoProps) => {
  const { width, height, className } = sizes[size];

  return (
    <Link href="/" className="flex flex-shrink-0 items-center">
      <Image
        src="/images/logo.svg"
        alt="Picki AI Logo"
        width={width}
        height={height}
        className={className}
      />
      {showText && (
        <Typography variant="h5" color="primary" className="ml-3 hidden md:block">
          Picki AI
        </Typography>
      )}
    </Link>
  );
};
