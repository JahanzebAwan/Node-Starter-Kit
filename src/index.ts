import 'express-async-errors';
import { config } from 'dotenv';
config();

import express, { type Request, type Response } from 'express';
import cors from 'cors';
import compression from 'compression';
import errorHandler from '@/middleware/errorHandler';
import corsOptions from '@/config/corsOptions';
import env from '@/config/env';
import connectRedis from '@/config/connectRedis';
import controller from '@/controller';

connectRedis();
const { PORT } = env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(compression());

app.use('/api', controller);

app.all('*', (req: Request, res: Response) => {
  res.status(404).json({ message: '404 - No Route Found' });
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server Started on Port ${PORT}`));
