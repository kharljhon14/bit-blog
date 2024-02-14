import { z } from 'zod';

// Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character
const passwordValidation =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

export const CreateUserSchema = z
  .object({
    username: z
      .string({ required_error: 'Username is required' })
      .min(1, 'Username is required')
      .max(32, 'Username cannot exceed 32 characters'),
    password: z
      .string({ required_error: 'Password is required' })
      .min(8, 'Password must be atleast 8 character')
      .max(32, 'Password cannot exceed 32 characters')
      .regex(passwordValidation, {
        message:
          'At least one uppercase letter, one number and one special character',
      }),
    confirm_password: z
      .string({ required_error: 'Confirm password is required' })
      .min(8, 'Confirm password must be atleast 8 character')
      .max(32, 'Confirm password cannot exceed 32 characters')
      .regex(passwordValidation, {
        message:
          'At least one uppercase letter, one number and one special character',
      }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords doesn't not match",
    path: ['confirm_password'],
  });

export type CreateUserSchemaType = z.infer<typeof CreateUserSchema>;

export const SignInSchema = z.object({
  username: z
    .string({ required_error: 'Username is required' })
    .min(1, 'Username is required')
    .max(32, 'Username cannot exceed 32 characters'),
  password: z
    .string({ required_error: 'Password is required' })
    .min(1, 'Password is required')
    .max(32, 'Password cannot exceed 32 characters'),
});

export type SignInSchemaType = z.infer<typeof SignInSchema>;
