import { hostname } from 'os';
import { LoggingBunyan } from '@google-cloud/logging-bunyan';
import { LogLevel, createLogger, stdSerializers } from 'bunyan';
import { isProduction } from '../../../config';
// import { customReqSerializer, customResSerializer, hideSensitiveFieldsInBody } from './Serializers';

const streams = [];

if (isProduction) {
  streams.push(new LoggingBunyan().stream('info'));
} else if (process.env.NODE_ENV !== 'test') {
  streams.push({ stream: process.stdout });
}

export const log = createLogger({
  name: `api.${hostname()}.pixlog-backend-ml`,
  level: (process.env.LOG_LEVEL as LogLevel) || 'info',
  streams,
  serializers: stdSerializers,
});
