import Logger from 'bunyan';

export {};

declare global {
  namespace Express {
    interface Request {
      log: Logger;
    }
  }
}
