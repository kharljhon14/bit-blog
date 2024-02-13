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
      .min(8, 'Password is required')
      .max(32, 'Password cannot exceed 32 characters')
      .regex(passwordValidation, {
        message:
          'Password must be minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character',
      }),
    confirm_password: z
      .string({ required_error: 'Confirm password is required' })
      .min(8, 'Confirm password is required')
      .max(32, 'Confirm password cannot exceed 32 characters')
      .regex(passwordValidation, {
        message:
          'Confirm password must be minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character',
      }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords doesn't not match",
    path: ['confirm_password'],
  });

export type CreateUserSchemaType = z.infer<typeof CreateUserSchema>;
