import { sql } from '@/db';
import { schemaValidator } from '@/helpers/schemaValidator';
import type { CreateUserSchemaType } from '@/schemas/user';
import { CreateUserSchema } from '@/schemas/user';

export async function POST(req: Request) {
  try {
    const body: CreateUserSchemaType = await req.json();

    const error = schemaValidator(CreateUserSchema, body);

    if (error) return Response.json({ message: error }, { status: 400 });

    const userRes = await sql('select * from users where username = $1', [
      body.username,
    ]);

    if (userRes.rowCount !== 0)
      return Response.json(
        { message: 'Username already taken!' },
        { status: 409 }
      );

    await sql('insert into users (username, password) values ($1, $2)', [
      body.username,
      body.password,
    ]);

    return Response.json({ message: 'Success' });
  } catch (err) {
    if (err instanceof Error)
      return Response.json({ message: err.message }, { status: 500 });
  }
}
