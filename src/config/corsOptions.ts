import allowedOrigins from './allowedOrigins';

type StaticOrigin = boolean | string | RegExp | (boolean | string | RegExp)[];

const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, origin?: StaticOrigin | undefined) => void) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

export default corsOptions;
