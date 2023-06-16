import type { Request, Response } from 'express';
import { randomUUID } from 'crypto';
import { eq, and } from 'drizzle-orm';
import db from '@/db';
import { insertTodoSchema, updateTodoSchema, todos } from '@/schema/todos';
import { uuidSchema } from '@/schema/common';
import { useCache, deleteCache } from '@/helper/cache';

export const getTodos = async (req: Request, res: Response) => {
  const result = await useCache(
    `todos_${req.user.id}`,
    async () => await db.select().from(todos).where(eq(todos.userId, req.user.id))
  );
  return res.status(200).json(result);
};

export const addTodo = async (req: Request, res: Response) => {
  const newTodo = insertTodoSchema.parse(req.body);
  const [todo] = await db
    .insert(todos)
    .values({ id: randomUUID(), userId: req.user.id, ...newTodo })
    .returning();
  deleteCache(`todos_${req.user.id}`);
  return res.status(201).json(todo);
};

export const updateTodo = async (req: Request, res: Response) => {
  const { id } = uuidSchema.parse(req.params);
  const updateTodo = updateTodoSchema.parse(req.body);
  const [todo] = await db
    .update(todos)
    .set({ ...updateTodo })
    .where(and(eq(todos.id, id), eq(todos.userId, req.user.id)))
    .returning();
  deleteCache(`todos_${req.user.id}`);
  return res.status(200).json(todo);
};

export const deleteTodo = async (req: Request, res: Response) => {
  const { id } = uuidSchema.parse(req.params);
  const [todo] = await db
    .delete(todos)
    .where(and(eq(todos.id, id), eq(todos.userId, req.user.id)))
    .returning();
  deleteCache(`todos_${req.user.id}`);
  return res.status(200).json(todo);
};
