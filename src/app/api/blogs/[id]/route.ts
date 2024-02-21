import { sql } from '@/db';

interface Params {
  params: {
    id: string;
  };
}

export async function GET(_req: Request, { params }: Params) {
  try {
    const { id } = params;

    const blogRes = await sql(`select * from blogs where id = $1`, [id]);

    if (blogRes.rowCount === 0)
      return Response.json(
        { message: 'Could not find blog post' },
        { status: 404 }
      );

    return Response.json({ data: blogRes.rows[0] });
  } catch (err) {
    if (err instanceof Error)
      return Response.json({ message: err.message }, { status: 500 });
  }
}
