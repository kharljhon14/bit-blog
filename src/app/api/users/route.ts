import { sql } from '@/db';

export async function GET() {
  const res = await sql('select * from users');

  return Response.json({ data: res.rows });
}
