import { pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
import { users } from './users';

export const todos = pgTable('todos', {
  id: uuid('id').primaryKey(),
  title: text('title').notNull(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id),
});

export const insertTodoSchema = createInsertSchema(todos).omit({ id: true, userId: true });
export const updateTodoSchema = z.object({
  title: z.string().nonempty().optional(),
});
