import Logger from 'bunyan';

// declare global {
//   namespace Express {
//     interface Request {
//       log: Logger;
//     }
//   }
// }

declare module 'express' {
  export interface Request {
    log: Logger;
  }
}
