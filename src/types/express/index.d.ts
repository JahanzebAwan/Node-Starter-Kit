/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express';

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}
