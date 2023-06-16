import { pgTable, text, uuid, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export const users = pgTable('users', {
  id: uuid('id').primaryKey(),
  email: varchar('email', { length: 320 }).notNull(),
  password: text('password').notNull(),
});

export const signupSchema = createInsertSchema(users).omit({ id: true });
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().nonempty(),
});
