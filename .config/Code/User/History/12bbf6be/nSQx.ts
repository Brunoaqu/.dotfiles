import Redis from 'ioredis';
import { log } from '../../../../shared/utils/bunyan/log';

const { REDIS_HOST, REDIS_PORT } = process.env;
const redisClient = new Redis(redisConfiguration.port, redisConfiguration.host);

// redisClient.on('connect', () => {
//   log.info(`[Redis]: Connected to redis at ${redisConfiguration.host}:${redisConfiguration.port}`);
// });

export { redisClient };
