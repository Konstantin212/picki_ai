'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Typography } from '@/components/ui/typography';
import { useToast } from '@/hooks/use-toast';

interface AuthFormProps {
  dict: {
    auth: {
      login: {
        title: string;
        subtitle: string;
        email: string;
        password: string;
        forgotPassword: string;
        signIn: string;
        noAccount: string;
        signUp: string;
        errors: {
          invalidCredentials: string;
          emailRequired: string;
          passwordRequired: string;
        };
      };
      signup: {
        title: string;
        subtitle: string;
        email: string;
        password: string;
        confirmPassword: string;
        terms: string;
        createAccount: string;
        haveAccount: string;
        signIn: string;
        errors: {
          emailExists: string;
          passwordMismatch: string;
          weakPassword: string;
        };
      };
    };
  };
  mode: 'login' | 'signup';
}

export const AuthForm = ({ dict, mode }: AuthFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const isLogin = mode === 'login';
  const authDict = isLogin ? dict.auth.login : dict.auth.signup;

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
        const currentLocale = window.location.pathname.split('/')[1];
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center">
        <Typography variant="h1" className="mb-2">
          {authDict.title}
        </Typography>
        <Typography variant="body2" color="secondary" className="mb-4">
          {authDict.subtitle}
        </Typography>
      </div>

      <div className="space-y-4">
        <div>
          <Typography variant="body2" className="mb-2 block font-medium">
            {authDict.email}
          </Typography>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full"
          />
        </div>

        <div>
          <Typography variant="body2" className="mb-2 block font-medium">
            {authDict.password}
          </Typography>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full"
          />
        </div>

        {!isLogin && (
          <div>
            <Typography variant="body2" className="mb-2 block font-medium">
              {dict.auth.signup.confirmPassword}
            </Typography>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full"
            />
          </div>
        )}
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        <Typography component="span">
          {isLoading ? 'Loading...' : isLogin ? authDict.signIn : dict.auth.signup.createAccount}
        </Typography>
      </Button>

      <div className="text-center">
        <Typography variant="body2" color="secondary">
          {isLogin ? dict.auth.login.noAccount : dict.auth.signup.haveAccount}{' '}
          <a href={isLogin ? '/signup' : '/login'} className="text-blue-500 hover:text-blue-600">
            {isLogin ? dict.auth.login.signUp : dict.auth.signup.signIn}
          </a>
        </Typography>
      </div>
    </form>
  );
};
