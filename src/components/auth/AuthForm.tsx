'use client';

import { Input } from '@/components/ui/input';
import { Typography } from '@/components/ui/typography';
import { PrimaryFormButton, LinkFormButton } from './FormButtons';

export interface AuthMessage {
  type: 'error' | 'success';
  text: string;
}

interface AuthFormProps {
  title: string;
  submitAction: (formData: FormData) => Promise<void>;
  alternateAction: (formData: FormData) => Promise<void>;
  message?: AuthMessage;
  alternateText: string;
  alternateActionText: string;
  submitButtonText: string;
}

export const AuthForm = ({
  title,
  submitAction,
  alternateAction,
  message,
  alternateText,
  alternateActionText,
  submitButtonText,
}: AuthFormProps) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Typography variant="h2" align="center" className="mt-6">
            {title}
          </Typography>
        </div>
        <form className="mt-8 space-y-6">
          <div className="space-y-4 rounded-md shadow-sm">
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Email address"
              label="Email address"
            />
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="Password"
              label="Password"
            />
          </div>

          {message && (
            <Typography
              variant="body2"
              color={message.type === 'error' ? 'error' : 'success'}
              align="center"
            >
              {message.text}
            </Typography>
          )}

          <div>
            <PrimaryFormButton type="submit" formAction={submitAction}>
              {submitButtonText}
            </PrimaryFormButton>
          </div>

          <div className="text-center text-sm">
            <Typography variant="body2" align="center">
              {alternateText}{' '}
              <LinkFormButton type="submit" formAction={alternateAction}>
                {alternateActionText}
              </LinkFormButton>
            </Typography>
          </div>
        </form>
      </div>
    </div>
  );
};
