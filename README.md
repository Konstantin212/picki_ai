# Picki AI

A modern web application built with Next.js, TypeScript, and various powerful libraries.

## Features

- 🚀 Next.js 14 with App Router
- 💎 TypeScript with strict mode
- 🎨 Tailwind CSS for styling
- 🎯 shadcn/ui components with proper theming
- 🔄 React Query for data fetching
- 📝 React Hook Form with Zod validation
- 🔐 Supabase for authentication and database
- 📱 Responsive design
- 🎨 Modern UI components with consistent styling
- 🌈 Dark/Light theme support
- 🚨 Comprehensive error handling

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- pnpm (recommended) or npm
- Supabase account

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Konstantin212/picki_ai.git
cd picki_ai
```

2. Install dependencies:

```bash
pnpm install
# or
npm install
```

3. Copy the environment variables:

```bash
cp .env.example .env.local
```

4. Update the environment variables in `.env.local` with your values:

- `NEXT_PUBLIC_APP_URL`: Your application URL
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `NEXT_PUBLIC_API_URL`: Your API URL

5. Start the development server:

```bash
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/              # Next.js app router pages
├── components/       # React components
│   ├── ui/          # shadcn/ui components
│   └── ...          # Other components
├── lib/             # Utility functions and configurations
├── hooks/           # Custom React hooks
├── types/           # TypeScript type definitions
└── styles/          # Global styles and Tailwind configuration
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm type-check` - Run TypeScript type checking

## Recent Updates

### UI Improvements

- Added proper theming support with consistent button styles
- Implemented proper error handling in Supabase connection tests
- Enhanced toast notifications with detailed error messages
- Added proper color scheme for destructive actions

### Development Setup

- Updated `.gitignore` for better project cleanliness
- Added comprehensive TypeScript type checking
- Improved error handling throughout the application
- Added proper linting and formatting configuration

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
