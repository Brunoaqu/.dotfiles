import Logger from 'bunyan';
// import { Express } from 'express-serve-static-core';

// declare global {
//     namespace Express {
//         interface Request {
//             log?: string;
//         }
//     }
// }

declare global {
    namespace Express {
      interface Request {
        context: number
      }
    }
  }