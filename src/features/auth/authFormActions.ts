'use server';

import { cookies } from 'next/headers';
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
  const form = Object.fromEntries(formData.entries());

  const validation = SignInSchema.safeParse(form);

  if (!validation.success) {
    const errors = validation.error.flatten().fieldErrors;

    return {
      errors,
    };
  }

  const res = await fetch('http://localhost:3000/api/auth/sign-in', {
    method: 'POST',
    body: JSON.stringify({ ...validation.data }),
  });

  if (!res.ok) {
    const { message } = await res.json();
    return {
      message,
    };
  }

  const cookieStore = cookies();

  const cookiesArray = res.headers.getSetCookie()[0];

  const token = cookiesArray.split('=')[1];

  cookieStore.set('session-token', token.split(';')[0]);

  return redirect('/');
}

export async function signUpAction(
  _state: SignUpState,
  formData: FormData
): Promise<SignUpState> {
  const form = Object.fromEntries(formData.entries());
  const validation = CreateUserSchema.safeParse(form);

  if (!validation.success) {
    const errors = validation.error.flatten().fieldErrors;

    return {
      errors,
    };
  }

  const res = await fetch('http://localhost:3000/api/auth/sign-up', {
    method: 'POST',
    body: JSON.stringify({
      ...validation.data,
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
