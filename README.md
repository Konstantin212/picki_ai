# Picki AI

A modern AI recommendation web application built with Next.js 15, React 19, TypeScript, and Supabase. This project follows strict development practices with comprehensive code quality tools and modern architecture patterns.

## 🚀 Features

- **Modern Stack**: Next.js 15 with App Router, React 19, TypeScript (strict mode)
- **AI-Powered**: Intelligent recommendation system with user preferences
- **Authentication**: Secure user management with Supabase Auth
- **Modern UI**: Tailwind CSS with shadcn/ui components and SCSS modules
- **Data Management**: TanStack React Query for efficient server state management
- **Form Handling**: React Hook Form with Zod validation schemas
- **Internationalization**: Multi-language support (en, de, uk) with Next.js 15 locale routing
- **Code Quality**: ESLint, Prettier, Husky pre-commit hooks
- **Type Safety**: Strict TypeScript configuration with comprehensive type checking
- **Responsive Design**: Mobile-first approach with modern UI/UX

## 🛠️ Technology Stack

### Core Technologies

- **Framework**: Next.js 15.3.0 with App Router and locale routing
- **Language**: TypeScript 5+ (strict mode enabled)
- **UI Library**: React 19.0.0
- **Styling**: Tailwind CSS 3.3.0 with SCSS modules
- **Database**: Supabase (PostgreSQL)
- **State Management**: TanStack React Query 5.73.3
- **Forms**: React Hook Form 7.55.0 with Zod 3.24.2
- **Internationalization**: Next.js 15 built-in i18n with server-side translations
- **Package Manager**: pnpm

### UI & Components

- shadcn/ui components with Radix UI primitives
- Lucide React icons
- Class Variance Authority for component variants
- Tailwind CSS with custom design system

### Development Tools

- ESLint 9.7.0 with Next.js and TypeScript rules
- Prettier 3.5.3 for code formatting
- Husky 9.1.7 for pre-commit hooks
- lint-staged 15.5.1 for staged file processing

## 📁 Project Architecture

```
src/
├── app/                    # Next.js App Router pages
│   ├── [lang]/            # Locale-aware dynamic routes
│   │   ├── layout.tsx     # Root layout with locale context
│   │   ├── page.tsx       # Home page with server-side translations
│   │   ├── not-found.tsx  # 404 page with locale support
│   │   ├── dictionaries.ts # Server-side translation loader
│   │   ├── login/         # Authentication pages
│   │   ├── signup/        # Registration pages
│   │   ├── profile/       # User profile management
│   │   ├── start/         # Initial setup/onboarding
│   │   ├── recommend/     # AI recommendation interface
│   │   └── results/       # AI recommendation results
│   ├── not-found.tsx      # Global 404 redirect to default locale
│   ├── globals.css        # Global styles and CSS custom properties
│   ├── auth/              # Authentication callback and sign-out routes
│   └── api/               # API routes for backend functionality
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components (shadcn/ui style)
│   ├── auth/             # Authentication components
│   └── navigation/       # Navigation components
├── hooks/                # Custom React hooks
│   ├── useLogout.ts      # Authentication logout hook with error handling
│   ├── use-query.ts      # TanStack Query wrapper for API calls
│   ├── use-mutation.ts   # TanStack Mutation wrapper for API mutations
│   └── use-toast.ts      # Toast notification system hook
├── lib/                  # Utility libraries and configurations
│   ├── utils.ts          # Utility functions (cn, formatDate, etc.)
│   ├── supabase.ts       # Supabase client configuration
│   ├── react-query.ts    # React Query client setup
│   ├── form.ts           # useForm hook for form validation
│   ├── schemas/          # Zod validation schemas by domain
│   └── axios.ts          # API client with interceptors
├── messages/             # i18n translation files (domain-based)
│   ├── en/              # English translations
│   │   ├── common.json  # Shared UI elements
│   │   ├── home.json    # Home page content
│   │   ├── navigation.json # Navigation labels
│   │   ├── auth.json    # Authentication forms
│   │   ├── profile.json # Profile page content
│   │   ├── errors.json  # Error messages
│   │   ├── start.json   # Start page content
│   │   ├── recommend.json # Recommendation interface
│   │   └── results.json # Results display
│   ├── de/              # German translations (same structure)
│   └── uk/              # Ukrainian translations (same structure)
├── middleware.ts         # Locale detection and routing middleware
└── providers/            # React context providers
```

## 🌍 Internationalization (i18n)

### Next.js 15 Locale Routing

This project uses Next.js 15's built-in internationalization with locale routing:

- **URL Structure**: `/{locale}/{page}` (e.g., `/en/profile`, `/de/login`)
- **Server-Side Translations**: All translations loaded server-side for better performance
- **Automatic Locale Detection**: Browser language detection with fallback to English
- **SEO Optimized**: Each locale has its own URL for better search engine indexing

### Translation Structure

Translations are organized by domain and language:

