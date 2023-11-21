import Redis from 'ioredis';
import { log } from '../../../../shared/utils/bunyan/log';

const redisClient = new Redis(redisConfiguration.port, redisConfiguration.host);

// redisClient.on('connect', () => {
//   log.info(`[Redis]: Connected to redis at ${redisConfiguration.host}:${redisConfiguration.port}`);
// });

export { redisClient };
