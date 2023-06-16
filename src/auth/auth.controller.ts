import { Router } from 'express';
import { login, signup } from './auth.service';

const authController = Router();
export default authController;

authController.route('/login').post(login);
authController.route('/signup').post(signup);
