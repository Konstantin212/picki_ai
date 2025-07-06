'use client';

import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import classes from './LanguageSwitcher.module.scss';

interface LanguageSwitcherProps {
  isMobile?: boolean;
}

export const LanguageSwitcher = ({ isMobile = false }: LanguageSwitcherProps) => {
  const { i18n } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <select
      value={i18n.language}
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
