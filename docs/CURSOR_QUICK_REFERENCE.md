# Cursor IDE Quick Reference - Picki AI Design System

## 🚀 Quick Start Snippets

### Page Template

```typescript
// New page template - copy this for new pages
import { getDictionary } from '@/app/[lang]/dictionaries';
import { Navbar } from '@/components/navigation/Navbar';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function PageName({
  params,
}: {
  params: Promise<{ lang: 'en' | 'de' | 'uk' }>;
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

          {/* Main Content */}
          <div className="w-full max-w-md">
            <div className="overflow-hidden rounded-2xl bg-gray-800/50 shadow-2xl ring-1 ring-gray-700/50 backdrop-blur-sm">
              <div className="px-8 py-8 sm:px-10 sm:py-10">
                {/* Your content here */}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
```

### Component Template

```typescript
// New component template
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
    // Add dictionary structure
  };
  // Add other props
}

export const Component = ({ dict, ...props }: ComponentProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Your logic here
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
      {/* Your JSX here */}
    </div>
  );
};
```

## 🎨 Common Class Combinations

### Layout Classes

```typescript
// Card container
'overflow-hidden rounded-2xl bg-gray-800/50 shadow-2xl ring-1 ring-gray-700/50 backdrop-blur-sm';

// Form container
'space-y-6';

// Grid layout
'grid gap-6 md:grid-cols-2 lg:grid-cols-3';

// Flex layout
'flex flex-col space-y-4';
```

### Form Elements

```typescript
// Form field wrapper
'space-y-2';

// Form label
'text-sm font-medium text-gray-300';

// Form input with icon
'h-12 pl-10 pr-4 bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200';

// Icon positioning
'absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500';
```

### Buttons

```typescript
// Primary button (gradient)
'h-12 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200';

// Secondary button
'border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white';

// Icon button
'p-2 text-gray-400 hover:text-gray-300 hover:bg-gray-700/50 rounded-lg transition-all duration-200';
```

### Typography

```typescript
// Page title
'text-2xl font-bold text-white';

// Section title
'text-xl font-semibold text-white';

// Subsection title
'text-lg font-medium text-white';

// Body text
'text-base text-gray-300';

// Secondary text
'text-sm text-gray-400';

// Caption
'text-xs text-gray-500';
```

## 🔧 Cursor IDE Commands

### Quick Commands

```bash
# Type checking
pnpm type-check

# Linting
pnpm lint

# Development server
pnpm dev

# Build
pnpm build
```

### File Creation Commands

```bash
# Create new page
mkdir -p src/app/[lang]/new-page
touch src/app/[lang]/new-page/page.tsx

# Create new component
mkdir -p src/components/new-component
touch src/components/new-component/index.ts
touch src/components/new-component/NewComponent.tsx

# Create new hook
touch src/hooks/use-new-hook.ts
```

## 📝 Common Patterns

### Form Field with Icon

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

### Loading State

```typescript
{isLoading ? (
  <div className="flex items-center gap-2">
    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
    Loading...
  </div>
) : (
  <div className="flex items-center gap-2">
    Button Text
    <ArrowRight className="h-4 w-4" />
  </div>
)}
```

### Error Handling

```typescript
try {
  // Your logic
} catch (error) {
  toast({
    title: 'Error',
    description: 'Something went wrong',
    variant: 'destructive',
  });
}
```

### Navigation

```typescript
// Get current locale
const currentLocale = typeof window !== 'undefined' ? window.location.pathname.split('/')[1] : 'en';

// Navigate
router.push(`/${currentLocale}/destination`);
```

## 🎯 Design Principles Checklist

### Before Starting

- [ ] Use dark theme (gray-900/gray-800 backgrounds)
- [ ] Implement glass morphism for cards
- [ ] Use blue/purple gradients for primary actions
- [ ] Follow 8px grid spacing system
- [ ] Ensure proper contrast ratios

### During Development

- [ ] Use semantic HTML elements
- [ ] Implement proper focus states
- [ ] Add loading states for async operations
- [ ] Include proper error handling
- [ ] Test responsive design

### Before Committing

- [ ] Run type checking (`pnpm type-check`)
- [ ] Run linting (`pnpm lint`)
- [ ] Test on mobile and desktop
- [ ] Verify accessibility
- [ ] Check performance

## 🔍 Common Issues & Solutions

### TypeScript Errors

```typescript
// Fix window not defined error
const currentLocale = typeof window !== 'undefined' ? window.location.pathname.split('/')[1] : 'en';

// Fix async component props
params: Promise<{ lang: 'en' | 'de' | 'uk' }>;
const { lang } = await params;
```

### Styling Issues

```typescript
// Fix backdrop blur not working
className = 'backdrop-blur-sm bg-gray-800/50';

// Fix gradient not showing
className = 'bg-gradient-to-r from-blue-600 to-purple-600';

// Fix icon alignment
className = 'absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2';
```

### Performance Issues

```typescript
// Optimize re-renders
const Component = React.memo(({ props }) => {
  // Component logic
});

// Optimize images
import Image from 'next/image';
<Image src="/path" alt="description" width={400} height={300} />
```

## 📚 Useful Resources

### Icons

- **Lucide React**: `import { Icon } from 'lucide-react'`
- **Heroicons**: `import { Icon } from '@heroicons/react/24/outline'`

### Components

- **shadcn/ui**: Pre-built components in `src/components/ui/`
- **Radix UI**: Headless components for complex interactions

### Hooks

- **useToast**: `import { useToast } from '@/hooks/use-toast'`
- **useRouter**: `import { useRouter } from 'next/navigation'`
- **useState**: `import { useState } from 'react'`

### Utilities

- **cn**: `import { cn } from '@/lib/utils'`
- **getDictionary**: `import { getDictionary } from '@/app/[lang]/dictionaries'`

## 🎨 Color Reference

### Primary Colors

```css
gray-900: #111827  /* Main background */
gray-800: #1f2937  /* Card background */
gray-700: #374151  /* Input background */
gray-600: #4b5563  /* Borders */
gray-500: #6b7280  /* Secondary text */
gray-400: #9ca3af  /* Muted text */
gray-300: #d1d5db  /* Primary text */
```

### Accent Colors

```css
blue-600: #2563eb  /* Primary actions */
blue-500: #3b82f6  /* Focus states */
purple-600: #9333ea /* Gradient end */
purple-500: #a855f7 /* Secondary actions */
```

### Transparency

```css
bg-gray-800/50    /* 50% opacity */
bg-gray-700/20    /* 20% opacity */
ring-blue-500/20  /* 20% opacity ring */
```

This quick reference should help you rapidly implement beautiful, consistent pages in your Picki AI application using Cursor IDE!
