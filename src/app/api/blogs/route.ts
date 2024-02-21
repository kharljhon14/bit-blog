import DOMPurify from 'isomorphic-dompurify';
import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';

import { sql } from '@/db';
import { verifyToken } from '@/helpers/cookies';
import { schemaValidator } from '@/helpers/schemaValidator';
import type { BlogSchemaType } from '@/schemas/blog';
import { BlogSchema } from '@/schemas/blog';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const page = searchParams.get('page') ?? '0';

  let pageIndex = parseInt(page, 10);
  if (Number.isNaN(pageIndex)) pageIndex = 0;

  const limit = 10;
  const offset = limit * pageIndex; // change magic number to page later

  const blogsRes = await sql('select * from blogs limit $1 offset $2', [
    limit,
    offset,
  ]);

  return Response.json({ data: blogsRes.rows });
}

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

  const sanitizedContent = DOMPurify.sanitize(content);

  await sql('insert into blogs (title, content, user_id) values ($1, $2, $3)', [
    title,
    sanitizedContent,
    userId,
  ]);

  return Response.json({ message: 'Success' });
}
