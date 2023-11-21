import { redisClient } from '../../../shared/infra/database/ioredis/redisClient';
import { RedisCacheService } from './ioredis/RedisCacheService';

const redisCacheService = new RedisCacheService(redisClient);
console.log(redisCacheService);
export { redisCacheService };
