'use client';

import { useRouter, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import classes from './LanguageSwitcher.module.scss';

interface LanguageSwitcherProps {
  isMobile?: boolean;
}

export const LanguageSwitcher = ({ isMobile = false }: LanguageSwitcherProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    const currentLocale = pathname.split('/')[1];
    const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPath);
  };

  const currentLocale = pathname.split('/')[1] || 'en';

  return (
    <select
      value={currentLocale}
      onChange={handleChange}
      className={cn(isMobile ? classes.mobile : classes.desktop)}
      aria-label="Select language"
    >
      <option value="de">Deutsch</option>
      <option value="en">English</option>
      <option value="uk">Українська</option>
    </select>
  );
};
