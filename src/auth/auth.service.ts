import type { Request, Response } from 'express';
import { randomUUID } from 'crypto';
import { hash, verify } from 'argon2';
import jwt from 'jsonwebtoken';
import { eq } from 'drizzle-orm';
import { loginSchema, signupSchema, users } from '@/schema/users';
import db from '@/db';
import env from '@/config/env';

export const signup = async (req: Request, res: Response) => {
  const { email, password } = signupSchema.parse(req.body);
  const [user] = await db.select({ id: users.id }).from(users).where(eq(users.email, email));
  if (user) return res.status(409).json({ message: 'User already exists' });
  const hashedPassword = await hash(password);
  const id = randomUUID();
  await db.insert(users).values({ id, email, password: hashedPassword });
  res.status(201).json({ accessToken: getAccessToken(id) });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = loginSchema.parse(req.body);
  const [user] = await db.select({ id: users.id, password: users.password }).from(users).where(eq(users.email, email));
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });
  if (await verify(user.password, password)) return res.status(200).json({ accessToken: getAccessToken(user.id) });
  res.status(400).json({ message: 'Invalid credentials' });
};

const getAccessToken = (id: string) =>
  jwt.sign({ id }, env.JWT_SECRET, {
    expiresIn: '15d',
  });
