'use client';

import { useFormState } from 'react-dom';

import PasswordInput from '@/components/customs/PasswordInput';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

import { signInAction } from './authFormActions';

export default function SignInForm() {
  const [state, action] = useFormState(signInAction, { message: '' });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
      </CardHeader>
      <CardContent>
        {state.message && (
          <Alert
            className="mb-4"
            variant="destructive"
          >
            <AlertTitle>{state.message}</AlertTitle>
          </Alert>
        )}
        <form action={action}>
          <div className="space-y-2">
            <div>
              <Input
                id="username"
                name="username"
                placeholder="Username"
              />
              <label
                className="text-xs text-red-500"
                htmlFor="username"
              >
                {state.errors?.username}
              </label>
            </div>

            <div>
              <PasswordInput
                id="password"
                name="password"
                placeholder="Password"
              />
              <label
                className="text-xs text-red-500"
                htmlFor="password"
              >
                {state.errors?.password}
              </label>
            </div>
          </div>

          <Button className="mt-4 w-full">Submit</Button>
        </form>
      </CardContent>
    </Card>
  );
}
