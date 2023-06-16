import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('5000'),
  DB_URL: z.string().default('postgresql://postgres:postgres@localhost:5432/postgres'),
  JWT_SECRET: z.string().default('secret'),
});

const env = envSchema.parse(process.env);

export default env;
