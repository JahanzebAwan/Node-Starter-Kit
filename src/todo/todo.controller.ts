import { Router } from 'express';
import { addTodo, getTodos, updateTodo, deleteTodo } from './todo.service';
import jwtGuard from '@/middleware/jwtGuard';

const todoController = Router();
export default todoController;

todoController.route('/').get(jwtGuard, getTodos).post(jwtGuard, addTodo);
todoController.route('/:id').patch(jwtGuard, updateTodo).delete(jwtGuard, deleteTodo);
