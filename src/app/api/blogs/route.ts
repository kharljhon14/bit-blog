import { cookies } from 'next/headers';

import { sql } from '@/db';
import { verifyToken } from '@/helpers/cookies';
import { schemaValidator } from '@/helpers/schemaValidator';
import type { BlogSchemaType } from '@/schemas/blog';
import { BlogSchema } from '@/schemas/blog';

export async function POST(req: Request) {
  const body = <BlogSchemaType>await req.json();
  const cookieStore = cookies();

  const sessionToken = cookieStore.get('session-token');

  if (!sessionToken)
    return Response.json({ message: 'Unauthorized' }, { status: 401 });

  const userId = await verifyToken(sessionToken.value);

  if (!userId)
    return Response.json({ message: 'Unauthorized' }, { status: 401 });

  const error = schemaValidator(BlogSchema, body);

  if (error) return Response.json({ message: error }, { status: 400 });

  const { title, content } = body;

  await sql('insert into blogs (title, content, user_id) values ($1, $2, $3)', [
    title,
    content,
    userId,
  ]);

  return Response.json({ message: 'Success' });
}
