import 'server-only';

// Import all translation files
import enCommon from '@/messages/en/common.json';
import enHome from '@/messages/en/home.json';
import enNavigation from '@/messages/en/navigation.json';
import enAuth from '@/messages/en/auth.json';
import enProfile from '@/messages/en/profile.json';
import enErrors from '@/messages/en/errors.json';
import enStart from '@/messages/en/start.json';
import enRecommend from '@/messages/en/recommend.json';
import enResults from '@/messages/en/results.json';

import deCommon from '@/messages/de/common.json';
import deHome from '@/messages/de/home.json';
import deNavigation from '@/messages/de/navigation.json';
import deAuth from '@/messages/de/auth.json';
import deProfile from '@/messages/de/profile.json';
import deErrors from '@/messages/de/errors.json';
import deStart from '@/messages/de/start.json';
import deRecommend from '@/messages/de/recommend.json';
import deResults from '@/messages/de/results.json';

import ukCommon from '@/messages/uk/common.json';
import ukHome from '@/messages/uk/home.json';
import ukNavigation from '@/messages/uk/navigation.json';
import ukAuth from '@/messages/uk/auth.json';
import ukProfile from '@/messages/uk/profile.json';
import ukErrors from '@/messages/uk/errors.json';
import ukStart from '@/messages/uk/start.json';
import ukRecommend from '@/messages/uk/recommend.json';
import ukResults from '@/messages/uk/results.json';

const dictionaries = {
  en: () =>
    Promise.resolve({
      ...enCommon,
      home: enHome,
      nav: enNavigation,
      auth: enAuth,
      profile: enProfile,
      errors: enErrors,
      start: enStart,
      recommend: enRecommend,
      results: enResults,
    }),
  de: () =>
    Promise.resolve({
      ...deCommon,
      home: deHome,
      nav: deNavigation,
      auth: deAuth,
      profile: deProfile,
      errors: deErrors,
      start: deStart,
      recommend: deRecommend,
      results: deResults,
    }),
  uk: () =>
    Promise.resolve({
      ...ukCommon,
      home: ukHome,
      nav: ukNavigation,
      auth: ukAuth,
      profile: ukProfile,
      errors: ukErrors,
      start: ukStart,
      recommend: ukRecommend,
      results: ukResults,
    }),
};

export const getDictionary = async (locale: 'en' | 'de' | 'uk') => {
  return dictionaries[locale]();
};
