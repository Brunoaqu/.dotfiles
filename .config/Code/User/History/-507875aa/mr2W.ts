import Logger from 'bunyan';

// declare global {
//   namespace Express {
//     interface Request {
//       log: Logger;
//     }
//   }
// }
export {};

declare module 'express' {
  export interface Request {
    log: Logger;
  }
}
