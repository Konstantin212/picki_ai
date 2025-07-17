'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Typography } from '@/components/ui/typography';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { Dictionary } from '@/app/[lang]/dictionaries';

interface AuthFormProps {
  dict: Dictionary;
  mode: 'login' | 'signup';
}

export const AuthForm = ({ dict, mode }: AuthFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const isLogin = mode === 'login';
  const authDict = isLogin ? dict.auth.login : dict.auth.signup;
  const currentLocale =
    typeof window !== 'undefined' ? window.location.pathname.split('/')[1] : 'en';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!isLogin && password !== confirmPassword) {
        toast({
          title: 'Error',
          description: 'Passwords do not match',
          variant: 'destructive',
        });
        return;
      }

      const response = await fetch(`/auth/${isLogin ? 'sign-in' : 'sign-up'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        router.push(`/${currentLocale}/profile`);
      } else {
        const error = await response.json();
        toast({
          title: 'Error',
          description: error.message || 'Authentication failed',
          variant: 'destructive',
        });
      }
    } catch {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="mb-4 flex justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
            {isLogin ? (
              <User className="h-6 w-6 text-white" />
            ) : (
              <User className="h-6 w-6 text-white" />
            )}
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
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12 border-gray-600 bg-gray-700/50 pl-10 pr-4 text-white transition-all duration-200 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20"
              placeholder="Enter your email"
            />
          </div>
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
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-12 border-gray-600 bg-gray-700/50 pl-10 pr-12 text-white transition-all duration-200 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20"
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
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="h-12 border-gray-600 bg-gray-700/50 pl-10 pr-12 text-white transition-all duration-200 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20"
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
        <Button
          type="submit"
          disabled={isLoading}
          className="h-12 w-full bg-gradient-to-r from-blue-600 to-purple-600 font-medium text-white shadow-lg transition-all duration-200 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
        >
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

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-gray-800 px-4 text-gray-400">or</span>
          </div>
        </div>

        {/* Switch Mode Link */}
        <div className="text-center">
          <Typography variant="body2" className="text-gray-400">
            {isLogin ? dict.auth.login.noAccount : dict.auth.signup.haveAccount}{' '}
            <Link
              href={isLogin ? `/${currentLocale}/signup` : `/${currentLocale}/login`}
              className="font-medium text-blue-400 transition-colors hover:text-blue-300"
            >
              {isLogin ? dict.auth.login.signUp : dict.auth.signup.signIn}
            </Link>
          </Typography>
        </div>
      </form>
    </div>
  );
};
