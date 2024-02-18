import { BlogSchema } from '@/schemas/blog';

export async function createBlog(title: string, content: string) {
  const validation = BlogSchema.safeParse({ title, content });

  if (!validation.success) {
    const errors = validation.error.flatten().fieldErrors;

    return {
      errors,
    };
  }

  const res = await fetch('http://localhost:3000/api/blogs', {
    method: 'POST',
    body: JSON.stringify({ ...validation.data }),
  });

  if (!res.ok) {
    const { message } = await res.json();
    return {
      message,
    };
  }

  return {
    message: 'Success!',
  };
}
