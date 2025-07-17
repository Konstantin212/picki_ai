# Picki AI Design System Documentation

## Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Color Palette](#color-palette)
3. [Typography System](#typography-system)
4. [Layout Patterns](#layout-patterns)
5. [Component Design](#component-design)
6. [Interactive Elements](#interactive-elements)
7. [Animation & Transitions](#animation--transitions)
8. [Responsive Design](#responsive-design)
9. [Accessibility Guidelines](#accessibility-guidelines)
10. [Implementation Patterns](#implementation-patterns)
11. [Resources & Inspiration](#resources--inspiration)
12. [Best Practices](#best-practices)

---

## Design Philosophy

### Core Principles

- **Modern Minimalism**: Clean, uncluttered interfaces with purposeful whitespace
- **Dark-First Approach**: Primary dark theme with strategic use of light accents
- **Glass Morphism**: Subtle transparency and backdrop blur for depth
- **Gradient Accents**: Strategic use of gradients for visual interest and hierarchy
- **Consistent Spacing**: 8px grid system for harmonious proportions

### Design Goals

- Create intuitive, accessible user experiences
- Maintain visual hierarchy through typography and spacing
- Ensure consistency across all pages and components
- Optimize for performance and accessibility
- Support internationalization seamlessly

---

## Color Palette

### Primary Colors

```css
/* Dark Theme (Primary) */
--gray-900: #111827 /* Main background */ --gray-800: #1f2937 /* Secondary background */
  --gray-700: #374151 /* Card backgrounds */ --gray-600: #4b5563 /* Borders and dividers */
  --gray-500: #6b7280 /* Secondary text */ --gray-400: #9ca3af /* Muted text */ --gray-300: #d1d5db
  /* Primary text */ --gray-200: #e5e7eb /* Light accents */ --gray-100: #f3f4f6
  /* Very light accents */ --white: #ffffff /* Pure white */;
```

### Accent Colors

```css
/* Blue Accent (Primary Actions) */
--blue-600: #2563eb /* Primary buttons */ --blue-500: #3b82f6 /* Focus states */ --blue-400: #60a5fa
  /* Hover states */ --blue-300: #93c5fd /* Light accents */ /* Purple Accent (Secondary Actions) */
  --purple-600: #9333ea /* Gradient end */ --purple-500: #a855f7 /* Secondary buttons */
  --purple-400: #c084fc /* Hover states */ /* Status Colors */ --red-500: #ef4444 /* Errors */
  --green-500: #10b981 /* Success */ --yellow-500: #f59e0b /* Warnings */;
```

### Usage Guidelines

- **Backgrounds**: Use gray-900 for main backgrounds, gray-800 for cards
- **Text**: gray-300 for primary text, gray-400 for secondary text
- **Borders**: gray-600 for subtle borders, gray-500 for dividers
- **Accents**: Blue for primary actions, purple for gradients
- **Transparency**: Use /50 or /20 for overlay effects

---

## Typography System

### Font Hierarchy

```typescript
// Heading 1 - Page titles
className = 'text-2xl font-bold text-white';

// Heading 2 - Section titles
className = 'text-xl font-semibold text-white';

// Heading 3 - Subsection titles
className = 'text-lg font-medium text-white';

// Body 1 - Primary content
className = 'text-base text-gray-300';

// Body 2 - Secondary content
className = 'text-sm text-gray-400';

// Caption - Small text, labels
className = 'text-xs text-gray-500';
```

### Typography Component Usage

```typescript
import { Typography } from '@/components/ui/typography';

// Usage examples
<Typography variant="h1" className="mb-2 text-2xl font-bold text-white">
  Page Title
</Typography>

<Typography variant="body2" className="text-gray-400">
  Secondary content
</Typography>
```

---

## Layout Patterns

### Page Structure Template

```typescript
import { SupportedLang } from '@/lib/translations';

export default async function PageName({
  params,
}: {
  params: Promise<{ lang: SupportedLang }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <>
      <Navbar dict={dict} lang={lang} />
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(156,146,172,0.15)_1px,transparent_0)] bg-[length:20px_20px]" />
        </div>

        <div className="relative flex min-h-screen items-center justify-center px-4 py-12">
          {/* Back Navigation */}
          <Link
            href={`/${lang}`}
            className="absolute left-6 top-6 flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white md:left-8 md:top-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          {/* Main Content Container */}
          <div className="w-full max-w-md">
            <div className="overflow-hidden rounded-2xl bg-gray-800/50 shadow-2xl ring-1 ring-gray-700/50 backdrop-blur-sm">
              <div className="px-8 py-8 sm:px-10 sm:py-10">
                {/* Page Content */}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
```

### Container Patterns

```typescript
// Full-width container
<div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

// Centered card container
<div className="w-full max-w-md mx-auto">

// Grid container
<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

// Flex container
<div className="flex flex-col space-y-4">
```

---

## Component Design

### Form Field Pattern

```typescript
<div className="space-y-2">
  <label htmlFor="fieldId" className="text-sm font-medium text-gray-300">
    Field Label
  </label>
  <div className="relative">
    <Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
    <Input
      id="fieldId"
      type="text"
      className="h-12 pl-10 pr-4 bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
      placeholder="Enter your text"
    />
  </div>
</div>
```

### Button Patterns

```typescript
// Primary button (gradient)
<Button className="h-12 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200">

// Secondary button
<Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white">

// Icon button
<Button className="p-2 text-gray-400 hover:text-gray-300 hover:bg-gray-700/50 rounded-lg transition-all duration-200">
```

### Card Pattern

```typescript
<div className="overflow-hidden rounded-2xl bg-gray-800/50 shadow-2xl ring-1 ring-gray-700/50 backdrop-blur-sm">
  <div className="px-8 py-8 sm:px-10 sm:py-10">
    {/* Card content */}
  </div>
</div>
```

---

## Interactive Elements

### Hover Effects

```typescript
// Standard hover
className = 'transition-colors hover:text-white';

// Scale hover
className = 'transition-all duration-200 hover:scale-105';

// Background hover
className = 'hover:bg-gray-700/50 transition-colors duration-200';

// Transform hover
className = 'hover:translate-x-[-2px] transition-transform duration-200';
```

### Focus States

```typescript
// Input focus
className = 'focus:border-blue-500 focus:ring-blue-500/20 focus:ring-2';

// Button focus
className = 'focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-gray-800';
```

### Loading States

```typescript
// Loading spinner
<div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />

// Disabled state
className="disabled:opacity-50 disabled:cursor-not-allowed"
```

---

## Animation & Transitions

### Transition Classes

```typescript
// Standard transitions
className = 'transition-all duration-200';
className = 'transition-colors duration-200';
className = 'transition-transform duration-200';

// Custom durations
className = 'transition-all duration-300';
className = 'transition-all duration-500';
```

### Animation Classes

```typescript
// Spinner animation
className = 'animate-spin';

// Fade in
className = 'animate-in fade-in duration-300';

// Slide up
className = 'animate-in slide-in-from-bottom-4 duration-300';
```

### Custom Animations

```css
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
```

---

## Responsive Design

### Breakpoint Strategy

```typescript
// Mobile first approach
className = 'w-full px-4'; // Mobile
className = 'sm:px-6'; // Small (640px+)
className = 'md:px-8'; // Medium (768px+)
className = 'lg:px-10'; // Large (1024px+)
className = 'xl:px-12'; // Extra large (1280px+)
```

### Responsive Patterns

```typescript
// Responsive grid
className = 'grid gap-4 md:grid-cols-2 lg:grid-cols-3';

// Responsive text
className = 'text-sm md:text-base lg:text-lg';

// Responsive spacing
className = 'space-y-4 md:space-y-6 lg:space-y-8';

// Responsive positioning
className = 'absolute left-6 top-6 md:left-8 md:top-8';
```

### Container Queries (Future)

```css
@container (min-width: 400px) {
  .card-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
```

---

## Accessibility Guidelines

### Semantic HTML

```typescript
// Proper form structure
<form onSubmit={handleSubmit}>
  <label htmlFor="email">Email</label>
  <input id="email" type="email" required />
</form>

// Proper button structure
<button type="button" aria-label="Toggle password visibility">
  <Eye className="h-4 w-4" />
</button>
```

### ARIA Attributes

```typescript
// Loading state
<button aria-busy="true" aria-live="polite">
  Loading...
</button>

// Error state
<div role="alert" aria-live="assertive">
  Error message
</div>

// Navigation
<nav aria-label="Main navigation">
  {/* Navigation items */}
</nav>
```

### Focus Management

```typescript
// Focus trap for modals
useEffect(() => {
  const focusableElements = modalRef.current?.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  // Focus management logic
}, []);

// Skip to content link
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to main content
</a>
```

### Color Contrast

- **Text**: Minimum 4.5:1 contrast ratio
- **Large Text**: Minimum 3:1 contrast ratio
- **UI Elements**: Minimum 3:1 contrast ratio
- **Focus Indicators**: High contrast (blue-500 on gray-800)

---

## Implementation Patterns

### Component Structure

```typescript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Typography } from '@/components/ui/typography';
import { useToast } from '@/hooks/use-toast';
import { Icon } from 'lucide-react';

interface ComponentProps {
  dict: {
    // Dictionary structure
  };
  // Other props
}

export const Component = ({ dict, ...props }: ComponentProps) => {
  // State management
  const [state, setState] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  // Event handlers
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // API call logic
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Component JSX */}
    </div>
  );
};
```

### Page Structure

```typescript
import { getDictionary } from '@/app/[lang]/dictionaries';
import { Component } from '@/components/Component';
import { Navbar } from '@/components/navigation/Navbar';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { SupportedLang } from '@/lib/translations';

export default async function PageName({
  params,
}: {
  params: Promise<{ lang: SupportedLang }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <>
      <Navbar dict={dict} lang={lang} />
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {/* Background and layout */}
        <Component dict={dict} />
      </main>
    </>
  );
}
```

### State Management Patterns

```typescript
// Form state
const [formData, setFormData] = useState({
  email: '',
  password: '',
});

// Loading states
const [isLoading, setIsLoading] = useState(false);
const [isSubmitting, setIsSubmitting] = useState(false);

// Error states
const [errors, setErrors] = useState<Record<string, string>>({});

// UI states
const [showPassword, setShowPassword] = useState(false);
const [isExpanded, setIsExpanded] = useState(false);
```

---

## Resources & Inspiration

### Design Systems

- **Material Design 3**: Google's latest design system
- **Apple Human Interface Guidelines**: iOS design principles
- **Microsoft Fluent Design**: Windows design language
- **Ant Design**: Enterprise design system
- **Chakra UI**: Accessible component library

### Color Palettes

- **Coolors.co**: Color palette generator
- **Adobe Color**: Professional color tools
- **Color Hunt**: Curated color palettes
- **Paletton**: Color scheme generator

### Typography Resources

- **Google Fonts**: Web font library
- **Font Awesome**: Icon font library
- **Inter**: Modern sans-serif font
- **JetBrains Mono**: Developer-friendly monospace

### Animation Libraries

- **Framer Motion**: React animation library
- **GSAP**: Professional animation library
- **Lottie**: After Effects animations
- **React Spring**: Physics-based animations

### UI Component Libraries

- **shadcn/ui**: Modern component library
- **Radix UI**: Unstyled, accessible components
- **Headless UI**: Unstyled, accessible components
- **React Aria**: Adobe's accessibility library

### Design Inspiration

- **Dribbble**: Design community
- **Behance**: Creative portfolios
- **Awwwards**: Web design awards
- **Mobbin**: Mobile app design patterns
- **Pinterest**: Visual inspiration

### Tools & Software

- **Figma**: Design and prototyping
- **Sketch**: Mac-based design tool
- **Adobe XD**: UI/UX design
- **InVision**: Prototyping and collaboration
- **Zeplin**: Design handoff

---

## Best Practices

### Performance

- Use `React.memo()` for expensive components
- Implement proper code splitting
- Optimize images with Next.js Image component
- Use CSS-in-JS sparingly (prefer Tailwind)
- Implement proper loading states

### SEO

- Use semantic HTML elements
- Implement proper meta tags
- Use Next.js metadata API
- Optimize for Core Web Vitals
- Implement structured data

### Security

- Validate all user inputs
- Implement proper CSRF protection
- Use HTTPS in production
- Sanitize user-generated content
- Implement proper authentication

### Code Quality

- Use TypeScript for type safety
- Follow ESLint and Prettier rules
- Write meaningful commit messages
- Implement proper error boundaries
- Use React Query for server state

### Testing

- Write unit tests for components
- Implement integration tests
- Use React Testing Library
- Test accessibility with axe-core
- Implement E2E tests for critical flows

### Documentation

- Document component props
- Write usage examples
- Maintain changelog
- Create storybook stories
- Document design decisions

---

## Quick Reference

### Common Class Combinations

```typescript
// Card container
'overflow-hidden rounded-2xl bg-gray-800/50 shadow-2xl ring-1 ring-gray-700/50 backdrop-blur-sm';

// Form input
'h-12 pl-10 pr-4 bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200';

// Primary button
'h-12 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200';

// Text hierarchy
'text-2xl font-bold text-white'; // H1
'text-lg font-medium text-gray-300'; // H2
'text-sm text-gray-400'; // Body
```

### Spacing Scale

```typescript
// 8px grid system
'space-y-1'; // 4px
'space-y-2'; // 8px
'space-y-4'; // 16px
'space-y-6'; // 24px
'space-y-8'; // 32px
'space-y-12'; // 48px
```

### Breakpoints

```typescript
sm: 640px   // Small devices
md: 768px   // Medium devices
lg: 1024px  // Large devices
xl: 1280px  // Extra large devices
2xl: 1536px // 2X large devices
```

This documentation serves as a comprehensive guide for maintaining design consistency and implementing beautiful, accessible, and performant pages in your Picki AI application.
