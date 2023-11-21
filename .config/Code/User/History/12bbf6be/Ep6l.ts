import Redis from 'ioredis';
import { log } from '../../../../shared/utils/bunyan/log';

const { REDIS_HOST, REDIS_PORT } = process.env as {
  REDIS_HOST: string;
  REDIS_PORT: string;
};
const redisClient = new Redis(REDIS_PORT, REDIS_HOST);

// redisClient.on('connect', () => {
//   log.info(`[Redis]: Connected to redis at ${redisConfiguration.host}:${redisConfiguration.port}`);
// });

export { redisClient };
