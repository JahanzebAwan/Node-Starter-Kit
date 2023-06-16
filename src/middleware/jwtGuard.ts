import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import env from '@/config/env';

const jwtGuard = async (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;
  if (authorization && authorization.startsWith('Bearer')) {
    try {
      const token = authorization.split(' ')[1];
      const decoded = jwt.verify(token, env.JWT_SECRET) as User;
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
  } else return res.status(401).json({ message: 'Unauthorized' });
};

export default jwtGuard;
