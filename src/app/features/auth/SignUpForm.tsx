'use client';

import { useFormState } from 'react-dom';

import PasswordInput from '@/components/customs/PasswordInput';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

import { signUpAction } from './authFormActions';

export default function SignUpForm() {
  const [state, action] = useFormState(signUpAction, {});

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
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
              {state.errors?.username && (
                <label
                  className="text-xs text-red-500"
                  htmlFor="username"
                >
                  {state.errors.username[0]}
                </label>
              )}
            </div>

            <div>
              <PasswordInput
                id="password"
                name="password"
                placeholder="Password"
              />

              {state.errors?.password && (
                <label
                  className="text-xs text-red-500"
                  htmlFor="password"
                >
                  {state.errors.password[0]}
                </label>
              )}
            </div>
            <div>
              <PasswordInput
                id="confirm_password"
                name="confirm_password"
                placeholder="Confirm password"
              />
              {state.errors?.confirm_password && (
                <label
                  className="text-xs text-red-500"
                  htmlFor="confirm_password"
                >
                  {state.errors.confirm_password[0]}
                </label>
              )}
            </div>
          </div>

          <Button className="mt-4 w-full">Submit</Button>
        </form>
      </CardContent>
    </Card>
  );
}
