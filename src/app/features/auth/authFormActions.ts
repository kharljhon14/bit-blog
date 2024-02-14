'use server';

import { redirect } from 'next/navigation';

import { CreateUserSchema, SignInSchema } from '@/schemas/user';

interface SignInState {
  message?: string;
  errors?: {
    username?: string[];
    password?: string[];
  };
}

interface SignUpState {
  message?: string;
  errors?: {
    username?: string[];
    password?: string[];
    confirm_password?: string[];
  };
}

export async function signInAction(
  _state: SignInState,
  formData: FormData
): Promise<SignInState> {
  const username = formData.get('username');
  const password = formData.get('password');

  const validation = SignInSchema.safeParse({ username, password });

  if (!validation.success) {
    const errors = validation.error.flatten().fieldErrors;

    return {
      errors,
    };
  }

  const res = await fetch('http://localhost:3000/api/auth/sign-in', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    const { message } = await res.json();
    return {
      message,
    };
  }

  return redirect('/');
}

export async function signUpAction(
  _state: SignUpState,
  formData: FormData
): Promise<SignUpState> {
  const username = formData.get('username');
  const password = formData.get('password');
  const confirmPassword = formData.get('confirm_password');

  const validation = CreateUserSchema.safeParse({
    username,
    password,
    confirm_password: confirmPassword,
  });

  if (!validation.success) {
    const errors = validation.error.flatten().fieldErrors;

    return {
      errors,
    };
  }

  const res = await fetch('http://localhost:3000/api/auth/sign-up', {
    method: 'POST',
    body: JSON.stringify({
      username,
      password,
      confirm_password: confirmPassword,
    }),
  });

  if (!res.ok) {
    const { message } = await res.json();
    return {
      message,
    };
  }

  return redirect('/auth/sign-in');
}