```
src/messages/
├── en/
│   ├── common.json      # Shared UI elements
│   ├── home.json        # Home page content
│   ├── navigation.json  # Navigation labels
│   ├── auth.json        # Authentication forms
│   ├── profile.json     # Profile page content
│   ├── errors.json      # Error messages
│   ├── start.json       # Start page content
│   ├── recommend.json   # Recommendation interface
│   └── results.json     # Results display
├── de/                  # German translations (same structure)
└── uk/                  # Ukrainian translations (same structure)
```

### Usage Examples

#### Server Components (Pages)

```tsx
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
    </div>
  );
}
```

#### Client Components

```tsx
// Components receive translations as props
interface NavbarProps {
  dict: any; // Translation dictionary
  session?: Session | null;
}

export const Navbar = ({ dict, session }: NavbarProps) => {
  return (
    <nav>
      <span>{dict.nav.home}</span>
      <LanguageSwitcher /> {/* Handles locale switching */}
    </nav>
  );
};
```

#### Language Switching

```tsx
// src/components/navigation/LanguageSwitcher.tsx
export const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    const currentLocale = pathname.split('/')[1];
    const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <select onChange={handleChange}>
      <option value="en">English</option>
      <option value="de">Deutsch</option>
      <option value="uk">Українська</option>
    </select>
  );
};
```

## 🎨 Code Style & Conventions

### TypeScript

- Strict TypeScript configuration with all strict compiler options enabled
- Explicit types over `any` - prefer proper type annotations
- TypeScript path aliases: `@/`, `@/components/`, `@/lib/`, etc.
- Enable `noUncheckedIndexedAccess`, `noImplicitReturns`, `exactOptionalPropertyTypes`

### React Components

- Functional components with hooks
- Object assignment notation for component prop typing: `({ prop }: ComponentProps)`
- Follow React 19 best practices
- Keep components small and focused on single responsibility
- Use proper error boundaries and suspense boundaries

### Client Components

- Add `'use client'` directive only when necessary
- Prefer server components when possible
- Create small, isolated client components
- Common use cases: React hooks, event handlers, browser APIs, third-party libraries

### Next.js 15 Best Practices

- **Params Awaiting**: Always await `params` before destructuring in Next.js 15
- **Server Components**: Use server components for data fetching and translations
- **Locale Routing**: Leverage Next.js built-in locale routing for better performance
- **Error Handling**: Implement proper error boundaries for locale-specific errors

### Styling

- Tailwind CSS utility classes as primary styling method
- SCSS modules with `@apply` directive for long className strings
- Pattern: `import classes from './Component.module.scss'` and `className={classes.className}`
- SCSS modules named same as component: `MyComponent.module.scss` for `MyComponent.tsx`
- Shared styles in separate modules or utility classes

### Schema Organization

- Organize schemas by domain/feature in separate files
- Structure: `src/lib/schemas/{domain}.ts`
- Central export point: `src/lib/schemas/index.ts`
- Single responsibility principle - each file handles one domain
- Descriptive file names: `auth.ts`, `user.ts`, `recommendation.ts`

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ required
- pnpm package manager (recommended)
- Supabase project configured

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/Konstantin212/picki_ai.git
cd picki_ai
```

2. **Install dependencies:**

```bash
pnpm install
```

3. **Set up environment variables:**

```bash
cp .env.example .env.local
```

4. **Configure environment variables in `.env.local`:**

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_API_URL=your_api_url
```

5. **Start development server:**

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application. The middleware will automatically redirect to your preferred locale (e.g., `/en`, `/de`, `/uk`).

## 📋 Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm type-check` - Run TypeScript type checking
- `pnpm prepare` - Install Husky hooks

## 🔧 Development Workflow

### Before Starting

1. Ensure all dependencies are installed: `pnpm install`
2. Set up environment variables
3. Start the development server: `pnpm dev`

### During Development

1. Follow TypeScript strict mode
2. Use proper ESLint and Prettier configuration
3. Test changes in multiple browsers
4. Check for accessibility issues
5. Verify internationalization works across all locales

### Before Committing

1. Run type checking: `pnpm type-check`
2. Run linting: `pnpm lint`
3. Ensure all tests pass
4. Check bundle size impact
5. Verify responsive design
6. Test all supported locales

## 🌍 Testing Locales

Test the application in different locales:

- **English**: [http://localhost:3000/en](http://localhost:3000/en)
- **German**: [http://localhost:3000/de](http://localhost:3000/de)
- **Ukrainian**: [http://localhost:3000/uk](http://localhost:3000/uk)

The language switcher in the navigation allows users to change languages dynamically.

## 📝 Adding New Translations

1. **Add new translation keys** to all language files in `src/messages/{locale}/`
2. **Update the dictionary loader** in `src/app/[lang]/dictionaries.ts`
3. **Use in components** by passing `dict` prop and accessing the translation

Example:

```json
// src/messages/en/new-feature.json
{
  "title": "New Feature",
  "description": "This is a new feature"
}

// src/messages/de/new-feature.json
{
  "title": "Neue Funktion",
  "description": "Das ist eine neue Funktion"
}
```

Then update `dictionaries.ts` and use in components:

```tsx
const dict = await getDictionary(lang);
return <h1>{dict.newFeature.title}</h1>;
```
