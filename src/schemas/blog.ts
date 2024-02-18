import { z } from 'zod';

export const BlogSchema = z.object({
  title: z
    .string({ required_error: 'title is required' })
    .min(1, 'Title is required')
    .max(32, 'Title cannot exceed 32 characters'),
  content: z
    .string({ required_error: 'content is required' })
    .min(1, 'Content is required')
    .max(10000, 'Content cannot exceed 10000 characters'),
});

export type BlogSchemaType = z.infer<typeof BlogSchema>;
