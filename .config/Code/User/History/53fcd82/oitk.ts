import redis from '../../../config/redis';
import { RedisCacheService } from './ioredis/RedisCacheService';

const redisCacheService = new RedisCacheService(redis);

export { redisCacheService };
