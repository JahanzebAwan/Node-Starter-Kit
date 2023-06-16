import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import pg from 'pg';

async function run() {
  config();
  const pool = new pg.Pool({
    connectionString: process.env.DB_URL,
    max: 1,
  });
  const db = drizzle(pool);
  await migrate(db, { migrationsFolder: 'migrations' });
}

run();
