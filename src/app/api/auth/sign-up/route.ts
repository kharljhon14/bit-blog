import { schemaValidator } from '@/helpers/schemaValidator';
import type { CreateUserSchemaType } from '@/schemas/user';
import { CreateUserSchema } from '@/schemas/user';

export async function POST(req: Request) {
  try {
    const body: CreateUserSchemaType = await req.json();

    const error = schemaValidator(CreateUserSchema, body);

    if (error) return Response.json({ message: error }, { status: 400 });

    return Response.json({ data: 'ok' });
  } catch (err) {
    if (err instanceof Error)
      return Response.json({ message: err.message }, { status: 500 });
  }
}
