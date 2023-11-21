import Redis from 'ioredis';
import { redisConfiguration } from './config';
import { log } from '../../../../shared/utils/bunyan/log';

const redisClient = null;
// const redisClient = new Redis(redisConfiguration.port, redisConfiguration.host);

// redisClient.on('connect', () => {
//   log.info(`[Redis]: Connected to redis at ${redisConfiguration.host}:${redisConfiguration.port}`);
// });

export { redisClient };
