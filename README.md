# Picki AI

A modern AI recommendation web application built with Next.js 15, React 19, TypeScript, and Supabase. This project follows strict development practices with comprehensive code quality tools and modern architecture patterns.

## 🚀 Features

- **Modern Stack**: Next.js 15 with App Router, React 19, TypeScript (strict mode)
- **AI-Powered**: Intelligent recommendation system with user preferences
- **Authentication**: Secure user management with Supabase Auth
- **Modern UI**: Tailwind CSS with shadcn/ui components and SCSS modules
- **Data Management**: TanStack React Query for efficient server state management
- **Form Handling**: React Hook Form with Zod validation schemas
- **Internationalization**: Multi-language support (en, de, uk) with i18next
- **Code Quality**: ESLint, Prettier, Husky pre-commit hooks
- **Type Safety**: Strict TypeScript configuration with comprehensive type checking
- **Responsive Design**: Mobile-first approach with modern UI/UX

## 🛠️ Technology Stack

### Core Technologies

- **Framework**: Next.js 15.3.0 with App Router
- **Language**: TypeScript 5+ (strict mode enabled)
- **UI Library**: React 19.0.0
- **Styling**: Tailwind CSS 3.3.0 with SCSS modules
- **Database**: Supabase (PostgreSQL)
- **State Management**: TanStack React Query 5.73.3
- **Forms**: React Hook Form 7.55.0 with Zod 3.24.2
- **Internationalization**: i18next 25.1.2
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
│   ├── page.tsx           # Home page - main landing page with AI recommendations
│   ├── layout.tsx         # Root layout - wraps all pages with providers and navigation
│   ├── globals.css        # Global styles and CSS custom properties
│   ├── login/             # User authentication login page
│   ├── signup/            # User registration page
│   ├── auth/              # Authentication callback and sign-out routes
│   ├── profile/           # User profile management page
│   ├── start/             # Initial setup/onboarding page
│   ├── recommend/         # AI recommendation interface page
│   ├── results/           # Display results from AI recommendations
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
├── messages/             # i18n translation files
└── providers/            # React context providers
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

Open [http://localhost:3000](http://localhost:3000) to see the application.

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
5. Verify internationalization works

### Before Committing

1. Run type checking: `pnpm type-check`
2. Run linting: `pnpm lint`
3. Ensure all tests pass
4. Check bundle size impact
5. Verify responsive design

### Code Quality Tools

- ESLint with Next.js and TypeScript rules
- Prettier for code formatting
- Husky for pre-commit hooks
- lint-staged for staged file processing
- Enhanced pre-commit checks for empty files/folders and unused variables

## 🪝 Custom Hooks

### Available Hooks

- `useLogout` - Handles user logout with Supabase authentication
- `useApiQuery` - Wrapper around TanStack Query for consistent API data fetching
- `useApiMutation` - Wrapper around TanStack Mutation for API data mutations
- `useToast` - Toast notification system for user feedback

### Hook Development Guidelines

- Use the `use` prefix for all custom hooks
- Implement proper TypeScript types for all parameters and return values
- Include loading states and error handling where appropriate
- Follow established patterns from existing hooks

## 🔐 Authentication & Security

- Supabase Auth for user management
- Proper session handling with SSR support
- Secure API routes with authentication middleware
- Environment variable protection
- Input validation with Zod schemas

## 🌍 Internationalization

- i18next for all user-facing text
- Support for multiple languages (en, de, uk)
- Translation keys in format: `namespace:key`
- Proper language detection and switching

## 📝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Follow the project's code style and conventions
4. Ensure all pre-commit checks pass
5. Commit your changes with descriptive messages
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Commit Standards

- Each commit must have a descriptive, short message
- Pre-commit hooks must pass (lint, type-check, formatting)
- Empty files and folders are not allowed
- Unused variables, imports, and parameters must be removed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Support

For support, please open an issue in the GitHub repository or contact the development team.
