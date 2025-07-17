'use client';

import { useRouter, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import styles from './index.module.scss';
import { SupportedLang } from '@/lib/translations';

interface LanguageSwitcherProps {
  isMobile?: boolean;
}

const languages: Array<{ value: SupportedLang; label: string }> = [
  { value: 'en', label: 'English' },
  { value: 'de', label: 'Deutsch' },
  { value: 'uk', label: 'Українська' },
];

export const LanguageSwitcher = ({ isMobile = false }: LanguageSwitcherProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleValueChange = (newLocale: string) => {
    const currentLocale = pathname.split('/')[1];
    const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPath);
  };

  const currentLocale = pathname.split('/')[1] || 'en';

  return (
    <Select value={currentLocale} onValueChange={handleValueChange}>
      <SelectTrigger
        className={cn('w-[140px]', isMobile ? styles.mobile : styles.desktop)}
        aria-label="Select language"
      >
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        {languages.map((language) => (
          <SelectItem key={language.value} value={language.value}>
            {language.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
