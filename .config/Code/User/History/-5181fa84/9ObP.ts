/* eslint-disable import/order */
/* eslint-disable import/first */
// import { setupTracing } from './tracer';

// setupTracing('example-server');

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
app.use(express.json({ limit: '200mb' }));
app.use(express.urlencoded({ extended: true, limit: '200mb' }));
app.use('/v1', middleware.logRequest, v1Router);

const serverOptions = { port: Number(process.env.API_PORT || 8080), host: 'localhost' };
const httpLogger = log.child({
  context: 'HttpServer',
  'http.host': serverOptions.host,
  'http.port': serverOptions.port,
});

app.listen(serverOptions.port, () => httpLogger.info(`HTTP server started.`));

export { app, httpLogger };
