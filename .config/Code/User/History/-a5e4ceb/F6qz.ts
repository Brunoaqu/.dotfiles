import Logger from 'bunyan';

declare namespace Express {
  export interface Request {
    log: Logger;
  }
}
