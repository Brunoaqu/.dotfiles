import Logger from 'bunyan';

export {};

declare global {
  namespace Express {
    export interface Request {
      log: Logger;
    }
  }
}
