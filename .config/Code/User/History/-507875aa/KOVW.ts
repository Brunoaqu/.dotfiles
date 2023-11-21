import Logger from 'bunyan';
import { Express } from 'express-serve-static-core';

export {};

declare global {
  namespace Express {
    export interface Request {
      log: Logger;
    }
  }
}
