import { Redis } from 'ioredis';

export abstract class AbstractRedisClient {
  protected client: Redis;
}
