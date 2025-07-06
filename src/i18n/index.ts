import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import all translation files
import deCommon from '@/messages/de/common.json';
import deHome from '@/messages/de/home.json';
import deNavigation from '@/messages/de/navigation.json';
import deAuth from '@/messages/de/auth.json';
import deProfile from '@/messages/de/profile.json';
import deErrors from '@/messages/de/errors.json';

import enCommon from '@/messages/en/common.json';
import enHome from '@/messages/en/home.json';
import enNavigation from '@/messages/en/navigation.json';
import enAuth from '@/messages/en/auth.json';
import enProfile from '@/messages/en/profile.json';
import enErrors from '@/messages/en/errors.json';

import ukCommon from '@/messages/uk/common.json';
import ukHome from '@/messages/uk/home.json';
import ukNavigation from '@/messages/uk/navigation.json';
import ukAuth from '@/messages/uk/auth.json';
import ukProfile from '@/messages/uk/profile.json';
import ukErrors from '@/messages/uk/errors.json';

const resources = {
  de: {
    translation: {
      ...deCommon,
      home: deHome,
      nav: deNavigation,
      auth: deAuth,
      profile: deProfile,
      errors: deErrors,
    },
  },
  en: {
    translation: {
      ...enCommon,
      home: enHome,
      nav: enNavigation,
      auth: enAuth,
      profile: enProfile,
      errors: enErrors,
    },
  },
  uk: {
    translation: {
      ...ukCommon,
      home: ukHome,
      nav: ukNavigation,
      auth: ukAuth,
      profile: ukProfile,
      errors: ukErrors,
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'de',
    supportedLngs: ['de', 'en', 'uk'],
    detection: {
      order: ['localStorage', 'cookie', 'navigator'],
      caches: ['localStorage', 'cookie'],
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
