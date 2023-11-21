import Logger from 'bunyan';
import { Express } from 'express-serve-static-core';

declare module 'express-serve-static-core' {
  interface Request {
    log: Logger;
  }
}

// declare global {
// namespace Express {
// export interface Request {
// log: Logger;
// }
// }
// }
