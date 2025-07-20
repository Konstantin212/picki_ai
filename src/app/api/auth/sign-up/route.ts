import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';

export async function POST(request: NextRequest) {
  try {
    const { email, password, confirmPassword, fullName } = await request.json();

    // Validate inputs
    if (!fullName || !email || !password || !confirmPassword) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Validate full name
    if (fullName.trim().length < 2) {
      return NextResponse.json(
        { error: 'Full name must be at least 2 characters long' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address' }, { status: 400 });
    }

    // Validate password strength
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return NextResponse.json({ error: 'Passwords do not match' }, { status: 400 });
    }

    const supabase = await createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      // Handle specific Supabase auth errors
      let errorMessage = 'Registration failed';

      if (error.message.includes('User already registered')) {
        errorMessage = 'An account with this email already exists';
      } else if (error.message.includes('Password should be at least')) {
        errorMessage = 'Password is too weak. Please choose a stronger password';
      } else if (
        error.message.includes('Invalid email') ||
        error.code === 'email_address_invalid'
      ) {
        errorMessage = 'Please enter a valid email address. Make sure to use a real email domain.';
      }

      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    if (data.user) {
      return NextResponse.json({ success: true, user: data.user }, { status: 200 });
    }

    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  } catch (error) {
    console.error('Sign-up error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
