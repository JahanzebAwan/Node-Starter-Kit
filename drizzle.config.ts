import type { Config } from 'drizzle-kit';

export default {
  schema: './src/schema',
  connectionString: process.env.DB_URL,
  out: './migrations',
} satisfies Config;
