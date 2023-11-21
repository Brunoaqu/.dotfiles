import Redis from 'ioredis';
import { log } from '../../../utils/bunyan/log';

const configuration = {
  host: String(process.env.REDIS_HOST),
  port: Number(process.env.REDIS_PORT),
};
const Redis.log: any = log.child({
  context: 'Redis',
  'redis.host': configuration.host,
  'redis.port': configuration.port,
});

redisLogger.info(`Attempting connection to redis.`);
const redisClient = new Redis(configuration.port, configuration.host);

redisClient.on('connect', () => {
  redisLogger.info(`Successfully connected to redis.`);
});

export { redisClient };
