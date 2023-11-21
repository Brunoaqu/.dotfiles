import Logger from 'bunyan';
import { Express } from 'express';

declare global {
  namespace Express {
    interface Request {
      log: Logger;
    }
  }
}
