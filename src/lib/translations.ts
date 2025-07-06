/**
 * Translation Key Management
 *
 * This file provides utilities and best practices for managing translations
 * in a scalable and maintainable way.
 *
 * Translation Structure:
 * - common: Shared/common translations (buttons, labels, etc.)
 * - home: Home page specific translations
 * - nav: Navigation component translations
 * - auth: Authentication related translations
 * - profile: Profile page translations
 * - errors: Error page translations
 *
 * Best Practices:
 * 1. Use descriptive, hierarchical keys (e.g., "auth.login.title")
 * 2. Group related translations in separate files
 * 3. Use consistent naming conventions
 * 4. Keep translations concise and clear
 * 5. Use interpolation for dynamic content
 */

/**
 * Translation key constants for better maintainability
 * This helps prevent typos and provides better IDE support
 */
export const TRANSLATION_KEYS = {
  // Common keys
  COMMON: {
    LOADING: 'loading',
    ERROR: 'error',
    SUCCESS: 'success',
    CANCEL: 'cancel',
    SAVE: 'save',
    DELETE: 'delete',
    EDIT: 'edit',
    CLOSE: 'close',
    SUBMIT: 'submit',
    BACK: 'back',
    NEXT: 'next',
    PREVIOUS: 'previous',
    SEARCH: 'search',
    FILTER: 'filter',
    SORT: 'sort',
    REFRESH: 'refresh',
    RETRY: 'retry',
    CONFIRM: 'confirm',
    YES: 'yes',
    NO: 'no',
  },

  // Home page keys
  HOME: {
    HERO_TITLE: 'home.heroTitle',
    HERO_DESCRIPTION: 'home.heroDescription',
    GET_STARTED: 'home.getStarted',
    LEARN_MORE: 'home.learnMore',
    FEATURES_TITLE: 'home.featuresTitle',
    FEATURES_DESCRIPTION: 'home.featuresDescription',
    FEATURE_1_TITLE: 'home.feature1Title',
    FEATURE_1_DESCRIPTION: 'home.feature1Description',
    FEATURE_2_TITLE: 'home.feature2Title',
    FEATURE_2_DESCRIPTION: 'home.feature2Description',
    FEATURE_3_TITLE: 'home.feature3Title',
    FEATURE_3_DESCRIPTION: 'home.feature3Description',
    CTA_TITLE: 'home.ctaTitle',
    CTA_DESCRIPTION: 'home.ctaDescription',
    CTA_BUTTON: 'home.ctaButton',
  },

  // Navigation keys
  NAV: {
    LOGIN_SIGNUP: 'nav.loginSignup',
    PROFILE: 'nav.profile',
    LOGOUT: 'nav.logout',
    SETTINGS: 'nav.settings',
    DASHBOARD: 'nav.dashboard',
    MENU: 'nav.menu',
    CLOSE_MENU: 'nav.closeMenu',
    OPEN_MENU: 'nav.openMenu',
  },

  // Auth keys
  AUTH: {
    LOGIN: {
      TITLE: 'auth.login.title',
      SUBTITLE: 'auth.login.subtitle',
      EMAIL: 'auth.login.email',
      PASSWORD: 'auth.login.password',
      FORGOT_PASSWORD: 'auth.login.forgotPassword',
      SIGN_IN: 'auth.login.signIn',
      NO_ACCOUNT: 'auth.login.noAccount',
      SIGN_UP: 'auth.login.signUp',
      ERRORS: {
        INVALID_CREDENTIALS: 'auth.login.errors.invalidCredentials',
        EMAIL_REQUIRED: 'auth.login.errors.emailRequired',
        PASSWORD_REQUIRED: 'auth.login.errors.passwordRequired',
      },
    },
    SIGNUP: {
      TITLE: 'auth.signup.title',
      SUBTITLE: 'auth.signup.subtitle',
      EMAIL: 'auth.signup.email',
      PASSWORD: 'auth.signup.password',
      CONFIRM_PASSWORD: 'auth.signup.confirmPassword',
      TERMS: 'auth.signup.terms',
      CREATE_ACCOUNT: 'auth.signup.createAccount',
      HAVE_ACCOUNT: 'auth.signup.haveAccount',
      SIGN_IN: 'auth.signup.signIn',
      ERRORS: {
        EMAIL_EXISTS: 'auth.signup.errors.emailExists',
        PASSWORD_MISMATCH: 'auth.signup.errors.passwordMismatch',
        WEAK_PASSWORD: 'auth.signup.errors.weakPassword',
      },
    },
  },

  // Profile keys
  PROFILE: {
    TITLE: 'profile.title',
    BACK_TO_HOME: 'profile.backToHome',
    PERSONAL_INFO: 'profile.personalInfo',
    PREFERENCES: 'profile.preferences',
    RECENT_COMPARISONS: 'profile.recentComparisons',
    DISPLAY_SETTINGS: 'profile.displaySettings',
    NOTIFICATION_SETTINGS: 'profile.notificationSettings',
    ITEMS_PER_PAGE: 'profile.itemsPerPage',
    DARK_MODE: 'profile.darkMode',
    EMAIL_NOTIFICATIONS: 'profile.emailNotifications',
    PUSH_NOTIFICATIONS: 'profile.pushNotifications',
    MEMBER_SINCE: 'profile.memberSince',
    COMPARISON: 'profile.comparison',
    DATE: 'profile.date',
    ON: 'profile.on',
    OFF: 'profile.off',
  },

  // Error keys
  ERRORS: {
    NOT_FOUND: {
      TITLE: 'errors.notFound.title',
      MESSAGE: 'errors.notFound.message',
      RETURN_HOME: 'errors.notFound.returnHome',
    },
    SERVER_ERROR: {
      TITLE: 'errors.serverError.title',
      MESSAGE: 'errors.serverError.message',
      RETRY: 'errors.serverError.retry',
    },
    UNAUTHORIZED: {
      TITLE: 'errors.unauthorized.title',
      MESSAGE: 'errors.unauthorized.message',
      LOGIN: 'errors.unauthorized.login',
    },
    FORBIDDEN: {
      TITLE: 'errors.forbidden.title',
      MESSAGE: 'errors.forbidden.message',
      GO_BACK: 'errors.forbidden.goBack',
    },
  },
} as const;

/**
 * Type for translation keys to ensure type safety
 */
export type TranslationKey = (typeof TRANSLATION_KEYS)[keyof typeof TRANSLATION_KEYS];

/**
 * Helper function to get nested translation keys
 * Usage: getTranslationKey('auth.login.title')
 */
export function getTranslationKey(path: string): string {
  return path;
}

/**
 * Helper function to validate translation keys exist
 * This can be used in development to catch missing translations
 */
export function validateTranslationKey(key: string): boolean {
  // This is a simple validation - in a real app, you might want to
  // check against the actual translation files
  return key.includes('.') && key.length > 0;
}
