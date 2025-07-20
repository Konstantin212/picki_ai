import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validate inputs
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      // Handle specific Supabase auth errors
      let errorMessage = 'Invalid email or password';

      if (error.message.includes('Invalid login credentials')) {
        errorMessage = 'Invalid email or password';
      } else if (error.message.includes('Email not confirmed')) {
        errorMessage = 'Please check your email and confirm your account';
      } else if (error.message.includes('Too many requests')) {
        errorMessage = 'Too many login attempts. Please try again later';
      }

      return NextResponse.json({ error: errorMessage }, { status: 401 });
    }

    if (data.user) {
      return NextResponse.json({ success: true, user: data.user }, { status: 200 });
    }

    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  } catch (error) {
    console.error('Sign-in error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
