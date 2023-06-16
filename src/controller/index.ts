import { Router } from 'express';
import authController from '@/auth/auth.controller';
import todoController from '@/todo/todo.controller';

const controller = Router();

controller.use('/', authController);
controller.use('/todos', todoController);

export default controller;
