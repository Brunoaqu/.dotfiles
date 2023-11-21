/* eslint-disable import/order */
/* eslint-disable import/first */
import { setupTracing } from './tracer';

setupTracing('example-server');

import express from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import { middleware } from '.';
import { log } from '../../utils/bunyan/log';
import { v1Router } from './api/v1';
import { isProduction } from '../../../config';

const app = express();
const origin = {
  origin: '*',
  exposedHeaders: ['cookie', 'x-auth-token'],
};

if (isProduction) {
  app.use(middleware.rateLimit(15, 100));
}

app.disable('x-powered-by');
app.enable('trust proxy');

app.use(helmet());
app.use(compression());
app.use(cors(origin));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(middleware.logRequest);
app.use('/v1', v1Router);

if (process.env.TESTING === 'true') {
  export { app };
} else {
  app.listen(process.env.API_PORT || 5000, () => {
    log.info(`[APP] Server listening at http://localhost:${process.env.API_PORT || 5000}`);
  });
}