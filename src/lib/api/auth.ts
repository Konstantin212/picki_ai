import { createBrowserSupabaseClient } from '@/lib/supabase-client';
import type { User } from '@supabase/supabase-js';

// Types
export interface SignInCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  error?: string;
  fieldErrors?: Record<string, string>;
}

// API functions
export const authApi = {
  // Sign in
  signIn: async (credentials: SignInCredentials): Promise<AuthResponse> => {
    const response = await fetch('/api/auth/sign-in', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    return response.json();
  },

  // Sign up
  signUp: async (credentials: SignUpCredentials): Promise<AuthResponse> => {
    const response = await fetch('/api/auth/sign-up', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    return response.json();
  },

  // Sign out
  signOut: async (): Promise<AuthResponse> => {
    const response = await fetch('/api/auth/sign-out', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    return response.json();
  },

  // Get current session (for client-side)
  getSession: async () => {
    const supabase = createBrowserSupabaseClient();
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      throw error;
    }

    return session;
  },

  // Get current user (for client-side)
  getUser: async () => {
    const supabase = createBrowserSupabaseClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      throw error;
    }

    return user;
  },
};
