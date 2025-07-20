'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Typography } from '@/components/ui/Typography';
import { useToast } from '@/hooks/use-toast';
import { Dictionary } from '@/app/[lang]/dictionaries';

interface AuthFormProps {
  dict: Dictionary;
  mode: 'login' | 'signup';
}

interface FieldErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export const AuthForm = ({ dict, mode }: AuthFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const router = useRouter();
  const { toast } = useToast();

  const isLogin = mode === 'login';
  const authDict = isLogin ? dict.auth.login : dict.auth.signup;
  const currentLocale =
    typeof window !== 'undefined' ? window.location.pathname.split('/')[1] : 'en';

  const validateFields = (): boolean => {
    const errors: FieldErrors = {};

    // Email validation
    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    // Confirm password validation (signup only)
    if (!isLogin) {
      if (!confirmPassword) {
        errors.confirmPassword = 'Please confirm your password';
      } else if (password !== confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const clearFieldErrors = () => {
    setFieldErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearFieldErrors();

    // Validate fields before submission
    if (!validateFields()) {
      toast({
        title: 'Validation Error',
        description: 'Please fix the errors in the form',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      const endpoint = isLogin ? '/api/auth/sign-in' : '/api/auth/sign-up';
      const body = isLogin ? { email, password } : { email, password, confirmPassword };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Success - redirect to home page
        toast({
          title: 'Success',
          description: isLogin ? 'Successfully signed in!' : 'Account created successfully!',
          variant: 'default',
        });

        // Refresh the page to update session state
        router.refresh();
        router.push(`/${currentLocale}`);
      } else {
        // Handle specific field errors
        if (data.fieldErrors) {
          setFieldErrors(data.fieldErrors);
        }

        // Show error toast
        toast({
          title: 'Error',
          description: data.error || 'Authentication failed',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Authentication error:', error);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getInputClassName = (fieldName: keyof FieldErrors) => {
    const baseClasses =
      'h-12 border-gray-600 bg-gray-700/50 pl-10 pr-12 text-white transition-all duration-200 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20';
    const errorClasses = 'border-red-500 focus:border-red-500 focus:ring-red-500/20';

    return fieldErrors[fieldName] ? `${baseClasses} ${errorClasses}` : baseClasses;
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="mb-4 flex justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
            <User className="h-6 w-6 text-white" />
          </div>
        </div>
        <Typography variant="h1" className="mb-2 text-2xl font-bold text-white">
          {authDict.title}
        </Typography>
        <Typography variant="body2" className="text-gray-400">
          {authDict.subtitle}
        </Typography>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Field */}
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-300">
            {authDict.email}
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (fieldErrors.email) clearFieldErrors();
              }}
              className={getInputClassName('email')}
              placeholder="Enter your email"
            />
          </div>
          {fieldErrors.email && (
            <Typography variant="body2" className="text-sm text-red-400">
              {fieldErrors.email}
            </Typography>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-gray-300">
            {authDict.password}
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (fieldErrors.password) clearFieldErrors();
              }}
              className={getInputClassName('password')}
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-300"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {fieldErrors.password && (
            <Typography variant="body2" className="text-sm text-red-400">
              {fieldErrors.password}
            </Typography>
          )}
        </div>

        {/* Confirm Password Field (Signup only) */}
        {!isLogin && (
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-300">
              {dict.auth.signup.confirmPassword}
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (fieldErrors.confirmPassword) clearFieldErrors();
                }}
                className={getInputClassName('confirmPassword')}
                placeholder="Confirm your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-300"
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {fieldErrors.confirmPassword && (
              <Typography variant="body2" className="text-sm text-red-400">
                {fieldErrors.confirmPassword}
              </Typography>
            )}
          </div>
        )}

        {/* Forgot Password Link (Login only) */}
        {isLogin && (
          <div className="text-right">
            <Link
              href={`/${currentLocale}/forgot-password`}
              className="text-sm text-blue-400 transition-colors hover:text-blue-300"
            >
              {dict.auth.login.forgotPassword}
            </Link>
          </div>
        )}

        {/* Submit Button */}
        <Button type="submit" disabled={isLoading} variant="gradient" size="xl" className="w-full">
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Loading...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {isLogin ? authDict.signIn : dict.auth.signup.createAccount}
              <ArrowRight className="h-4 w-4" />
            </div>
          )}
        </Button>

        {/* Switch Mode Link */}
        <Typography variant="body2" className="text-center text-gray-400">
          {isLogin ? dict.auth.login.noAccount : dict.auth.signup.haveAccount}{' '}
          <Link
            href={`/${currentLocale}/${isLogin ? 'signup' : 'login'}`}
            className="font-medium text-blue-400 transition-colors hover:text-blue-300"
          >
            {isLogin ? dict.auth.login.signUp : dict.auth.signup.signIn}
          </Link>
        </Typography>
      </form>
    </div>
  );
};
