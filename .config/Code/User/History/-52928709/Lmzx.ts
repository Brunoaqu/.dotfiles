import Logger from 'bunyan';

// declare module 'express-serve-static-core' {
  // interface Request {
    // log: Logger;
  // }
// }

declare global {
  namespace Express {
    interface Request {
      log: Logger;
    }
  }
}
