# Translation Management

This directory contains all translation files for the Picki AI application, organized by language and domain for better maintainability and scalability. The project uses Next.js 15's built-in internationalization with server-side translations.

## Structure

```
src/messages/
├── en/                    # English translations
│   ├── common.json       # Shared/common translations
│   ├── home.json         # Home page translations
│   ├── navigation.json   # Navigation component translations
│   ├── auth.json         # Authentication related translations
│   ├── profile.json      # Profile page translations
│   ├── errors.json       # Error page translations
│   ├── start.json        # Start page translations
│   ├── recommend.json    # Recommendation interface translations
│   └── results.json      # Results page translations
├── de/                    # German translations
│   ├── common.json
│   ├── home.json
│   ├── navigation.json
│   ├── auth.json
│   ├── profile.json
│   ├── errors.json
│   ├── start.json
│   ├── recommend.json
│   └── results.json
└── uk/                    # Ukrainian translations
    ├── common.json
    ├── home.json
    ├── navigation.json
    ├── auth.json
    ├── profile.json
    ├── errors.json
    ├── start.json
    ├── recommend.json
    └── results.json
```

## Translation Files

### `common.json`

Contains shared translations used across multiple components:

- Loading states
- Error messages
- Common buttons (Save, Cancel, Delete, etc.)
- Generic labels

### `home.json`

Home page specific translations:

- Hero section content
- Feature descriptions
- Call-to-action buttons

### `navigation.json`

Navigation component translations:

- Menu items
- User account actions
- Mobile menu labels

### `auth.json`

Authentication related translations:

- Login/Signup forms
- Form validation messages
- Authentication error messages

### `profile.json`

Profile page translations:

- User information labels
- Settings categories
- Preference options

### `errors.json`

Error page translations:

- 404 page content
- Server error messages
- Unauthorized/Forbidden pages

### `start.json`

Start/onboarding page translations:

- Welcome messages
- Setup instructions
- Initial configuration options

### `recommend.json`

Recommendation interface translations:

- Form labels
- Input placeholders
- Action buttons

### `results.json`

Results page translations:

- Result display labels
- Item descriptions
- Action buttons

## Next.js 15 i18n Implementation

### Server-Side Translation Loading

Translations are loaded server-side using the `getDictionary` function:

```typescript
// src/app/[lang]/dictionaries.ts
import enCommon from '@/messages/en/common.json';
import enHome from '@/messages/en/home.json';
// ... other imports

const dictionaries = {
  en: () => Promise.resolve({
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
  // ... other languages
};

export const getDictionary = async (locale: 'en' | 'de' | 'uk') => {
  return dictionaries[locale]();
};
```

### Usage in Server Components

```typescript
// src/app/[lang]/page.tsx
export default async function HomePage({
  params
}: {
  params: Promise<{ lang: 'en' | 'de' | 'uk' }>
}) {
  const { lang } = await params; // Next.js 15 requires awaiting params
  const dict = await getDictionary(lang);

  return (
    <div>
      <h1>{dict.home.heroTitle}</h1>
      <p>{dict.home.heroDescription}</p>
      <Navbar dict={dict} />
    </div>
  );
}
```

### Usage in Client Components

Client components receive translations as props:

```typescript
// src/components/navigation/Navbar.tsx
interface NavbarProps {
  dict: any; // Translation dictionary
  session?: Session | null;
}

export const Navbar = ({ dict, session }: NavbarProps) => {
  return (
    <nav>
      <span>{dict.nav.home}</span>
      <LanguageSwitcher />
    </nav>
  );
};
```

## Best Practices

### 1. Key Naming Convention

- Use descriptive, hierarchical keys: `domain.section.element`
- Examples: `auth.login.title`, `profile.preferences.darkMode`
- Use camelCase for key names

### 2. File Organization

- Group related translations in separate files
- Keep files focused on specific domains/features
- Use consistent structure across all languages
- Add new domain files to all language directories

### 3. Translation Quality

- Keep translations concise and clear
- Use consistent terminology across the app
- Consider cultural context for each language
- Maintain consistent formatting and punctuation

### 4. Server-Side Rendering

- All translations are loaded server-side for better performance
- No client-side translation loading required
- SEO-friendly with proper locale URLs
- Automatic locale detection via middleware

### 5. Maintenance

- Add new translations to all language files simultaneously
- Update the dictionary loader when adding new domain files
- Test translations in all supported locales
- Use TypeScript for better type safety

## Adding New Translations

### 1. Adding New Domain Files

When adding a new feature or page:

1. **Create domain files** in all language directories:

   ```bash
   src/messages/en/new-feature.json
   src/messages/de/new-feature.json
   src/messages/uk/new-feature.json
   ```

2. **Update dictionary loader** in `src/app/[lang]/dictionaries.ts`:

   ```typescript
   import enNewFeature from '@/messages/en/new-feature.json';
   import deNewFeature from '@/messages/de/new-feature.json';
   import ukNewFeature from '@/messages/uk/new-feature.json';

   const dictionaries = {
     en: () => Promise.resolve({
       // ... existing translations
       newFeature: enNewFeature,
     }),
     // ... other languages
   };
   ```

3. **Use in components**:
   ```typescript
   const dict = await getDictionary(lang);
   return <h1>{dict.newFeature.title}</h1>;
   ```

### 2. Adding New Keys to Existing Files

1. **Add to all language files** simultaneously
2. **Use consistent naming** across all languages
3. **Test the translations** in the application

## Language Support

Currently supported languages:

- **English (en)**: Primary language
- **German (de)**: Secondary language
- **Ukrainian (uk)**: Secondary language

### Adding a New Language

1. **Create language directory**: `src/messages/fr/`
2. **Copy structure** from existing languages
3. **Translate all JSON files**
4. **Update middleware** in `src/middleware.ts`:
   ```typescript
   const locales = ['en', 'de', 'uk', 'fr'];
   ```
5. **Update dictionary loader** in `src/app/[lang]/dictionaries.ts`
6. **Update language switcher** component

## Locale Routing

The application uses Next.js 15's locale routing:

- **URL Structure**: `/{locale}/{page}` (e.g., `/en/profile`, `/de/login`)
- **Automatic Detection**: Browser language detection with fallback
- **SEO Optimized**: Each locale has its own URL
- **Performance**: Server-side rendering with no client-side translation loading

## Tools and Utilities

- **Dictionary Loader**: `src/app/[lang]/dictionaries.ts` - Server-side translation loading
- **Middleware**: `src/middleware.ts` - Locale detection and routing
- **Language Switcher**: `src/components/navigation/LanguageSwitcher.tsx` - Client-side locale switching
- **Type Safety**: TypeScript interfaces for translation dictionaries

## Contributing

When contributing translations:

1. **Follow the established structure** and naming conventions
2. **Ensure consistency** across all language files
3. **Test translations** in all supported locales
4. **Update documentation** if needed
5. **Use server-side loading** approach
6. **Maintain type safety** with TypeScript

## Migration from Client-Side i18n

This project migrated from client-side i18next to Next.js 15's built-in i18n:

### Benefits:

- **Better Performance**: Server-side rendering
- **SEO Friendly**: Proper locale URLs
- **Simplified Setup**: No client-side translation loading
- **Type Safety**: Better TypeScript integration
- **Automatic Detection**: Built-in locale detection

### Changes Made:

- Removed `i18next` and `react-i18next` dependencies
- Implemented server-side dictionary loading
- Updated all components to receive translations as props
- Added locale-aware routing with middleware
- Updated all pages to use Next.js 15 params awaiting
