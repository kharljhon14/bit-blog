import { verify } from 'argon2';
import { NextResponse } from 'next/server';

import { sql } from '@/db';
import { signInToken } from '@/helpers/cookies';
import { schemaValidator } from '@/helpers/schemaValidator';
import type { SignInSchemaType } from '@/schemas/user';
import { SignInSchema } from '@/schemas/user';
import type { User } from '@/types/user';

export async function POST(req: Request) {
  try {
    const body: SignInSchemaType = await req.json();

    const error = schemaValidator(SignInSchema, body);

    if (error) return Response.json({ message: error }, { status: 400 });

    const userRes = await sql<User>(
      'select id, username, password from users where username = $1',
      [body.username]
    );

    if (userRes.rowCount === 0)
      return Response.json(
        { message: 'Could not find user!' },
        { status: 404 }
      );

    const match = await verify(userRes.rows[0].password, body.password);

    if (!match)
      return Response.json(
        { message: 'Invalid credentials!' },
        { status: 409 }
      );

    const token = await signInToken(userRes.rows[0].id);

    const response = NextResponse.json({ message: 'Success!' });

    response.cookies.set('session-token', token, {
      sameSite: 'strict',
      httpOnly: true,
      secure: true,
    });

    return response;
  } catch (err) {
    if (err instanceof Error)
      return Response.json({ message: err.message }, { status: 500 });
  }
}
