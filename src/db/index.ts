import type { QueryResult, QueryResultRow } from 'pg';
import { Client } from 'pg';

const DB_URL = 'postgres://postgres:postgres@localhost:5432/bit_blog';

export function getClient() {
  const client = new Client({
    connectionString: DB_URL,
  });

  return client;
}

export async function sql<T extends QueryResultRow>(
  query: string,
  values?: any[]
): Promise<QueryResult<T>> {
  const client = getClient();

  await client.connect();

  const res = await client.query(query, values);

  await client.end();

  return res;
}
