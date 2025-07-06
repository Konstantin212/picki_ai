# Translation Management

This directory contains all translation files for the Picki AI application, organized by language and domain for better maintainability and scalability.

## Structure

```
src/messages/
├── en/                    # English translations
│   ├── common.json       # Shared/common translations
│   ├── home.json         # Home page translations
│   ├── navigation.json   # Navigation component translations
│   ├── auth.json         # Authentication related translations
│   ├── profile.json      # Profile page translations
│   └── errors.json       # Error page translations
├── de/                    # German translations
│   ├── common.json
│   ├── home.json
│   ├── navigation.json
│   ├── auth.json
│   ├── profile.json
│   └── errors.json
└── uk/                    # Ukrainian translations
    ├── common.json
    ├── home.json
    ├── navigation.json
    ├── auth.json
    ├── profile.json
    └── errors.json
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

## Best Practices

### 1. Key Naming Convention

- Use descriptive, hierarchical keys: `domain.section.element`
- Examples: `auth.login.title`, `profile.preferences.darkMode`
- Use camelCase for key names

### 2. File Organization

- Group related translations in separate files
- Keep files focused on specific domains/features
- Use consistent structure across all languages

### 3. Translation Quality

- Keep translations concise and clear
- Use consistent terminology across the app
- Consider cultural context for each language

### 4. Maintenance

- Add new translations to all language files
- Use translation key constants from `src/lib/translations.ts`
- Validate translation keys exist before using them

## Usage

### In Components

```typescript
import { Typography } from '@/components/ui/typography';
import { TRANSLATION_KEYS } from '@/lib/translations';

// Using Typography component with translation
<Typography tKey={TRANSLATION_KEYS.HOME.HERO_TITLE} />

// Using direct translation key
<Typography tKey="home.heroTitle" />
```

### Translation Key Constants

Use the constants from `src/lib/translations.ts` for better maintainability:

```typescript
import { TRANSLATION_KEYS } from '@/lib/translations';

// Instead of hardcoded strings
<Typography tKey="auth.login.title" />

// Use constants
<Typography tKey={TRANSLATION_KEYS.AUTH.LOGIN.TITLE} />
```

## Adding New Translations

1. **Add to all language files**: When adding a new translation, add it to all three language files (en, de, uk)

2. **Update constants**: Add the new key to `TRANSLATION_KEYS` in `src/lib/translations.ts`

3. **Follow naming convention**: Use the established pattern for the domain

4. **Test**: Verify the translation appears correctly in all supported languages

## Language Support

Currently supported languages:

- **English (en)**: Primary language
- **German (de)**: Secondary language
- **Ukrainian (uk)**: Secondary language

To add a new language:

1. Create a new directory (e.g., `fr/` for French)
2. Copy the structure from existing languages
3. Translate all JSON files
4. Update `src/i18n/index.ts` to include the new language
5. Update the language detector configuration

## Tools and Utilities

- **Translation Key Constants**: `src/lib/translations.ts` - Provides type-safe translation keys
- **Validation**: Helper functions to validate translation keys
- **Documentation**: This README and inline comments in translation files

## Contributing

When contributing translations:

1. Follow the established structure and naming conventions
2. Ensure consistency across all language files
3. Test translations in the application
4. Update documentation if needed
5. Use translation key constants for new translations
