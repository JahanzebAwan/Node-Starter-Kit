/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { generateErrorMessage, type ErrorMessageOptions } from 'zod-error';

const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof ZodError) {
    const options: ErrorMessageOptions = {
      delimiter: {
        error: ' | ',
      },
      transform: ({ errorMessage, index }) => `Error #${index + 1}: ${errorMessage}`,
    };
    const message = generateErrorMessage(error.issues, options);
    return res.status(400).json({ message });
  } else {
    if (process.env.NODE_ENV === 'production') {
      console.log('Unhandled Error:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    } else {
      return res.status(500).json({ message: error.message });
    }
  }
};

export default errorHandler;
