import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import env from '@/config/env';

const pool = new Pool({
  connectionString: env.DB_URL,
});

const db = drizzle(pool);

export default db;
