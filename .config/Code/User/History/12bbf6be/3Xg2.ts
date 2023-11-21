import Redis from 'ioredis';
import { log } from '../../../utils/bunyan/log';

const { REDIS_HOST, REDIS_PORT } = process.env;
const redisClient = new Redis(Number(REDIS_PORT), String(REDIS_HOST));

redisClient.on('connect', () =>
  log.info(`[Redis]: Connected to redis at ${REDIS_HOST}:${REDIS_PORT}`)
);

export { redisClient };
