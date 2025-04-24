import * as React from 'react';
import { createClient } from '@/lib/supabase';
import { redirect } from 'next/navigation';
import { login, signup } from '@/app/login/actions';
import { AuthForm } from '@/components/auth/AuthForm';

export default async function SignUpPage({ searchParams }: { searchParams: { error?: string } }) {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect('/');
  }

  // Prepare the message if present
  const message = searchParams.error
    ? { type: 'error' as const, text: searchParams.error }
    : undefined;

  // Base props without message
  const formProps = {
    title: 'Create your account',
    submitAction: signup,
    alternateAction: login,
    alternateText: 'Already have an account?',
    alternateActionText: 'Sign in',
    submitButtonText: 'Sign up',
  };

  // Only add message prop if it exists
  return message ? <AuthForm {...formProps} message={message} /> : <AuthForm {...formProps} />;
}
