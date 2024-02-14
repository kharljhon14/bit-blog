'use server';

import { redirect } from 'next/navigation';

import { SignInSchema } from '@/schemas/user';

interface SignInState {
  message?: string;
  errors?: {
    username?: string[];
    password?: string[];
  };
}

export async function signInAction(
  state: SignInState,
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
