import * as React from 'react';
import { createClient } from '@/lib/supabase';
import { redirect } from 'next/navigation';
import { login, signup } from '@/app/login/actions';
import { AuthForm } from '@/components/auth/AuthForm';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string; message?: string; redirectedFrom?: string };
}) {
  const supabase = await createClient();
  const params = await searchParams;

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect(params.redirectedFrom || '/');
  }

  // Prepare the message if any
  const message = params.error
    ? { type: 'error' as const, text: params.error }
    : params.message
      ? { type: 'success' as const, text: params.message }
      : undefined;

  // Base props without message
  const formProps = {
    title: 'Sign in to your account',
    submitAction: login,
    alternateAction: signup,
    alternateText: "Don't have an account?",
    alternateActionText: 'Sign up',
    submitButtonText: 'Sign in',
  };

  // Only add message prop if it exists
  return message ? <AuthForm {...formProps} message={message} /> : <AuthForm {...formProps} />;
}
